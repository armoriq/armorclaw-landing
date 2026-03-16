"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Agent Reasons",
    description:
      "Your OpenClaw agent formulates its execution plan — selecting tools, scoping data access, and preparing actions across connected systems.",
  },
  {
    title: "Intent Captured",
    description:
      "ArmorClaw intercepts the agent's declared intent before execution begins. The purpose, scope, and planned actions are captured and structured for evaluation.",
  },
  {
    title: "Policy Evaluated",
    description:
      "Every captured intent is verified against your access policies, business rules, and compliance constraints. Misalignment is caught before it becomes a problem.",
  },
  {
    title: "Safe Execution",
    description:
      "Only approved actions proceed. Violations are blocked, flagged, and logged — giving you a complete audit trail and continuous proof of control.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hiw-header", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".hiw-header", start: "top 88%" },
      });

      const steps = gsap.utils.toArray<HTMLElement>(".hiw-step");
      steps.forEach((step) => {
        gsap.from(step, {
          y: 18,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: step, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 md:py-32 lg:py-40 px-6 bg-surface"
    >
      <div className="max-w-6xl mx-auto">
        <div className="hiw-header text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-xl mx-auto font-body">
            Four steps from reasoning to safe execution
          </p>
        </div>

        <div className="relative mt-20 md:mt-28">
          {/* Static vertical line */}
          <div className="hidden md:block absolute left-[60px] top-0 bottom-0 w-px bg-line" />

          <div className="space-y-14 md:space-y-20">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="hiw-step flex items-start gap-6 md:gap-12"
              >
                <span className="shrink-0 w-[120px] text-6xl md:text-8xl font-bold font-heading text-accent/[0.12] leading-none select-none text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="pt-2 md:pt-6 max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-bold font-heading">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg text-secondary leading-relaxed font-body">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
