import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SubpageLayout from '@/components/SubpageLayout';
import SEO from '@/components/SEO';

type CaseStudy = {
  title: string;
  problem: string;
  solution: string;
  results: string[];
  imageUrl?: string;
  /** Product page URL — set when ready (internal path or full URL). */
  productUrl: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function GoToProductLink({ href }: { href: string }) {
  const isExternal = /^https?:\/\//i.test(href);
  const className =
    "group inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_44px_rgba(249,115,22,0.5)]";
  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        Go to product
        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      Go to product
      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

const CaseStudies = () => {
  return (
    <SubpageLayout>
      <SEO
        title="AIROTIX | Case Studies"
        description="Real-world AI deployments by AIROTIX — proven results in retail, healthcare, and manufacturing."
      />

      <div className="relative w-full overflow-hidden bg-black py-16 md:py-24">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.08),transparent_70%)] blur-3xl" />
          <div className="absolute bottom-1/4 right-[-5%] h-[300px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.05),transparent_70%)] blur-3xl" />
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
              Proven Results
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              Case{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                Studies
              </span>
            </h1>
            <p className="max-w-[700px] text-lg leading-relaxed text-[#A8A8A8] md:text-xl">
              Real-world deployments that delivered measurable business impact.
            </p>
          </motion.div>

          {/* Case study cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mx-auto flex max-w-[1100px] flex-col gap-10"
          >
            {cases.map((c, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-orange-300/30 hover:shadow-[0_0_70px_rgba(249,115,22,0.14)]"
              >
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(249,115,22,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {c.imageUrl && (
                  <div className="relative h-64 w-full overflow-hidden md:h-80">
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                )}

                <div className="relative p-8">
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <span className="rounded-full border border-orange-400/30 bg-orange-500/[0.08] px-3 py-1 text-xs font-bold tracking-wider text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.15)] backdrop-blur-sm">
                      CASE — {String(i + 1).padStart(3, '0')}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{c.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#A8A8A8]">Problem</h3>
                      <p className="text-sm leading-relaxed text-[#A8A8A8]">{c.problem}</p>
                    </div>
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#A8A8A8]">Solution</h3>
                      <p className="text-sm leading-relaxed text-[#A8A8A8]">{c.solution}</p>
                    </div>
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#A8A8A8]">Results</h3>
                      <ul className="space-y-2.5">
                        {c.results.map((r, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#A8A8A8]">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-white/[0.08] pt-6">
                    {c.productUrl.trim() ? (
                      <GoToProductLink href={c.productUrl.trim()} />
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/40 backdrop-blur-sm"
                        title="Product link coming soon"
                      >
                        Go to product
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </SubpageLayout>
  );
};

const cases: CaseStudy[] = [
  {
    title: "Preduit: AI-Powered Retail Inventory Optimization",
    imageUrl: "/lovable-uploads/case-study-preduit-retail.png",
    problem: "A national retail chain struggled with inventory discrepancies across 200+ locations, resulting in stockouts and overstock costing millions annually.",
    solution: "Deployed a computer vision + ML pipeline integrated with ERP systems for real-time shelf monitoring, automated reorder triggers, and discrepancy alerts.",
    results: [
      "34% reduction in inventory discrepancies",
      "$2.1M annual savings in waste reduction",
      "Real-time visibility across all locations"
    ],
    productUrl: "https://preduit-lp-ten.vercel.app/",
  },
  {
    title: "Nuvantica: Clinical Trial Study Management Platform",
    imageUrl: "/lovable-uploads/case-study-nuvantica-analytics.png",
    problem: "Clinical research teams struggled to manage active studies across disconnected tools, making it difficult to track progress, coordinate stakeholders, and keep professionals aligned on the same clinical trial workstreams.",
    solution: "Built Nuvantica, a centralized platform for managing and tracking clinical trial-related studies end to end, while also helping researchers, coordinators, and other professionals connect and collaborate around the same studies in real time.",
    results: [
      "Unified study tracking across teams and trial milestones",
      "Improved coordination between professionals working on the same studies",
      "Greater visibility into study progress, status, and follow-up actions"
    ],
    productUrl: "https://www.nuvantica.com",
  },
  {
    title: "Manufacturing Defect Detection",
    imageUrl: "/lovable-uploads/case-study-manufacturing-robotics.png",
    problem: "A precision manufacturing facility relied on manual visual inspection, missing subtle defects and struggling with consistency across shifts.",
    solution: "Deployed inline computer vision cameras with custom-trained models for real-time defect detection at production speed, integrated with the factory MES.",
    results: [
      "120 FPS real-time inspection throughput",
      "Defect escape rate reduced from 2.3% to 0.08%",
      "ROI achieved within 4 months of deployment"
    ],
    productUrl: "",
  }
];

export default CaseStudies;