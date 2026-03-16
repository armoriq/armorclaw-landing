import { NextRequest, NextResponse } from "next/server";
import { getStripe, TIER_PRICE_MAP } from "@/lib/stripe";

const ALLOWED_CHECKOUT_TIERS = new Set(["pro"]);

export async function POST(req: NextRequest) {
  try {
    const { tier, email, orgId } = await req.json();

    if (!tier || !ALLOWED_CHECKOUT_TIERS.has(tier)) {
      return NextResponse.json(
        { error: `Tier not available for self-service checkout: ${tier}` },
        { status: 400 }
      );
    }

    const priceId = TIER_PRICE_MAP[tier];
    if (!priceId) {
      return NextResponse.json(
        { error: `No Stripe price configured for tier: ${tier}` },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_APP_URL is not configured");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        tier,
        ...(orgId && { orgId }),
      },
      ...(email && { customer_email: email }),
      allow_promotion_codes: true,
      billing_address_collection: "required",
      subscription_data: {
        metadata: {
          tier,
          ...(orgId && { orgId }),
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
