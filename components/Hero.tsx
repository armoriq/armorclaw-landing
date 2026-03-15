"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HEADING_LINES = [
  "Secure Every Intent.",
  "Before It Executes.",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.from(".hero-word", {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.055,
        ease: "power3.out",
      })
        .from(
          ".hero-divider",
          {
            scaleX: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.25"
        )
        .from(
          ".hero-sub",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading with word-by-word reveal */}
        <h1 className="font-heading font-bold tracking-tight leading-[1.1]">
          {HEADING_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.split(" ").map((word, wordIdx) => (
                <span
                  key={`${lineIdx}-${wordIdx}`}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span className="hero-word inline-block text-4xl md:text-6xl lg:text-7xl mr-[0.25em]">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Divider */}
        <div className="hero-divider w-20 h-[2px] bg-accent mx-auto mt-8 origin-left" />

        {/* Subtitle */}
        <p className="hero-sub mt-8 text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed font-body">
          ArmorClaw adds intent assurance to your OpenClaw agents. Every action
          is verified against your policies before it runs — preventing drift,
          escalation, and unauthorized behavior.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#pricing"
            className="hero-btn inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-medium font-body rounded-full hover:bg-accent-hover transition-colors duration-200 text-base"
          >
            Get Started
          </a>
          <a
            href="#about"
            className="hero-btn inline-flex items-center justify-center px-8 py-3.5 border-2 border-primary text-primary font-medium font-body rounded-full hover:bg-primary hover:text-white transition-colors duration-200 text-base"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
