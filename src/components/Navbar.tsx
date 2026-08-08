import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleContactClick = () => {
    setIsMenuOpen(false);
    if (window.location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate('/#contact');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/industries', label: 'Industries' },
    { to: '/insights', label: 'Insights' },
    { to: '/case-studies', label: 'Case Studies' },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 w-full px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating glass pill container */}
      <div
        className={cn(
          "mx-auto flex h-[64px] sm:h-[72px] max-w-6xl items-center justify-between rounded-full border border-white/[0.08] px-4 sm:px-6 text-white backdrop-blur-xl transition-all duration-300",
          isScrolled
            ? "bg-black/70 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            : "bg-black/45 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        )}
      >
        {/* Logo */}
        <div className="flex-shrink-0 z-20">
          <Link
            to="/"
            className="group flex items-center transition-all duration-300"
          >
            <img
              src="/lovable-uploads/airotix.logo.white.png"
              alt="AIROTIX Technologies Logo"
              className="h-9 w-[150px] object-cover object-center tracking-[0.08em] transition-all duration-300 drop-shadow-[0_0_0_rgba(249,115,22,0)] group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.55)]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 z-20">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "group relative px-4 py-2 text-sm font-medium transition-colors duration-[250ms]",
                  active ? "text-white" : "text-[#A8A8A8] hover:text-white"
                )}
              >
                {link.label}
                {/* Animated underline / glowing indicator */}
                <span
                  className={cn(
                    "absolute left-1/2 -bottom-0.5 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-[250ms]",
                    active
                      ? "w-5 opacity-100 shadow-[0_0_10px_rgba(249,115,22,0.7)]"
                      : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.6)]"
                  )}
                />
              </Link>
            );
          })}

          {/* CTA */}
          <button
            onClick={handleContactClick}
            className="ml-3 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_14px_44px_rgba(249,115,22,0.5)]"
          >
            Book a Strategy Call
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden z-20">
          <button
            onClick={toggleMenu}
            className="rounded-full p-2 text-white transition-colors hover:bg-white/10 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden mx-auto max-w-6xl transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-[32rem] opacity-100 mt-2" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 rounded-3xl border border-white/[0.08] bg-black/85 px-4 pb-5 pt-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/[0.06] text-white"
                    : "text-[#A8A8A8] hover:bg-white/[0.05] hover:text-white"
                )}
                onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={handleContactClick}
            className="mt-3 block w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_8px_30px_rgba(249,115,22,0.3)]"
          >
            Book a Strategy Call
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;