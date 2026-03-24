"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const plan = params.get("plan");
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-5xl mb-6">&#10003;</div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading">
          {plan === "free" ? "Welcome to ArmorClaw" : "Payment Successful"}
        </h1>
        <p className="mt-4 text-lg text-secondary font-body leading-relaxed">
          {plan === "free"
            ? "Your Starter plan is active. You can start securing your OpenClaw agents right away."
            : "Your subscription is now active. You'll receive a confirmation email shortly."}
        </p>

        {sessionId && (
          <p className="mt-2 text-sm text-muted font-body">
            Session: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-medium font-body rounded-full hover:bg-accent-hover transition-colors duration-200"
          >
            Back to Home
          </a>
          <a
            href="https://docs-openclaw.armoriq.ai"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-medium font-body rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Read the Docs
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-secondary font-body">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
