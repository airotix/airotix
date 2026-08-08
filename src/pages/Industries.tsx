import { Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SubpageLayout from '@/components/SubpageLayout';
import SEO from '@/components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const Industries = () => {
  return (
    <SubpageLayout>
      <SEO
        title="AIROTIX | Industries"
        description="Discover how AIROTIX delivers tailored AI and computer vision solutions across retail, healthcare, government, and manufacturing."
      />

      <div className="relative w-full overflow-hidden bg-black py-16 md:py-24">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.08),transparent_70%)] blur-3xl" />
          <div className="absolute bottom-1/4 left-[-5%] h-[300px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.05),transparent_70%)] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mx-auto mb-16 flex max-w-[850px] flex-col items-center text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200 shadow-[0_0_24px_rgba(249,115,22,0.18)] backdrop-blur-sm sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Sectors We Serve
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              Industries We{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                Transform
              </span>
            </h1>
            <p className="max-w-[700px] text-lg leading-relaxed text-[#A8A8A8] md:text-xl">
              We build tailored AI solutions for the unique challenges of each industry we serve.
            </p>
          </motion.div>

          {/* Industry cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-2"
          >
            {industries.map((ind, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/30 hover:shadow-[0_0_70px_rgba(249,115,22,0.14)]"
              >
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(249,115,22,0.18),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col">
                  {/* Name */}
                  <h2 className="mb-5 text-2xl font-bold text-white">{ind.name}</h2>

                  <p className="mb-6 leading-relaxed text-[#A8A8A8]">{ind.description}</p>

                  {/* Tags */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {ind.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#A8A8A8] backdrop-blur-sm transition-colors duration-300 group-hover:border-orange-300/20 group-hover:text-orange-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA strip */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto mt-16 flex max-w-[1100px] flex-col items-center justify-between gap-6 rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl md:flex-row"
          >
            <p className="text-center text-sm text-[#A8A8A8] md:text-left md:text-base">
              Don't see your industry? We build custom AI solutions for any sector.
            </p>
            <a
              href="/#contact"
              className="group inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_44px_rgba(249,115,22,0.5)]"
            >
              Talk to an Expert
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </SubpageLayout>
  );
};

const industries = [
  {
    emoji: "🛒",
    name: "Retail & E-Commerce",
    description: "AI-powered inventory management, demand forecasting, personalized recommendations, and automated checkout systems that transform the shopping experience.",
    tags: ["Visual Search", "Demand Forecasting", "Smart Checkout", "Inventory AI"]
  },
  {
    emoji: "🏥",
    name: "Healthcare & Life Sciences",
    description: "Medical imaging analysis, diagnostic assistance, patient flow optimization, drug discovery acceleration, and HIPAA-compliant AI systems for clinical environments.",
    tags: ["Medical Imaging", "Diagnostic AI", "Patient Flow", "Drug Discovery"]
  },
  {
    emoji: "🏛️",
    name: "Public Sector & Government",
    description: "Intelligent surveillance, document intelligence, traffic monitoring, fraud detection, and compliance automation for safer, smarter public services.",
    tags: ["Smart Surveillance", "Doc Intelligence", "Traffic AI", "Fraud Detection"]
  },
  {
    emoji: "🏭",
    name: "Manufacturing & Industry",
    description: "Inline defect inspection, predictive maintenance, robotics vision guidance, and supply chain optimization that keep production lines running at peak efficiency.",
    tags: ["Defect Detection", "Predictive Maintenance", "Robotics Vision", "Supply Chain AI"]
  }
];

export default Industries;