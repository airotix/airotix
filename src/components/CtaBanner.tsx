import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, FileText } from "lucide-react";

const CtaBanner = () => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cta-banner" className="relative overflow-hidden bg-[#090909] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-8 text-center shadow-[0_40px_150px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-12 lg:p-16"
      >
        <motion.div
          animate={{ x: ["-6%", "6%", "-6%"], y: ["4%", "-4%", "4%"] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.28),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(59,130,246,0.14),transparent_25%),radial-gradient(circle_at_45%_95%,rgba(255,255,255,0.10),transparent_30%)]"
        />
        <div className="relative mx-auto max-w-4xl">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-300/25 bg-orange-500/10 text-orange-200">
            <BrainCircuit className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Built for performance. Designed for measurable impact.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Move from AI concept to operating system with engineers who can
            design, deploy, measure, and improve the whole workflow.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToContact}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-orange-300/30 bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_60px_rgba(249,115,22,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(249,115,22,0.38)]"
            >
              Book a Free Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/case-studies"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-orange-300/35 hover:bg-orange-500/10"
            >
              See Case Studies
              <FileText className="h-4 w-4 transition-transform group-hover:scale-110" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaBanner;
