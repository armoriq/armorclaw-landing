"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 select-none"
        >
          <img
            src="/images/logo.jpeg"
            alt="ArmorIQ"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-lg font-heading font-bold text-primary">ArmorClaw</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://docs-openclaw.armoriq.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-5 py-2 border-2 border-primary text-primary text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Docs
          </a>
          <a
            href="#pricing"
            className="inline-flex px-6 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-hover transition-colors duration-200"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-line ${
          menuOpen ? "max-h-60" : "max-h-0 border-b-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://docs-openclaw.armoriq.ai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="inline-flex justify-center px-6 py-2 border-2 border-primary text-primary text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            Docs
          </a>
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="inline-flex justify-center px-6 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-hover transition-colors sm:hidden"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
