"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DASHBOARD_FEATURES = [
  {
    title: "Real-Time Analytics",
    description:
      "Monitor active agents, MCP servers, vulnerabilities, and security scores — all at a glance.",
    placeholder: "dashboard-analytics",
  },
  {
    title: "Intent Plans",
    description:
      "Track agent execution plans in real-time with active, blocked, and planned states.",
    placeholder: "intent-plans",
  },
  {
    title: "Policy Builder",
    description:
      "Visual drag-and-drop policy creation — connect agents, MCPs, users, and clients with fine-grained rules.",
    placeholder: "policy-builder",
  },
  {
    title: "Audit Logs",
    description:
      "Comprehensive activity logging with severity-based classification and full audit context.",
    placeholder: "audit-logs",
  },
];

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dash-header", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".dash-header", start: "top 88%" },
      });

      gsap.from(".dash-hero-img", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".dash-hero-img", start: "top 85%" },
      });

      gsap.from(".dash-feature", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".dash-features", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="py-24 md:py-32 lg:py-40 px-6 bg-surface"
    >
      <div className="max-w-6xl mx-auto">
        <div className="dash-header text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            The ArmorIQ Dashboard
          </h2>
          <p className="mt-4 text-lg text-secondary font-body max-w-2xl mx-auto">
            Complete visibility into your agent security posture. Monitor, control,
            and audit everything from one place.
          </p>
        </div>

        {/* Hero dashboard screenshot placeholder */}
        <div className="dash-hero-img mt-16 rounded-2xl border-2 border-line overflow-hidden shadow-lg">
          <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/[0.03] to-accent/[0.06] flex items-center justify-center">
            {/* Mock dashboard UI */}
            <div className="w-full h-full p-4 md:p-8">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20" />
                  <div className="h-3 w-32 bg-primary/10 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-3 w-16 bg-primary/10 rounded" />
                  <div className="h-3 w-16 bg-primary/10 rounded" />
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                {[
                  { label: "Active Agents", value: "47", color: "bg-blue-500/15" },
                  { label: "MCP Servers", value: "12", color: "bg-green-500/15" },
                  { label: "Security Score", value: "94%", color: "bg-accent/15" },
                  { label: "Policy Violations", value: "3", color: "bg-red-500/15" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`${card.color} rounded-xl p-3 md:p-4`}
                  >
                    <div className="text-xs text-secondary font-body">
                      {card.label}
                    </div>
                    <div className="mt-1 text-xl md:text-2xl font-bold font-heading">
                      {card.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="flex gap-4 flex-1">
                <div className="flex-1 rounded-xl bg-white/60 border border-line p-4">
                  <div className="h-3 w-24 bg-primary/10 rounded mb-4" />
                  <div className="flex items-end gap-1 h-20 md:h-32">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-accent/20 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="hidden md:flex flex-col gap-3 w-48">
                  {["Intent Plans", "Active Policies", "Recent Scans"].map(
                    (item, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-white/60 border border-line p-3 flex-1"
                      >
                        <div className="h-2 w-16 bg-primary/10 rounded mb-2" />
                        <div className="h-3 w-10 bg-accent/20 rounded" />
                        <div className="text-[10px] text-muted mt-1 font-body">
                          {item}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Overlay text */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/[0.02]">
              <span className="px-6 py-3 bg-white/90 border border-line rounded-full text-sm font-medium font-body text-secondary shadow-sm">
                Add your dashboard screenshot here
              </span>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="dash-features mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {DASHBOARD_FEATURES.map((feature, i) => (
            <div
              key={i}
              className="dash-feature rounded-2xl border-2 border-line overflow-hidden hover:border-secondary/30 transition-all duration-200"
            >
              {/* Screenshot placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-surface to-line flex items-center justify-center">
                <span className="text-sm text-muted font-body">
                  Screenshot: {feature.title}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold font-heading">
                  {feature.title}
                </h3>
                <p className="mt-2 text-secondary text-sm leading-relaxed font-body">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
