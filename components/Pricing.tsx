"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    monthlyPeriod: "/month",
    yearlyPeriod: "/month",
    yearlySaving: "",
    description:
      "Get started with ArmorClaw. Perfect for exploring intent assurance on personal projects.",
    features: [
      "Up to 5 agents",
      "30 intent calls / day",
      "Basic intent logging",
      "Basic audit logs",
      "7-day log retention",
      "Community support",
    ],
    cta: "Get Started Free",
    featured: false,
    tier: "free",
  },
  {
    name: "Pro",
    badge: "Recommended",
    monthlyPrice: "$20",
    yearlyPrice: "$200",
    monthlyPeriod: "/month",
    yearlyPeriod: "/year",
    yearlySaving: "Save 17%",
    description:
      "Full intent assurance for production agent workloads with custom policy control.",
    features: [
      "Unlimited agents",
      "100 free intent calls / day",
      "Overage: $1 per 100 extra calls",
      "Full intent assurance",
      "Custom policy engine",
      "YAML policy support",
      "Advanced audit trails",
      "90-day log retention",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    featured: true,
    tier: "pro",
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    monthlyPeriod: "",
    yearlyPeriod: "",
    yearlySaving: "",
    description:
      "Dedicated infrastructure, compliance, and support tailored to your organization.",
    features: [
      "Unlimited agents",
      "Unlimited intent calls",
      "Full audit trails + compliance export",
      "Custom log retention",
      "Dedicated support and SLA",
      "SSO and SAML",
      "On-premise available",
    ],
    cta: "Contact Sales",
    featured: false,
    tier: "enterprise",
  },
];

const COMPARISON_ROWS = [
  { feature: "Agents", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
  {
    feature: "Intent Calls",
    free: "30 / day",
    pro: "100 / day + overage",
    enterprise: "Unlimited",
  },
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
    feature: "YAML Policy Support",
    free: "—",
    pro: "Included",
    enterprise: "—",
  },
  {
    feature: "Log Retention",
    free: "7 days",
    pro: "90 days",
    enterprise: "Custom",
  },
  {
    feature: "Audit Trails",
    free: "Basic logs",
    pro: "Advanced",
    enterprise: "Full + compliance export",
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
  const [showComparison, setShowComparison] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-20 md:py-28 lg:py-32 px-6"
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
        <div className="pricing-cards mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card flex flex-col p-5 md:p-6 rounded-2xl border-2 transition-shadow duration-200 hover:shadow-md ${
                plan.featured
                  ? "border-accent"
                  : "border-line hover:border-secondary/30"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-heading">
                    {plan.name}
                  </h3>
                  {"badge" in plan && plan.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-white px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold font-heading">
                    {plan.tier === "pro"
                      ? isYearly ? plan.yearlyPrice : plan.monthlyPrice
                      : plan.monthlyPrice}
                  </span>
                  {(plan.tier === "pro"
                    ? isYearly ? plan.yearlyPeriod : plan.monthlyPeriod
                    : plan.monthlyPeriod) && (
                    <span className="text-secondary font-body">
                      {plan.tier === "pro"
                        ? isYearly ? plan.yearlyPeriod : plan.monthlyPeriod
                        : plan.monthlyPeriod}
                    </span>
                  )}
                </div>
                {/* Billing toggle — Pro only */}
                {plan.tier === "pro" && (
                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`text-xs font-medium font-body transition-colors duration-200 ${
                        !isYearly ? "text-primary" : "text-secondary"
                      }`}
                    >
                      Monthly
                    </span>
                    <button
                      onClick={() => setIsYearly((prev) => !prev)}
                      className={`relative w-11 h-[22px] rounded-full transition-colors duration-300 cursor-pointer ${
                        isYearly ? "bg-accent" : "bg-secondary/30"
                      }`}
                      aria-label="Toggle billing period"
                    >
                      <span
                        className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-md transition-transform duration-300 ${
                          isYearly ? "translate-x-[20px]" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span
                      className={`text-xs font-medium font-body transition-colors duration-200 ${
                        isYearly ? "text-primary" : "text-secondary"
                      }`}
                    >
                      Yearly
                    </span>
                    {isYearly && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/15 text-green-600 px-2 py-0.5 rounded-full border border-green-500/20">
                        Save 17%
                      </span>
                    )}
                  </div>
                )}
                {plan.tier === "pro" && isYearly && (
                  <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold font-body text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    $16.67/mo billed annually
                  </p>
                )}
                <p className="mt-2 text-sm text-secondary font-body leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="mt-4 space-y-1.5 flex-1">
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 font-body text-secondary text-sm"
                  >
                    <span className="text-accent shrink-0 mt-0.5 text-xs font-bold">
                      —
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.tier === "enterprise" ? "mailto:contact@armoriq.ai" : "https://tally.so/r/obdgxM"}
                target={plan.tier === "enterprise" ? undefined : "_blank"}
                rel={plan.tier === "enterprise" ? undefined : "noopener noreferrer"}
                className={`mt-5 block w-full text-center py-2.5 rounded-full text-sm font-medium font-body transition-colors duration-200 cursor-pointer ${
                  plan.featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Feature Comparison Toggle */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setShowComparison((prev) => !prev)}
            className="inline-flex items-center gap-2 text-accent font-medium font-body hover:underline cursor-pointer"
          >
            {showComparison ? "Hide" : "Compare All Features"}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showComparison ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {showComparison && (
          <div className="comparison-table mt-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="py-3 pr-4 text-sm font-bold text-primary uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="py-3 px-4 text-sm font-bold text-primary uppercase tracking-wider text-center">
                      Free
                    </th>
                    <th className="py-3 px-4 text-sm font-bold text-accent uppercase tracking-wider text-center">
                      Pro
                    </th>
                    <th className="py-3 pl-4 text-sm font-bold text-primary uppercase tracking-wider text-center">
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
                      <td className="py-3 pr-4 text-primary font-medium">
                        {row.feature}
                      </td>
                      <td className="py-3 px-4 text-secondary text-center">
                        {row.free}
                      </td>
                      <td className="py-3 px-4 text-secondary text-center">
                        {row.pro}
                      </td>
                      <td className="py-3 pl-4 text-secondary text-center">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
