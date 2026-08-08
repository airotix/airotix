import { Linkedin, Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const companyLinks = [
    { to: "/about", label: "About" },
    { to: "/industries", label: "Industries" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/insights", label: "Insights" },
  ];

  const serviceLinks = [
    { href: "/#services", label: "AI / ML Automation" },
    { href: "/#services", label: "Computer Vision" },
    { href: "/#services", label: "Web & App Development" },
  ];

  const legalLinks = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookies" },
    { href: "#", label: "Security" },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden border-t border-white/[0.08] bg-black pt-20 pb-10 text-white"
    >
      {/* Ambient orange glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.08),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-[-5%] h-[200px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.04),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-[35px]">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.08] pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="group mb-5 inline-flex items-center">
              <img
                src="/lovable-uploads/airotix.logo.white.png"
                alt="AIROTIX Technologies Logo"
                className="h-9 w-[150px] object-cover object-center tracking-[0.08em] transition-all duration-300 drop-shadow-[0_0_0_rgba(249,115,22,0)] group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.55)]"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-[#A8A8A8]">
              Production-grade AI systems that see, understand, and act — built for
              enterprises that demand real-time performance.
            </p>
            {/* Premium badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.15)] backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Enterprise AI
            </div>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/company/airotix/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#A8A8A8] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)]"
                aria-label="AIROTIX on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/airotix_ai?igsh=MTBld2RwMmF0ZWp6cQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#A8A8A8] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)]"
                aria-label="AIROTIX on Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
              Company
            </h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center text-sm text-[#A8A8A8] transition-colors duration-300 hover:text-white"
                  >
                    <span className="mr-0 h-[1px] w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
              Services
            </h3>
            <ul className="space-y-3.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center text-sm text-[#A8A8A8] transition-colors duration-300 hover:text-white"
                  >
                    <span className="mr-0 h-[1px] w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
              Legal
            </h3>
            <ul className="space-y-3.5">
              {legalLinks.map((link) =>
                "to" in link ? (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center text-sm text-[#A8A8A8] transition-colors duration-300 hover:text-white"
                    >
                      <span className="mr-0 h-[1px] w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center text-sm text-[#A8A8A8] transition-colors duration-300 hover:text-white"
                    >
                      <span className="mr-0 h-[1px] w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* CTA strip */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-white/[0.08] py-8 md:flex-row">
          <p className="text-center text-sm text-[#A8A8A8] md:text-left">
            Ready to build something production-grade?
          </p>
          <Link
            to="/#contact"
            className="group inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_44px_rgba(249,115,22,0.5)]"
          >
            Book a Strategy Call
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-[#A8A8A8]">
            &copy; {year} AIROTIX Technologies. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Engineered for enterprise scale & production reliability.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;