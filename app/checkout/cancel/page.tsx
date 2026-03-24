export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-heading">
          Checkout Cancelled
        </h1>
        <p className="mt-4 text-lg text-secondary font-body leading-relaxed">
          No charges were made. You can return to pricing to choose a plan
          whenever you&apos;re ready.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#pricing"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-medium font-body rounded-full hover:bg-accent-hover transition-colors duration-200"
          >
            View Plans
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-medium font-body rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
