"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description:
      "Get started with ArmorClaw. Perfect for exploring intent assurance on personal projects.",
    features: [
      "Up to 5 agents",
      "Basic intent logging",
      "Community support",
      "7-day log retention",
      "Standard policies",
    ],
    cta: "Get Started Free",
    featured: false,
    tier: "free",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description:
      "Full intent assurance for production agent workloads with custom policy control.",
    features: [
      "Up to 100 agents",
      "Full intent assurance",
      "Custom policy engine",
      "Priority support",
      "90-day log retention",
      "Advanced audit trails",
    ],
    cta: "Start Trial",
    featured: true,
    tier: "pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Dedicated infrastructure, compliance, and support tailored to your organization.",
    features: [
      "Unlimited agents",
      "Dedicated support and SLA",
      "Compliance reporting",
      "SSO and SAML",
      "Custom integrations",
      "On-premise available",
    ],
    cta: "Contact Sales",
    featured: false,
    tier: "enterprise",
  },
];

const COMPARISON_ROWS = [
  { feature: "Agents", free: "5", pro: "100", enterprise: "Unlimited" },
  { feature: "Intent Logging", free: "Basic", pro: "Full", enterprise: "Full" },
  {
    feature: "Intent Assurance",
    free: "—",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "Custom Policies",
    free: "—",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "Log Retention",
    free: "7 days",
    pro: "90 days",
    enterprise: "Custom",
  },
  {
    feature: "Audit Trails",
    free: "—",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "Support",
    free: "Community",
    pro: "Priority",
    enterprise: "Dedicated",
  },
  {
    feature: "SLA",
    free: "—",
    pro: "—",
    enterprise: "Included",
  },
  {
    feature: "SSO / SAML",
    free: "—",
    pro: "—",
    enterprise: "Included",
  },
  {
    feature: "Compliance Reports",
    free: "—",
    pro: "—",
    enterprise: "Included",
  },
  {
    feature: "On-Premise",
    free: "—",
    pro: "—",
    enterprise: "Available",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-header", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pricing-header", start: "top 88%" },
      });

      gsap.from(".pricing-card", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pricing-cards", start: "top 85%" },
      });

      gsap.from(".comparison-table", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".comparison-table", start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function handleCheckout(tier: string) {
    if (tier === "free") {
      window.location.href = "/checkout/success?plan=free";
      return;
    }
    if (tier === "enterprise") {
      window.location.href = "mailto:sales@armoriq.ai?subject=Enterprise%20Plan%20Inquiry";
      return;
    }

    setLoading(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(null);
      }
    } catch {
      console.error("Checkout failed");
      setLoading(null);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 md:py-32 lg:py-40 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pricing-header text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-secondary font-body">
            Start free. Scale when you&apos;re ready.
          </p>
        </div>

        {/* Cards */}
        <div className="pricing-cards mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card flex flex-col p-8 md:p-10 rounded-2xl border-2 transition-shadow duration-200 hover:shadow-md ${
                plan.featured
                  ? "border-accent"
                  : "border-line hover:border-secondary/30"
              }`}
            >
              <div>
                <h3 className="text-xl font-bold font-heading">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold font-heading">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-secondary font-body">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-secondary font-body leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 font-body text-secondary"
                  >
                    <span className="text-accent shrink-0 mt-0.5 font-bold">
                      —
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.tier)}
                disabled={loading === plan.tier}
                className={`mt-8 block w-full text-center py-3.5 rounded-full font-medium font-body transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-wait ${
                  plan.featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {loading === plan.tier ? "Redirecting..." : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="comparison-table mt-20 md:mt-28">
          <h3 className="text-2xl md:text-3xl font-bold font-heading text-center mb-10">
            Compare All Features
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="py-4 pr-4 text-sm font-bold text-primary uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-primary uppercase tracking-wider text-center">
                    Starter
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-accent uppercase tracking-wider text-center">
                    Pro
                  </th>
                  <th className="py-4 pl-4 text-sm font-bold text-primary uppercase tracking-wider text-center">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-line last:border-b-0"
                  >
                    <td className="py-4 pr-4 text-primary font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-secondary text-center">
                      {row.free}
                    </td>
                    <td className="py-4 px-4 text-secondary text-center">
                      {row.pro}
                    </td>
                    <td className="py-4 pl-4 text-secondary text-center">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
