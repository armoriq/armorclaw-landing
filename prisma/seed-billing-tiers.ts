import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TIERS = [
  {
    name: "Starter",
    slug: "free",
    stripePriceId: null, // free tier — no Stripe price
    price: 0,
    interval: "month",
    maxAgents: 50,
    logRetention: 7,
    sortOrder: 0,
    features: {
      intentLogging: true,
      intentAssurance: false,
      customPolicies: false,
      auditTrails: false,
      sso: false,
      sla: false,
      compliance: false,
      onPremise: false,
      support: "community",
    },
  },
  {
    name: "Pro",
    slug: "pro",
    stripePriceId: process.env.STRIPE_PRICE_PRO_MONTHLY || "price_REPLACE_ME",
    price: 9900, // $99.00
    interval: "month",
    maxAgents: 500,
    logRetention: 90,
    sortOrder: 1,
    features: {
      intentLogging: true,
      intentAssurance: true,
      customPolicies: true,
      auditTrails: true,
      sso: false,
      sla: false,
      compliance: false,
      onPremise: false,
      support: "priority",
    },
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    stripePriceId:
      process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || "price_REPLACE_ME",
    price: 0, // custom pricing
    interval: "month",
    maxAgents: -1, // unlimited
    logRetention: -1, // custom
    sortOrder: 2,
    features: {
      intentLogging: true,
      intentAssurance: true,
      customPolicies: true,
      auditTrails: true,
      sso: true,
      sla: true,
      compliance: true,
      onPremise: true,
      support: "dedicated",
    },
  },
];

async function seed() {
  console.log("Seeding billing tiers...");

  for (const tier of TIERS) {
    await prisma.billingTier.upsert({
      where: { slug: tier.slug },
      create: {
        name: tier.name,
        slug: tier.slug,
        stripePriceId: tier.stripePriceId,
        price: tier.price,
        interval: tier.interval,
        maxAgents: tier.maxAgents,
        logRetention: tier.logRetention,
        sortOrder: tier.sortOrder,
        features: tier.features,
      },
      update: {
        name: tier.name,
        stripePriceId: tier.stripePriceId,
        price: tier.price,
        features: tier.features,
        maxAgents: tier.maxAgents,
        logRetention: tier.logRetention,
        sortOrder: tier.sortOrder,
      },
    });

    console.log(`  ✓ ${tier.name} (${tier.slug})`);
  }

  console.log("Done.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
