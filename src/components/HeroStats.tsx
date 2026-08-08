import { motion } from "framer-motion";
import { memo } from "react";

/* ------------------------------------------------------------------ */
/*  Premium stats strip + trusted-by logos below the hero             */
/* ------------------------------------------------------------------ */

type Stat = {
  value: string;
  label: string;
  suffix?: string;
};

const STATS: Stat[] = [
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Industries" },
  { value: "98.6", label: "Accuracy", suffix: "%" },
  { value: "10x", label: "Operational Efficiency" },
];

const TRUSTED_BY = ["NUVANTICA", "PREDUIT", "NOVACORE", "VERTEX", "OMNILINE", "HELIOS"];

const HeroStats = memo(() => {
  return (
    <section className="relative w-full bg-black">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Stats grid — no boxed background, sits directly on the page */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 lg:grid-cols-4 lg:py-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-white">
                {stat.value}
                {stat.suffix && (
                  <span className="text-gradient-orange">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 sm:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Trusted by */}
        <div className="py-10 lg:py-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-white/35"
          >
            Trusted by Innovative Enterprises
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
            {TRUSTED_BY.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.06 }}
                className="select-none text-sm font-semibold tracking-[0.22em] text-white/25 grayscale transition-colors duration-300 hover:text-white/50 sm:text-base"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

HeroStats.displayName = "HeroStats";

export default HeroStats;