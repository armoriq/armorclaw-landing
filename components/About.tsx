"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    title: "Pre-Execution Verification",
    description:
      "Actions are validated before they run, not logged after the damage is done. ArmorClaw blocks unauthorized behavior at the source.",
  },
  {
    title: "Intent-Aware Policies",
    description:
      "Go beyond who can act. Define what should happen, under what conditions, and within what scope. Control the purpose, not just the permission.",
  },
  {
    title: "Zero-Friction Deployment",
    description:
      "Drops into your existing OpenClaw setup in minutes. No rearchitecture. No pipeline changes. Just security that works from day one.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-heading-line", {
        yPercent: 100,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
        },
      });

      gsap.from(".about-body", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-body",
          start: "top 82%",
        },
      });

      gsap.from(".about-point", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-points",
          start: "top 78%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 lg:py-40 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="about-heading">
          {[
            "OpenClaw Gives Agents Power.",
            "ArmorClaw Gives You Control.",
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <h2 className="about-heading-line text-3xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.15]">
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* Body text */}
        <div className="about-body mt-12 max-w-3xl">
          <p className="text-lg md:text-xl text-secondary leading-relaxed font-body">
            OpenClaw enables AI agents to reason, plan, and execute across
            systems. But autonomous action without intent verification creates
            risk. ArmorClaw captures agent intent at the reasoning layer and
            enforces your policies before any action executes — closing the gap
            between authentication and authorization.
          </p>
        </div>

        {/* Key points */}
        <div className="about-points mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {POINTS.map((point, i) => (
            <div key={i} className="about-point border-t-2 border-primary pt-6">
              <h3 className="text-xl font-bold font-heading">{point.title}</h3>
              <p className="mt-3 text-secondary leading-relaxed font-body">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
