"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRIC_CARDS = [
  { label: "Total MCP Servers", value: "12", subtitle: "Active servers", bg: "#F9EDDA" },
  { label: "Total AI Agents", value: "47", subtitle: "Connected and reporting", bg: "#F9DBDB" },
  { label: "High Severity Vulns", value: "3", subtitle: "Critical & High", bg: "#C6E7EE" },
  { label: "Chain Attacks", value: "1", subtitle: "Total detected", bg: "#F3DDD3" },
  { label: "Compliance Score", value: "92%", subtitle: "Target: 95%", bg: "#E1EAD6" },
  { label: "Active Certificates", value: "8", subtitle: "MCP servers & agents", bg: "#DDDAEE" },
];

const SIDEBAR_ITEMS = [
  "Dashboard",
  "Agents",
  "MCP Server",
  "Intent Intelligence",
  "API Dashboard",
  "Quick Scan",
  "ArmorClaw",
  "Policies",
  "Audit & Logs",
  "Settings",
];

const CHART_DATA = [10, 25, 18, 42, 35, 55, 48, 62, 58, 70, 65, 72, 68, 75];

const ALERTS = [
  { type: "warning", text: "Agent 'data-sync' exceeded token limit" },
  { type: "error", text: "Chain attack detected on MCP-prod-03" },
  { type: "info", text: "New policy deployed: strict-access-v2" },
  { type: "notification", text: "Certificate expiring in 7 days" },
];

const ALERT_COLORS: Record<string, string> = {
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  notification: "#8B5CF6",
};


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

        {/* Hero dashboard mock — matches real ArmorIQ dashboard */}
        <div className="dash-hero-img mt-16 rounded-2xl border-2 border-line overflow-hidden shadow-lg">
          <div className="relative bg-[#F8F9FB]">
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-[180px] lg:w-[200px] bg-[#F2F7FF] border-r border-line shrink-0">
                {/* Logo area */}
                <div className="px-4 py-4 border-b border-line/60">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-sm bg-accent/60" />
                    </div>
                    <span className="text-sm font-bold font-heading text-primary">ArmorIQ</span>
                  </div>
                </div>
                {/* Nav items */}
                <div className="flex flex-col py-2 px-2 gap-0.5">
                  {SIDEBAR_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg text-xs font-body flex items-center gap-2 ${
                        i === 0
                          ? "bg-white text-primary font-semibold shadow-sm border border-line/40"
                          : "text-secondary hover:bg-white/50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded ${
                          i === 0 ? "bg-accent/30" : "bg-primary/10"
                        }`}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-line/60 bg-white">
                  <div>
                    <div className="text-sm font-bold font-heading text-primary">
                      Agent and MCP Security Dashboard
                    </div>
                    <div className="text-[10px] text-muted font-body">
                      Welcome to ArmorIQ - Agent Security Dashboard
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/5 border border-line flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-accent/15" />
                      <div className="h-2 w-12 bg-primary/10 rounded hidden sm:block" />
                    </div>
                  </div>
                </div>

                {/* Dashboard body */}
                <div className="p-3 md:p-5">
                  {/* 6 Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mb-4">
                    {METRIC_CARDS.map((card, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-2.5 md:p-3"
                        style={{ backgroundColor: card.bg }}
                      >
                        <div className="text-[9px] md:text-[10px] text-secondary font-body leading-tight">
                          {card.label}
                        </div>
                        <div className="mt-1 text-lg md:text-xl font-bold font-heading text-primary">
                          {card.value}
                        </div>
                        <div className="text-[8px] text-muted font-body">
                          {card.subtitle}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
                    {/* Risk Score Analysis - Area Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-3 md:p-4 border border-line/60">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold font-heading text-primary">
                          Risk Score Analysis
                        </span>
                        <div className="flex gap-1">
                          {["7d", "30d", "90d"].map((p, i) => (
                            <span
                              key={i}
                              className={`text-[9px] px-2 py-0.5 rounded font-body ${
                                i === 1
                                  ? "bg-accent text-white"
                                  : "bg-gray-100 text-secondary"
                              }`}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Area chart mock */}
                      <div className="relative h-24 md:h-36">
                        <svg
                          viewBox="0 0 280 100"
                          className="w-full h-full"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D97D55" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#D97D55" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          {[20, 40, 60, 80].map((y) => (
                            <line
                              key={y}
                              x1="0"
                              y1={y}
                              x2="280"
                              y2={y}
                              stroke="#E5E7EB"
                              strokeWidth="0.5"
                              strokeDasharray="4 2"
                            />
                          ))}
                          {/* Area fill */}
                          <path
                            d={`M0,${100 - CHART_DATA[0]} ${CHART_DATA.map(
                              (v, i) => `L${(i * 280) / (CHART_DATA.length - 1)},${100 - v}`
                            ).join(" ")} L280,100 L0,100 Z`}
                            fill="url(#chartFill)"
                          />
                          {/* Line */}
                          <path
                            d={`M0,${100 - CHART_DATA[0]} ${CHART_DATA.map(
                              (v, i) => `L${(i * 280) / (CHART_DATA.length - 1)},${100 - v}`
                            ).join(" ")}`}
                            fill="none"
                            stroke="#D97D55"
                            strokeWidth="2"
                          />
                          {/* Data points */}
                          {CHART_DATA.map((v, i) => (
                            <circle
                              key={i}
                              cx={(i * 280) / (CHART_DATA.length - 1)}
                              cy={100 - v}
                              r="2"
                              fill="#D97D55"
                            />
                          ))}
                        </svg>
                      </div>
                    </div>

                    {/* Alerts panel */}
                    <div className="bg-white rounded-xl p-3 md:p-4 border border-line/60">
                      <span className="text-xs font-bold font-heading text-primary">
                        Recent Alerts
                      </span>
                      <div className="mt-3 flex flex-col gap-2">
                        {ALERTS.map((alert, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2 rounded-lg bg-gray-50"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-1 shrink-0"
                              style={{ backgroundColor: ALERT_COLORS[alert.type] }}
                            />
                            <div>
                              <span className="text-[9px] md:text-[10px] text-primary font-body leading-tight block">
                                {alert.text}
                              </span>
                              <span className="text-[8px] text-muted font-body">2h ago</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Distribution & Activity row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Agent Distribution */}
                    <div className="bg-white rounded-xl p-3 md:p-4 border border-line/60">
                      <span className="text-xs font-bold font-heading text-primary">
                        Agent / Server Distribution
                      </span>
                      <div className="mt-3 flex items-end gap-1.5 h-16 md:h-20">
                        {[
                          { s: 3, a: 8 },
                          { s: 5, a: 12 },
                          { s: 4, a: 15 },
                          { s: 7, a: 20 },
                          { s: 6, a: 25 },
                          { s: 8, a: 32 },
                          { s: 10, a: 40 },
                          { s: 12, a: 47 },
                        ].map((d, i) => (
                          <div key={i} className="flex-1 flex flex-col gap-0.5 items-stretch">
                            <div
                              className="bg-accent/30 rounded-t"
                              style={{ height: `${d.a}%` }}
                            />
                            <div
                              className="bg-blue-400/30 rounded-t"
                              style={{ height: `${d.s * 2}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-sm bg-accent/30" />
                          <span className="text-[8px] text-muted font-body">Agents</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-sm bg-blue-400/30" />
                          <span className="text-[8px] text-muted font-body">Servers</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Log */}
                    <div className="bg-white rounded-xl p-3 md:p-4 border border-line/60">
                      <span className="text-xs font-bold font-heading text-primary">
                        Activity Log
                      </span>
                      <div className="mt-3 flex flex-col gap-1.5">
                        {[
                          "Agent 'data-sync' registered successfully",
                          "Policy 'strict-access-v2' deployed",
                          "MCP server 'prod-03' scan completed",
                          "Certificate renewed for agent-auth-01",
                          "New team member onboarded",
                        ].map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-1.5 border-b border-line/30 last:border-0"
                          >
                            <span className="text-[9px] md:text-[10px] text-primary font-body">
                              {msg}
                            </span>
                            <span className="text-[8px] text-muted font-body shrink-0 ml-2">
                              {i === 0 ? "just now" : `${i * 2}h ago`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
