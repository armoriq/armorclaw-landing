"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For teams exploring intent assurance with small-scale agent deployments.",
    features: [
      "Up to 50 agents",
      "Basic intent logging",
      "Community support",
      "7-day log retention",
      "Standard policies",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    description: "Full intent assurance for production agent workloads with custom policy control.",
    features: [
      "Up to 500 agents",
      "Full intent assurance",
      "Custom policy engine",
      "Priority support",
      "90-day log retention",
      "Advanced audit trails",
    ],
    cta: "Start Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure, compliance, and support for large-scale deployments.",
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
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pricing-heading",
          start: "top 82%",
        },
      });

      gsap.from(".pricing-sub", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pricing-sub",
          start: "top 85%",
        },
      });

      gsap.from(".pricing-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pricing-cards",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 md:py-32 lg:py-40 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="pricing-heading text-3xl md:text-5xl font-bold font-heading tracking-tight text-center">
          Simple, Transparent Pricing
        </h2>
        <p className="pricing-sub mt-4 text-lg text-secondary text-center font-body">
          Start free. Scale when you&apos;re ready.
        </p>

        {/* Cards */}
        <div className="pricing-cards mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card flex flex-col p-8 md:p-10 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                plan.featured
                  ? "border-accent"
                  : "border-line hover:border-secondary/30"
              }`}
            >
              {/* Plan header */}
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

              {/* Features */}
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

              {/* CTA */}
              <a
                href="#"
                className={`mt-8 block text-center py-3.5 rounded-full font-medium font-body transition-colors duration-200 ${
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
      </div>
    </section>
  );
}
