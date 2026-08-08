import { CheckCircle, Sparkles, Target, Eye, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from "framer-motion";
import SubpageLayout from '@/components/SubpageLayout';
import SEO from '@/components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const About = () => {
  return (
    <SubpageLayout>
      <SEO
        title="AIROTIX | About Us"
        description="AIROTIX: Computer vision and AI automation company. We teach machines to see, understand, and make decisions from visual data."
      />

      <div className="relative w-full overflow-hidden bg-black py-16 md:py-24">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.08),transparent_70%)] blur-3xl" />
          <div className="absolute bottom-1/4 right-[-5%] h-[300px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.05),transparent_70%)] blur-3xl" />
        </div>

        {/* Content wrapper — padding for consistent alignment with back link */}
        <div className="relative z-10 w-full" style={{ paddingLeft: "35px", paddingRight: "35px" }}>
          <div className="mx-auto max-w-[1400px]">
            {/* Hero header */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mb-16"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200 shadow-[0_0_24px_rgba(249,115,22,0.18)] backdrop-blur-sm sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                About AIROTIX
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                Computer Vision.{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Real-World Impact.
                </span>
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-[#A8A8A8] md:text-xl">
                We're a technology company that focuses on building computer vision-powered
                solutions that help industries automate tasks that normally require human eyes.
                In simple words, we teach machines to see, understand, and make decisions from
                visual data.
              </p>
            </motion.div>

            {/* Split section */}
            <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="space-y-6"
              >
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A8A8] backdrop-blur-sm">
                  <Target className="h-3.5 w-3.5 text-orange-300" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold text-white">Bridging AI research & real-world business</h2>
                <p className="leading-relaxed text-[#A8A8A8]">
                  At AIROTIX, our mission is to bridge the gap between AI research and real-world
                  business problems. We combine the latest advancements (YOLOv8, TensorFlow,
                  PyTorch, OpenCV) with practical industry experience.
                </p>
                <p className="leading-relaxed text-[#A8A8A8]">
                  Our goal is to reduce inefficiencies, cut down human workload, and improve
                  decision-making through computer vision and intelligent software solutions.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-orange-300/30 hover:shadow-[0_0_60px_rgba(249,115,22,0.12)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(249,115,22,0.18),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <h3 className="mb-6 text-2xl font-bold text-white">Our Values</h3>
                  <ul className="space-y-4">
                    {values.map((v, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-orange-300" />
                        <span className="text-[#A8A8A8]">
                          <strong className="text-white">{v.title}:</strong> {v.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Our Story */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A8A8] backdrop-blur-sm">
                <Eye className="h-3.5 w-3.5 text-orange-300" />
                Our Story
              </div>
              <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">From vision to production</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {storyCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/30 hover:shadow-[0_0_50px_rgba(249,115,22,0.12)]"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-300/25 bg-orange-500/10 text-orange-200 shadow-[0_0_30px_rgba(249,115,22,0.12)]">
                      <card.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-relaxed text-[#A8A8A8]">{card.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

const values = [
  { title: "Real-Time Detection", description: "Instant defect detection in textiles, manufacturing, and packaging industries." },
  { title: "Quality Control", description: "AI-powered systems that ensure consistent product quality and reduce human error." },
  { title: "Industrial Automation", description: "Vision AI integrated into machinery for faster, safer, and more accurate operations." },
  { title: "Security Analytics", description: "Intelligent monitoring for unusual behavior detection and real-time analysis." },
];

const storyCards = [
  {
    icon: Eye,
    text: "AIROTIX was founded with the vision to make computer vision accessible to industries that need it most. We specialize in real-time defect detection, AI-powered quality control, industrial automation with vision AI, and surveillance & security analytics.",
  },
  {
    icon: Cpu,
    text: "Beyond our core computer vision expertise, we also provide supporting services including web & mobile app development, AI & automation consulting, and custom enterprise software solutions to meet broader business needs.",
  },
  {
    icon: ShieldCheck,
    text: "Our solutions analyze products on moving production lines, detect defects like scratches, misprints, holes, or misalignments, and provide intelligent monitoring that can detect unusual behavior, count people, track objects, or analyze patterns in real-time.",
  },
];

export default About;