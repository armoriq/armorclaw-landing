import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: skip already-processed events
  const existing = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: event.id },
  });
  if (existing?.processed) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  // Record the event
  await prisma.webhookEvent.upsert({
    where: { stripeEventId: event.id },
    create: {
      stripeEventId: event.id,
      eventType: event.type,
      payload: JSON.parse(JSON.stringify(event.data)),
    },
    update: {},
  });

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(
          event.data.object as Stripe.Subscription
        );
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object as Stripe.Invoice);
        break;

      case "payment_intent.succeeded":
        await handlePaymentSucceeded(
          event.data.object as Stripe.PaymentIntent
        );
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark processed
    await prisma.webhookEvent.update({
      where: { stripeEventId: event.id },
      data: { processed: true, processedAt: new Date() },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Error processing ${event.type}:`, message);

    await prisma.webhookEvent.update({
      where: { stripeEventId: event.id },
      data: { error: message },
    });

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

// ─── Handlers ──────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return;

  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const email = session.customer_email || session.customer_details?.email || "";
  const tier = session.metadata?.tier || "pro";
  const orgId = session.metadata?.orgId || customerId;

  // Upsert billing customer
  const billingCustomer = await prisma.billingCustomer.upsert({
    where: { orgId },
    create: {
      orgId,
      stripeCustomerId: customerId,
      email,
      name: session.customer_details?.name,
    },
    update: {
      stripeCustomerId: customerId,
      email: email || undefined,
    },
  });

  // Find the billing tier
  const billingTier = await prisma.billingTier.findUnique({
    where: { slug: tier },
  });
  if (!billingTier) {
    throw new Error(`Billing tier not found: ${tier}`);
  }

  // Fetch subscription details from Stripe
  const sub = await getStripe().subscriptions.retrieve(subscriptionId);

  // Create subscription record
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscriptionId },
    create: {
      billingCustomerId: billingCustomer.id,
      billingTierId: billingTier.id,
      stripeSubscriptionId: subscriptionId,
      status: mapSubscriptionStatus(sub.status),
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      status: mapSubscriptionStatus(sub.status),
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
    },
  });
}

async function handleSubscriptionChange(sub: Stripe.Subscription) {
  const existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  });
  if (!existing) return;

  await prisma.subscription.update({
    where: { stripeSubscriptionId: sub.id },
    data: {
      status: mapSubscriptionStatus(sub.status),
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const billingCustomer = await prisma.billingCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });
  if (!billingCustomer) return;

  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      billingCustomerId: billingCustomer.id,
      stripeInvoiceId: invoice.id,
      amountDue: invoice.amount_due,
      amountPaid: invoice.amount_paid,
      currency: invoice.currency,
      status: "PAID",
      invoiceUrl: invoice.hosted_invoice_url,
      paidAt: new Date(),
    },
    update: {
      amountPaid: invoice.amount_paid,
      status: "PAID",
      paidAt: new Date(),
    },
  });
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const billingCustomer = await prisma.billingCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });
  if (!billingCustomer) return;

  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      billingCustomerId: billingCustomer.id,
      stripeInvoiceId: invoice.id,
      amountDue: invoice.amount_due,
      amountPaid: 0,
      currency: invoice.currency,
      status: "OPEN",
      invoiceUrl: invoice.hosted_invoice_url,
    },
    update: {
      status: "OPEN",
    },
  });
}

async function handlePaymentSucceeded(pi: Stripe.PaymentIntent) {
  const customerId = pi.customer as string;
  if (!customerId) return;

  const billingCustomer = await prisma.billingCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });
  if (!billingCustomer) return;

  await prisma.payment.upsert({
    where: { stripePaymentIntentId: pi.id },
    create: {
      billingCustomerId: billingCustomer.id,
      stripePaymentIntentId: pi.id,
      amount: pi.amount,
      currency: pi.currency,
      status: "SUCCEEDED",
      description: pi.description,
    },
    update: {
      status: "SUCCEEDED",
    },
  });
}

async function handlePaymentFailed(pi: Stripe.PaymentIntent) {
  const customerId = pi.customer as string;
  if (!customerId) return;

  const billingCustomer = await prisma.billingCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });
  if (!billingCustomer) return;

  await prisma.payment.upsert({
    where: { stripePaymentIntentId: pi.id },
    create: {
      billingCustomerId: billingCustomer.id,
      stripePaymentIntentId: pi.id,
      amount: pi.amount,
      currency: pi.currency,
      status: "FAILED",
      description: pi.description,
    },
    update: {
      status: "FAILED",
    },
  });
}

// ─── Helpers ───────────────────────────────────────────

function mapSubscriptionStatus(
  status: Stripe.Subscription.Status
): "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING" | "INCOMPLETE" | "PAUSED" {
  const map: Record<string, "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING" | "INCOMPLETE" | "PAUSED"> = {
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELED",
    trialing: "TRIALING",
    incomplete: "INCOMPLETE",
    incomplete_expired: "CANCELED",
    unpaid: "PAST_DUE",
    paused: "PAUSED",
  };
  return map[status] || "ACTIVE";
}
