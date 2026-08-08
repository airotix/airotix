import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Radio } from "lucide-react";
import { SERVICES_OFFERINGS } from "@/data/servicesOfferings";

const serviceHighlights = [
  "Architecture and implementation under one team",
  "Production observability from day one",
  "Enterprise handoff, training, and adoption support",
];

const ServicesAiSection = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-y border-white/10 bg-[#090909] py-20 text-white md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.15),transparent_30%),radial-gradient(circle_at_82%_48%,rgba(56,189,248,0.08),transparent_26%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">
            <Radio className="h-3.5 w-3.5" />
            What We Build
          </div>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
            AI systems designed for the messy middle of enterprise work.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            From model strategy to production deployment, AIROTIX turns cameras,
            documents, data, and workflows into systems that teams can actually
            operate.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {SERVICES_OFFERINGS.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[24px] bg-white/[0.04] p-px shadow-[0_24px_90px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_80px_rgba(249,115,22,0.16)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(249,115,22,0.42),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative h-full rounded-[23px] border border-white/10 bg-[#0f0f11]/92 p-6 backdrop-blur-xl transition-colors group-hover:border-orange-300/35 md:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-300/25 bg-orange-500/10 text-orange-200 shadow-[0_0_38px_rgba(249,115,22,0.14)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-white">
                          {service.title}
                        </h3>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-500">
                          Production-ready
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-zinc-400 md:text-base">
                        {service.description}
                      </p>
                      <a
                        href="#contact"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-100"
                      >
                        Scope this capability
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {serviceHighlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-zinc-300 backdrop-blur-xl"
            >
              <CheckCircle2 className="mb-3 h-4 w-4 text-orange-300" />
              {highlight}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default ServicesAiSection;
