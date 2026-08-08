import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  RefreshCw,
  Rocket,
  Search,
  Sparkles,
  TestTube,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery & Genesis",
    description:
      "We define the business outcome, map the workflow, quantify success metrics, and identify where AI creates durable value.",
    branches: ["Stakeholder interviews", "Data landscape audit", "Feasibility assessment"],
  },
  {
    icon: Database,
    title: "Data Collection & Curation",
    description:
      "We build the datasets, labeling loops, and data quality checks needed for reliable models in real operating conditions.",
    branches: ["Annotation pipelines", "Synthetic data generation", "Quality validation"],
  },
  {
    icon: Cpu,
    title: "Model Development",
    description:
      "We train, fine-tune, and benchmark architectures until accuracy, latency, cost, and safety targets are ready for deployment.",
    branches: ["Architecture selection", "Transfer learning", "Hyperparameter tuning"],
  },
  {
    icon: TestTube,
    title: "Testing & Optimization",
    description:
      "We stress-test edge cases, evaluate failure modes, and verify the system with the people who will operate it.",
    branches: ["A/B benchmarking", "Edge-case testing", "Latency profiling"],
  },
  {
    icon: Rocket,
    title: "Deployment",
    description:
      "We ship to edge, cloud, or on-prem environments with monitoring, alerts, handoff, and rollback plans.",
    branches: ["CI/CD pipelines", "Containerized delivery", "Health monitoring"],
  },
  {
    icon: RefreshCw,
    title: "Scaling & Continuous Learning",
    description:
      "We extend the system across teams and sites while improving models with fresh data and production feedback.",
    branches: ["Drift detection", "Automated retraining", "Multi-site rollout"],
  },
];

const Process = () => {
  return (
    <section id="process" className="relative overflow-hidden bg-[#090909] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(249,115,22,0.14),transparent_28%),linear-gradient(180deg,transparent,rgba(255,255,255,0.035),transparent)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">
            <Sparkles className="h-3.5 w-3.5" />
            How We Work
          </div>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
            A delivery process built for production risk, not prototype theater.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Every engagement moves through a practical system of discovery,
            data readiness, model work, testing, deployment, and ongoing
            improvement.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="relative mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-orange-300/20 to-transparent lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[24px] bg-white/[0.04] p-px shadow-[0_24px_90px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_80px_rgba(249,115,22,0.16)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(130deg,transparent,rgba(249,115,22,0.34),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative h-full rounded-[23px] border border-white/10 bg-[#0f0f11]/92 p-6 backdrop-blur-xl transition-colors group-hover:border-orange-300/35">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/25 bg-orange-500/10 text-orange-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
                  <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
                    {step.branches.map((branch) => (
                      <div key={branch} className="flex items-center gap-2 text-sm text-zinc-500">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.8)]" />
                        {branch}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default Process;
