"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BUILDERS = [
  {
    name: "Coming Soon",
    title: "Builder Spotlight #1",
    description: "See how teams are using ArmorClaw to secure their OpenClaw agent deployments.",
    videoSrc: "", // Add video URL here e.g. "/videos/spotlight-1.mp4"
  },
  {
    name: "Coming Soon",
    title: "Builder Spotlight #2",
    description: "Watch real-world use cases of intent assurance in production environments.",
    videoSrc: "", // Add video URL here e.g. "/videos/spotlight-2.mp4"
  },
  {
    name: "Coming Soon",
    title: "Builder Spotlight #3",
    description: "Learn how ArmorClaw integrates into existing agent workflows.",
    videoSrc: "", // Add video URL here e.g. "/videos/spotlight-3.mp4"
  },
  {
    name: "Coming Soon",
    title: "Builder Spotlight #4",
    description: "Discover how ArmorClaw enforces policy compliance across multi-agent architectures.",
    videoSrc: "", // Add video URL here e.g. "/videos/spotlight-4.mp4"
  },
  {
    name: "Coming Soon",
    title: "Builder Spotlight #5",
    description: "See ArmorClaw in action — real-time chain attack detection and prevention.",
    videoSrc: "", // Add video URL here e.g. "/videos/spotlight-5.mp4"
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".showcase-header", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".showcase-header", start: "top 88%" },
      });

      gsap.from(".showcase-card", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".showcase-cards", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="py-24 md:py-32 lg:py-40 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="showcase-header text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            Built on ArmorClaw
          </h2>
          <p className="mt-4 text-lg text-secondary font-body max-w-2xl mx-auto">
            See what teams are building with ArmorClaw and ArmorIQ — securing
            autonomous agents at scale.
          </p>
        </div>

        <div className="showcase-cards mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {BUILDERS.map((builder, i) => (
            <div
              key={i}
              className="showcase-card group flex flex-col rounded-2xl border-2 border-line overflow-hidden hover:border-secondary/30 transition-all duration-200"
            >
              {/* Video placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-surface to-line flex items-center justify-center overflow-hidden">
                {builder.videoSrc ? (
                  <video
                    className="w-full h-full object-cover"
                    src={builder.videoSrc}
                    controls
                    preload="metadata"
                    playsInline
                    muted
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full border-2 border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors duration-200">
                      <svg
                        className="w-6 h-6 text-accent/50 group-hover:text-accent transition-colors duration-200 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-muted font-body">
                      Video coming soon
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <span className="text-xs font-medium text-accent uppercase tracking-wider font-body">
                  {builder.name}
                </span>
                <h3 className="mt-2 text-lg font-bold font-heading">
                  {builder.title}
                </h3>
                <p className="mt-2 text-secondary text-sm leading-relaxed font-body">
                  {builder.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
