"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".hero-line", ".hero-divider", ".hero-sub", ".hero-cta-group"], {
        opacity: 0,
      });
      gsap.set(".hero-line", { y: 18 });
      gsap.set(".hero-divider", { scaleX: 0 });
      gsap.set(".hero-sub", { y: 12 });
      gsap.set(".hero-cta-group", { y: 12 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".hero-line", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      })
        .to(
          ".hero-divider",
          { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.inOut" },
          "-=0.2"
        )
        .to(
          ".hero-sub",
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
          "-=0.15"
        )
        .to(
          ".hero-cta-group",
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
          "-=0.15"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Animated SVG Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient background */}
            <radialGradient id="hero-glow-1" cx="25%" cy="35%" r="50%">
              <stop offset="0%" stopColor="#E07B4C" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#E07B4C" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hero-glow-2" cx="75%" cy="65%" r="45%">
              <stop offset="0%" stopColor="#E07B4C" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#E07B4C" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hero-glow-3" cx="50%" cy="20%" r="35%">
              <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft gradient washes */}
          <rect width="100%" height="100%" fill="url(#hero-glow-1)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 40,20; 0,0"
              dur="18s"
              repeatCount="indefinite"
            />
          </rect>
          <rect width="100%" height="100%" fill="url(#hero-glow-2)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -30,-15; 0,0"
              dur="22s"
              repeatCount="indefinite"
            />
          </rect>
          <rect width="100%" height="100%" fill="url(#hero-glow-3)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,-30; 0,0"
              dur="15s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Floating geometric shapes */}
          {/* Hexagon - top left */}
          <polygon
            points="120,60 150,40 180,60 180,95 150,115 120,95"
            fill="none"
            stroke="#E07B4C"
            strokeWidth="1"
            opacity="0.12"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 150 77;360 150 77"
              dur="45s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.12;0.2;0.12"
              dur="6s"
              repeatCount="indefinite"
            />
          </polygon>

          {/* Circle - top right */}
          <circle
            cx="85%"
            cy="15%"
            r="35"
            fill="none"
            stroke="#E07B4C"
            strokeWidth="0.8"
            opacity="0.1"
          >
            <animate
              attributeName="r"
              values="35;42;35"
              dur="8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.1;0.18;0.1"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Triangle - bottom left */}
          <polygon
            points="80,85 110,30 140,85"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="0.8"
            opacity="0.06"
            transform="translate(50, 600)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="50,600; 70,580; 50,600"
              dur="12s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.06;0.12;0.06"
              dur="7s"
              repeatCount="indefinite"
            />
          </polygon>

          {/* Diamond - center right */}
          <rect
            x="0"
            y="0"
            width="28"
            height="28"
            fill="none"
            stroke="#E07B4C"
            strokeWidth="0.8"
            opacity="0.1"
            transform="translate(900, 350) rotate(45)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="900,350; 880,330; 900,350"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.1;0.2;0.1"
              dur="5s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Small floating dots / particles */}
          {[
            { cx: "10%", cy: "25%", r: 2.5, dur: "7s", delay: "0s" },
            { cx: "20%", cy: "70%", r: 2, dur: "9s", delay: "1s" },
            { cx: "35%", cy: "15%", r: 1.8, dur: "6s", delay: "2s" },
            { cx: "50%", cy: "80%", r: 2.2, dur: "11s", delay: "0.5s" },
            { cx: "65%", cy: "30%", r: 1.5, dur: "8s", delay: "3s" },
            { cx: "75%", cy: "75%", r: 2.8, dur: "10s", delay: "1.5s" },
            { cx: "90%", cy: "45%", r: 2, dur: "7.5s", delay: "2.5s" },
            { cx: "15%", cy: "50%", r: 1.5, dur: "9.5s", delay: "4s" },
            { cx: "45%", cy: "40%", r: 1.8, dur: "8.5s", delay: "0.8s" },
            { cx: "80%", cy: "60%", r: 2, dur: "6.5s", delay: "1.2s" },
            { cx: "55%", cy: "10%", r: 1.5, dur: "10.5s", delay: "3.5s" },
            { cx: "30%", cy: "90%", r: 2.2, dur: "7.8s", delay: "2.2s" },
          ].map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="#E07B4C"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.25;0"
                dur={dot.dur}
                begin={dot.delay}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,-20; 0,0"
                dur={dot.dur}
                begin={dot.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Connecting lines - network pattern */}
          <line
            x1="15%"
            y1="20%"
            x2="35%"
            y2="15%"
            stroke="#E07B4C"
            strokeWidth="0.5"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.1;0"
              dur="8s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="65%"
            y1="30%"
            x2="85%"
            y2="15%"
            stroke="#E07B4C"
            strokeWidth="0.5"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.08;0"
              dur="10s"
              begin="2s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="20%"
            y1="70%"
            x2="50%"
            y2="80%"
            stroke="#1A1A1A"
            strokeWidth="0.5"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.06;0"
              dur="9s"
              begin="1s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="75%"
            y1="75%"
            x2="90%"
            y2="45%"
            stroke="#E07B4C"
            strokeWidth="0.5"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.1;0"
              dur="7s"
              begin="3s"
              repeatCount="indefinite"
            />
          </line>

          {/* Pulsing ring - center */}
          <circle
            cx="50%"
            cy="50%"
            r="120"
            fill="none"
            stroke="#E07B4C"
            strokeWidth="0.5"
            opacity="0"
          >
            <animate
              attributeName="r"
              values="120;200;120"
              dur="14s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.06;0"
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="50%"
            cy="50%"
            r="80"
            fill="none"
            stroke="#E07B4C"
            strokeWidth="0.3"
            opacity="0"
          >
            <animate
              attributeName="r"
              values="80;160;80"
              dur="14s"
              begin="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.04;0"
              dur="14s"
              begin="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <h1 className="font-heading font-bold tracking-tight leading-[1.1]">
          <span className="hero-line block text-4xl md:text-6xl lg:text-7xl">
            Secure Every Intent.
          </span>
          <span className="hero-line block text-4xl md:text-6xl lg:text-7xl">
            Before It Executes.
          </span>
        </h1>

        <div className="hero-divider w-20 h-[2px] bg-accent mx-auto mt-8 origin-center" />

        <p className="hero-sub mt-8 text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed font-body">
          ArmorClaw adds intent assurance to your OpenClaw agents. Every action
          is verified against your policies before it runs. No drift,
          no escalation, no unauthorized behavior.
        </p>

        <div className="hero-cta-group mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="http://localhost:5174/auth"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-medium font-body rounded-full hover:bg-accent-hover transition-colors duration-200 text-base"
          >
            Get Started
          </a>
          <a
            href="https://docs-openclaw.armoriq.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-primary text-primary font-medium font-body rounded-full hover:bg-primary hover:text-white transition-colors duration-200 text-base"
          >
            Docs
          </a>
        </div>
      </div>
    </section>
  );
}
