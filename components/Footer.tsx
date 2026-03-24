export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <img
            src="/images/logo.jpeg"
            alt="ArmorIQ"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-sm text-muted font-body">
            ArmorClaw by ArmorIQ
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary font-body">
          <a
            href="#about"
            className="hover:text-primary transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#pricing"
            className="hover:text-primary transition-colors duration-200"
          >
            Pricing
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200"
          >
            Documentation
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        <span className="text-sm text-muted font-body">
          &copy; {new Date().getFullYear()} ArmorIQ. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
