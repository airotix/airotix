import { ArrowRight, MessageSquare, Sparkles, Cpu, Layers, Building2, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { memo, useRef } from "react";
import { HeroSplineSafe } from "@/components/HeroSplineSafe";

const SPLINE_SCENE = "https://prod.spline.design/vV7NiZMIPomHZZRI/scene.splinecode";

/* ------------------------------------------------------------------ */
/*  Floating glass stat card — kept for later, not rendered for now    */
/* ------------------------------------------------------------------ */

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
  animationDelay?: number;
  floatDelay?: string;
};

const StatCard = ({
  icon,
  value,
  label,
  className = "",
  animationDelay = 0,
  floatDelay = "0s",
}: StatCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: animationDelay }}
      className={`absolute z-30 ${className}`}
    >
      <div
        className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(255,138,0,0.35)]"
        style={prefersReducedMotion ? undefined : { animation: `float-slow 7s ease-in-out ${floatDelay} infinite` }}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-500/10 text-orange-300">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold leading-none text-white sm:text-lg">{value}</p>
          <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Silence "unused" for the temporarily-hidden pieces so re-enabling is a one-liner.
void StatCard;
void Cpu;
void Layers;
void Building2;
void Zap;

/* ------------------------------------------------------------------ */
/*  Primary hero                                                       */
/* ------------------------------------------------------------------ */

const Hero = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* Cursor-follow focus: reveal the sharp brain in a soft circle around the mouse. */
  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const ov = overlayRef.current;
    if (!ov) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ov.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ov.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const handlePointerEnter = () =>
    overlayRef.current?.style.setProperty("--focus-r", "170px");
  const handlePointerLeave = () =>
    overlayRef.current?.style.setProperty("--focus-r", "0px");

  // Stagger the centered content on load.
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      onMouseMove={handlePointerMove}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      className="relative flex min-h-[75svh] w-full items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* ---------------- BACKGROUND BRAIN LAYER ---------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        {/* Brain visualization — pushed back, centered behind the headline. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, y: prefersReducedMotion ? 0 : [0, -8, 0] }}
          transition={{
            opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative h-[680px] w-full max-w-[1060px] sm:h-[840px] sm:max-w-[1240px] lg:h-[1060px] lg:max-w-[1480px] xl:h-[1180px] xl:max-w-[1640px]"
        >
          <div className="spline-scale relative h-full w-full">
            <HeroSplineSafe scene={SPLINE_SCENE} />
          </div>
        </motion.div>

        {/* Depth + focus overlay: blurs/darkens the brain, except in a soft
            circle that follows the cursor to reveal its real textures. */}
        <div ref={overlayRef} className="brain-depth-overlay absolute inset-0 z-[1]" />
      </div>

      {/* ---------------- FOREGROUND CENTERED CONTENT ---------------- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[880px] flex-col items-center px-5 text-center sm:px-8"
      >
        {/* Enterprise AI Solutions badge */}
        <motion.div
          variants={itemVariants}
          className="pointer-events-auto group mb-8 inline-flex items-center gap-2.5 rounded-full border border-orange-400/30 bg-white/[0.03] py-2 pl-3 pr-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200/90 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,138,0,0.25)]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400">
            <Sparkles className="h-3 w-3 text-black" />
          </span>
          Enterprise AI Solutions
        </motion.div>

        {/* Main headline — centered, orange highlight on the key phrase */}
        <motion.h1
          variants={itemVariants}
          className="max-w-[760px] text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]"
        >
          Transforming Businesses with{" "}
          <span className="text-gradient-orange">AI, Computer Vision &amp; Automation</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-7 max-w-[560px] text-[16px] leading-[1.7] text-[#C2C2C2] [text-shadow:0_1px_16px_rgba(0,0,0,0.5)] sm:text-[17px]"
        >
          AIROTIX builds high-performance AI, computer vision, and automation
          systems that see, understand, and act in real time — engineered for
          enterprise scale and production reliability.
        </motion.p>

        {/* CTA buttons — centered */}
        <motion.div
          variants={itemVariants}
          className="pointer-events-auto mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center"
        >
          <Link
            to="/case-studies"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 text-[15px] font-semibold text-black shadow-[0_10px_40px_rgba(255,138,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,138,0,0.55)] sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Explore Case Studies
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          <button
            type="button"
            onClick={scrollToContact}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(255,138,0,0.2)] sm:w-auto"
          >
            Talk to an Expert
            <MessageSquare className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
