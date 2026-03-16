"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ComingSoon() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".coming-soon-content", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".coming-soon-content", start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="coming-soon-content rounded-2xl border-2 border-accent/20 bg-accent/[0.03] p-8 md:p-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full font-body">
            Coming Soon
          </span>
          <h3 className="mt-6 text-2xl md:text-3xl font-bold font-heading">
            OpenClaw Skill&apos;s Vulnerability Scanner
          </h3>
          <p className="mt-4 text-secondary text-lg leading-relaxed font-body max-w-2xl mx-auto">
            Scan your OpenClaw agent endpoints for vulnerabilities before they
            become threats. AI-powered analysis with severity classification
            and actionable recommendations.
          </p>
          <p className="mt-6 text-accent font-medium font-body">
            Dropping next week.
          </p>
        </div>
      </div>
    </section>
  );
}
