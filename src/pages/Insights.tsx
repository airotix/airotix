import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calendar,
  ChevronRight,
  Clock,
  Cpu,
  FileText,
  Hash,
  Layers3,
  Mail,
  Radio,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import SubpageLayout from '@/components/SubpageLayout';
import SEO from '@/components/SEO';

type ArticleDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
type ArticleType = 'Tutorial' | 'Research' | 'Opinion' | 'Case Study' | 'Guide';

type KnowledgeArticle = {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  tags: string[];
  difficulty: ArticleDifficulty;
  type: ArticleType;
  height: 'compact' | 'standard' | 'tall';
};

type InsightCard = {
  industry: string;
  title: string;
  summary: string;
  metric: string;
  image: string;
  icon: typeof BrainCircuit;
};

const articles: KnowledgeArticle[] = [
  {
    id: 'enterprise-rag',
    title: 'Designing Retrieval Systems That Survive Enterprise Reality',
    summary:
      'A practical architecture guide for governed RAG, evaluation loops, permissions-aware retrieval, and human review in regulated organizations.',
    category: 'LLMs',
    date: 'Jul 18, 2026',
    readTime: '12 min',
    author: 'AIROTIX Research',
    authorRole: 'Applied AI',
    authorAvatar: '/user-imgs/rohaan.png',
    image: '/bg-images/ocr-bg.avif',
    tags: ['RAG', 'Evaluation', 'Governance'],
    difficulty: 'Advanced',
    type: 'Guide',
    height: 'tall',
  },
  {
    id: 'vision-quality',
    title: 'Computer Vision Quality Control: From Pilot Line to Plant Rollout',
    summary:
      'Lessons from camera placement, annotation design, defect taxonomies, edge inference, and operator feedback loops in production inspection.',
    category: 'Computer Vision',
    date: 'Jul 10, 2026',
    readTime: '9 min',
    author: 'AIROTIX Engineering',
    authorRole: 'Vision Systems',
    authorAvatar: '/user-imgs/zaki.png',
    image: '/lovable-uploads/case-study-manufacturing-robotics.png',
    tags: ['Inspection', 'Edge AI', 'Manufacturing'],
    difficulty: 'Intermediate',
    type: 'Case Study',
    height: 'standard',
  },
  {
    id: 'agent-ops',
    title: 'Agentic Workflows Need Operations, Not Demos',
    summary:
      'How to convert AI agents into observable, auditable workflows with escalation paths, tool permissions, and measurable service levels.',
    category: 'AI Agents',
    date: 'Jul 3, 2026',
    readTime: '8 min',
    author: 'AIROTIX Labs',
    authorRole: 'Automation',
    authorAvatar: '/user-imgs/wajih.jpg',
    image: '/bg-images/marketkit-bg.avif',
    tags: ['Agents', 'Ops', 'Controls'],
    difficulty: 'Advanced',
    type: 'Research',
    height: 'compact',
  },
  {
    id: 'healthcare-trials',
    title: 'AI Workstreams for Clinical Trial Coordination',
    summary:
      'A field note on study tracking, research operations, role-based access, and AI-assisted follow-up across distributed clinical teams.',
    category: 'Healthcare',
    date: 'Jun 26, 2026',
    readTime: '7 min',
    author: 'AIROTIX Strategy',
    authorRole: 'Healthcare AI',
    authorAvatar: '/user-imgs/umair.png',
    image: '/lovable-uploads/case-study-nuvantica-analytics.png',
    tags: ['Clinical Ops', 'Workflow', 'Compliance'],
    difficulty: 'Intermediate',
    type: 'Case Study',
    height: 'standard',
  },
  {
    id: 'mlops-monitoring',
    title: 'Monitoring Models After Launch: The Signals That Matter',
    summary:
      'What teams should track beyond latency: drift, confidence movement, intervention rates, business variance, and rollback readiness.',
    category: 'MLOps',
    date: 'Jun 19, 2026',
    readTime: '10 min',
    author: 'AIROTIX Engineering',
    authorRole: 'MLOps',
    authorAvatar: '/user-imgs/umaircha.jpg',
    image: '/bg-images/industritrack-bg.png',
    tags: ['Monitoring', 'Reliability', 'SLOs'],
    difficulty: 'Advanced',
    type: 'Tutorial',
    height: 'tall',
  },
  {
    id: 'finance-automation',
    title: 'Finance Automation Without Losing Auditability',
    summary:
      'A blueprint for AI-assisted reconciliation, exception handling, approvals, and traceable evidence trails inside finance teams.',
    category: 'Finance',
    date: 'Jun 11, 2026',
    readTime: '6 min',
    author: 'AIROTIX Advisory',
    authorRole: 'Enterprise AI',
    authorAvatar: '/user-imgs/rohaan.png',
    image: '/bg-images/mottarck-bg.avif',
    tags: ['Controls', 'Risk', 'Automation'],
    difficulty: 'Intermediate',
    type: 'Guide',
    height: 'compact',
  },
  {
    id: 'data-contracts',
    title: 'Data Contracts for AI Products',
    summary:
      'Why reliable AI systems need versioned data interfaces, ownership boundaries, anomaly checks, and deployment gates before model work begins.',
    category: 'Data Engineering',
    date: 'May 30, 2026',
    readTime: '8 min',
    author: 'AIROTIX Data',
    authorRole: 'Architecture',
    authorAvatar: '/user-imgs/zaki.png',
    image: '/bg-images/visiontex-bg.png',
    tags: ['Pipelines', 'Quality', 'Architecture'],
    difficulty: 'Beginner',
    type: 'Tutorial',
    height: 'standard',
  },
  {
    id: 'warehouse-agents',
    title: 'Automating Warehouse Decisions With Human-in-the-Loop AI',
    summary:
      'A decision architecture for inventory exceptions, supervisor review, recommended actions, and ERP-integrated task creation.',
    category: 'Automation',
    date: 'May 21, 2026',
    readTime: '9 min',
    author: 'AIROTIX Delivery',
    authorRole: 'Implementation',
    authorAvatar: '/user-imgs/wajih.jpg',
    image: '/lovable-uploads/case-study-preduit-retail.png',
    tags: ['Retail', 'ERP', 'Workflow'],
    difficulty: 'Intermediate',
    type: 'Case Study',
    height: 'tall',
  },
  {
    id: 'manufacturing-copilot',
    title: 'The Plant-Floor Copilot Pattern',
    summary:
      'How manufacturers can combine machine telemetry, manuals, shift notes, and maintenance history into a useful operator assistant.',
    category: 'Manufacturing',
    date: 'May 12, 2026',
    readTime: '7 min',
    author: 'AIROTIX Research',
    authorRole: 'Industrial AI',
    authorAvatar: '/user-imgs/umair.png',
    image: '/bg-images/objdet-bg.avif',
    tags: ['Copilot', 'Telemetry', 'Maintenance'],
    difficulty: 'Beginner',
    type: 'Opinion',
    height: 'standard',
  },
];

const industryInsights: InsightCard[] = [
  {
    industry: 'Healthcare',
    title: 'Clinical operations are moving from static dashboards to AI-assisted study orchestration.',
    summary:
      'The highest-value systems connect documents, study status, professionals, follow-ups, and compliance evidence into one operating layer.',
    metric: '3.4x faster coordination cycles',
    image: '/lovable-uploads/case-study-nuvantica-analytics.png',
    icon: BrainCircuit,
  },
  {
    industry: 'Manufacturing',
    title: 'Vision systems win when the deployment plan includes operators from day one.',
    summary:
      'False-positive handling, defect taxonomy design, and MES feedback loops decide whether a pilot becomes durable factory infrastructure.',
    metric: '0.08% defect escape target',
    image: '/lovable-uploads/case-study-manufacturing-robotics.png',
    icon: Cpu,
  },
  {
    industry: 'Retail & Finance',
    title: 'Automation programs are shifting toward governed decision support.',
    summary:
      'Teams want systems that recommend, explain, log, and escalate before they execute high-impact business actions.',
    metric: '$2.1M modeled annual savings',
    image: '/lovable-uploads/case-study-preduit-retail.png',
    icon: BarChart3,
  },
];

const trendingGroups = [
  {
    title: 'Trending Articles',
    icon: TrendingUp,
    items: ['Enterprise RAG readiness', 'Agent workflow controls', 'Vision QA rollouts'],
  },
  {
    title: 'Most Read',
    icon: BookOpen,
    items: ['Model monitoring checklist', 'Data contracts for AI', 'Plant-floor copilots'],
  },
  {
    title: 'Latest Research',
    icon: Sparkles,
    items: ['Evaluation harness design', 'Synthetic defect datasets', 'Human review queues'],
  },
  {
    title: 'AI Industry Reports',
    icon: FileText,
    items: ['Healthcare AI operations', 'Industrial vision benchmark', 'Automation ROI brief'],
  },
];

const popularTags = [
  'RAG',
  'MLOps',
  'Computer Vision',
  'Agents',
  'Governance',
  'Automation',
  'Healthcare',
  'Edge AI',
  'Data Quality',
  'Finance',
  'Manufacturing',
];

const stats = [
  { value: 150, suffix: '+', label: 'Published Articles' },
  { value: 50, suffix: '+', label: 'AI Implementations' },
  { value: 20, suffix: '+', label: 'Industries Covered' },
  { value: 100, suffix: 'K+', label: 'Monthly Readers' },
];

const MotionLink = motion(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Insights = () => {
  const featuredArticle = articles[0];

  return (
    <SubpageLayout>
      <SEO
        title="AIROTIX | Insights & Innovations"
        description="Explore AIROTIX insights, production case studies, AI architecture breakdowns, enterprise automation guides, and emerging trends across industries."
        imageUrl="/lovable-uploads/case-study-manufacturing-robotics.png"
        keywords={[
          'AI consulting insights',
          'enterprise AI',
          'AI case studies',
          'MLOps',
          'computer vision',
          'AI automation',
        ]}
        type="website"
      />

      <main className="relative min-h-screen overflow-hidden bg-[#090909] text-white">
        <ParticleField />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_5%,rgba(249,115,22,0.16),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(56,189,248,0.09),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_18%)]" />

        <section className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-12 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:px-8 lg:pb-20 lg:pt-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative z-10 flex min-w-0 flex-col justify-center py-10 lg:min-h-[560px] lg:py-0"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-orange-200 shadow-[0_0_40px_rgba(249,115,22,0.12)]"
            >
              <Radio className="h-3.5 w-3.5" />
              Knowledge Hub
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-[21rem] text-balance text-[clamp(2.35rem,10vw,5.6rem)] font-semibold leading-[1.02] tracking-normal text-white sm:max-w-5xl"
            >
              AI Insights.
              <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent">
                Real <span className="block sm:inline">Deployments.</span>
              </span>
              Practical Innovation.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[21rem] text-lg leading-8 text-zinc-300 sm:max-w-2xl sm:text-xl"
            >
              Explore deep technical articles, production case studies, AI
              architecture breakdowns, enterprise automation guides, and emerging
              trends across industries.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid max-w-[21rem] grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-3"
            >
              {[
                ['Production', 'Field-tested AI systems'],
                ['Architecture', 'Patterns that scale'],
                ['Strategy', 'Enterprise adoption paths'],
              ].map(([label, copy]) => (
                <div
                  key={label}
                  className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
                >
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{copy}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="relative z-0 flex min-w-0 items-center justify-center overflow-hidden rounded-[32px] lg:min-h-[560px] lg:overflow-visible"
          >
            <AIIllustration />
          </motion.div>
        </section>

        <section className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24">
          <FeaturedArticle article={featuredArticle} />
        </section>

        <section className="relative mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
          <SectionHeader
            label="Industry Insights"
            title="Patterns we see across real AI programs"
            description="A curated read on where enterprise teams are investing, where pilots stall, and what makes AI systems durable after launch."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3"
          >
            {industryInsights.map((insight) => (
              <IndustryInsightCard key={insight.industry} insight={insight} />
            ))}
          </motion.div>
        </section>

        <section className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-24">
          <div>
            <SectionHeader
              label="Latest Articles"
              title="Implementation-grade thinking for AI leaders"
              description="Technical guides, research notes, case studies, and operational playbooks for teams moving AI out of prototype mode."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-9 columns-1 gap-5 sm:columns-2 xl:columns-3"
            >
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </motion.div>
          </div>

          <TrendingSidebar />
        </section>

        <StatsSection />
        <NewsletterSection />
        <BottomCTA />
      </main>
    </SubpageLayout>
  );
};

const SectionHeader = ({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl"
  >
    <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-orange-300">
      <Sparkles className="h-3.5 w-3.5" />
      {label}
    </div>
    <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
      {description}
    </p>
  </motion.div>
);

const ParticleField = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 34 }).map((_, index) => (
      <motion.span
        key={index}
        className="absolute h-1 w-1 rounded-full bg-orange-200/40 shadow-[0_0_18px_rgba(249,115,22,0.45)]"
        style={{
          left: `${(index * 37) % 100}%`,
          top: `${(index * 19) % 100}%`,
        }}
        animate={{
          y: [-12, 18, -12],
          opacity: [0.14, 0.65, 0.14],
          scale: [0.7, 1.35, 0.7],
        }}
        transition={{
          duration: 5 + (index % 6),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.11,
        }}
      />
    ))}
  </div>
);

const AIIllustration = () => {
  const nodes = [
    { cx: 76, cy: 86, delay: 0 },
    { cx: 176, cy: 52, delay: 0.2 },
    { cx: 286, cy: 92, delay: 0.35 },
    { cx: 118, cy: 198, delay: 0.45 },
    { cx: 244, cy: 218, delay: 0.1 },
    { cx: 352, cy: 178, delay: 0.3 },
    { cx: 196, cy: 322, delay: 0.55 },
    { cx: 330, cy: 318, delay: 0.15 },
  ];

  const lines = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 6],
    [4, 7],
    [5, 7],
  ];

  return (
    <div className="relative h-[360px] w-full max-w-[520px] sm:h-[500px] lg:h-[560px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-10 rounded-full border border-orange-300/10 bg-[conic-gradient(from_120deg,rgba(249,115,22,0.22),rgba(56,189,248,0.08),rgba(255,255,255,0.03),rgba(249,115,22,0.22))] blur-2xl"
      />
      <motion.div
        animate={{ y: [-8, 10, -8], scale: [1, 1.025, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-[32px] border border-white/10 bg-white/[0.045] shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      >
        <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.25),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_35%,rgba(255,255,255,0.04))]" />
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 sm:left-8 sm:right-8 sm:top-8">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Model Ops
          </span>
          <span className="flex items-center gap-2 text-xs text-orange-200">
            <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.9)]" />
            Live
          </span>
        </div>

        <svg
          viewBox="0 0 420 420"
          className="absolute inset-x-4 bottom-10 mx-auto h-[76%] w-[92%]"
          role="img"
          aria-label="Animated AI network illustration"
        >
          <defs>
            <linearGradient id="network-line" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="52%" stopColor="#FDBA74" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.32" />
            </linearGradient>
          </defs>
          {lines.map(([from, to], index) => {
            const start = nodes[from];
            const end = nodes[to];

            return (
              <motion.line
                key={`${from}-${to}`}
                x1={start.cx}
                y1={start.cy}
                x2={end.cx}
                y2={end.cy}
                stroke="url(#network-line)"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0.25, 1, 0.25], opacity: [0.22, 0.75, 0.22] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.12,
                }}
              />
            );
          })}

          {nodes.map((node, index) => (
            <motion.g
              key={`${node.cx}-${node.cy}`}
              animate={{
                y: [-4, 5, -4],
              }}
              transition={{
                duration: 4 + (index % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: node.delay,
              }}
            >
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="18"
                fill="rgba(249,115,22,0.08)"
                stroke="rgba(249,115,22,0.22)"
                animate={{ r: [14, 21, 14], opacity: [0.35, 0.8, 0.35] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: node.delay,
                }}
              />
              <circle cx={node.cx} cy={node.cy} r="5.5" fill="#FDBA74" />
            </motion.g>
          ))}
        </svg>

        <motion.div
          animate={{ x: [-8, 8, -8], y: [5, -6, 5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-7 hidden rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl sm:block"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Inference</p>
          <p className="mt-1 text-2xl font-semibold text-white">42ms</p>
        </motion.div>

        <motion.div
          animate={{ x: [8, -10, 8], y: [-5, 7, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-28 right-5 hidden rounded-2xl border border-orange-300/20 bg-orange-500/10 p-4 backdrop-blur-xl sm:block"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-orange-200">Eval Pass</p>
          <p className="mt-1 text-2xl font-semibold text-white">98.7%</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FeaturedArticle = ({ article }: { article: KnowledgeArticle }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.65 }}
    className="group relative overflow-hidden rounded-[28px] bg-white/[0.04] p-px shadow-[0_40px_160px_rgba(0,0,0,0.45)]"
  >
    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(249,115,22,0.55),rgba(255,255,255,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative grid overflow-hidden rounded-[27px] border border-white/10 bg-[#0d0d0f]/95 backdrop-blur-2xl lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]">
        <motion.img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover grayscale-[0.18] transition-transform duration-700 group-hover:scale-105"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.45 }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/82 via-black/26 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
          <MetaPill icon={Layers3}>{article.type}</MetaPill>
          <MetaPill icon={Target}>{article.difficulty}</MetaPill>
          <MetaPill icon={Clock}>{article.readTime}</MetaPill>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-orange-300/30 bg-orange-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-zinc-400">
            <Calendar className="h-4 w-4" />
            {article.date}
          </span>
        </div>

        <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          {article.title}
        </h2>
        <p className="mt-5 line-clamp-3 text-base leading-7 text-zinc-300 sm:text-lg">
          {article.summary}
        </p>

        <div className="mt-7 flex items-center gap-3">
          <img
            src={article.authorAvatar}
            alt=""
            className="h-11 w-11 rounded-full border border-white/10 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-white">{article.author}</p>
            <p className="text-xs text-zinc-500">{article.authorRole}</p>
          </div>
        </div>

        <div className="mt-9">
          <MagneticButton to="/case-studies" variant="primary">
            Continue Reading
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </div>
  </motion.article>
);

const IndustryInsightCard = ({ insight }: { insight: InsightCard }) => {
  const Icon = insight.icon;

  return (
    <motion.article variants={fadeUp} className="group break-inside-avoid">
      <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/30 hover:shadow-[0_0_70px_rgba(249,115,22,0.14)]">
        <div className="h-52 overflow-hidden">
          <img
            src={insight.image}
            alt={insight.industry}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
              {insight.industry}
            </span>
            <Icon className="h-5 w-5 text-orange-300" />
          </div>
          <h3 className="mt-5 text-xl font-semibold leading-snug text-white">
            {insight.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-zinc-400">{insight.summary}</p>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-sm text-zinc-500">Observed impact</p>
            <p className="mt-1 text-lg font-semibold text-orange-200">{insight.metric}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ArticleCard = ({ article }: { article: KnowledgeArticle }) => {
  const imageHeight =
    article.height === 'tall' ? 'h-72' : article.height === 'compact' ? 'h-44' : 'h-56';

  return (
    <motion.article
      variants={fadeUp}
      className="group mb-5 inline-block w-full break-inside-avoid rounded-[22px] bg-white/[0.04] p-px align-top shadow-[0_22px_70px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_80px_rgba(249,115,22,0.16)]"
    >
      <div className="relative overflow-hidden rounded-[21px] border border-white/10 bg-[#0f0f11]/90 backdrop-blur-xl transition-colors duration-500 group-hover:border-orange-300/35">
        <div className="pointer-events-none absolute inset-0 rounded-[21px] bg-[linear-gradient(125deg,transparent_20%,rgba(249,115,22,0.28),transparent_62%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className={`relative overflow-hidden ${imageHeight}`}>
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-100 backdrop-blur-xl">
            {article.category}
          </span>
        </div>

        <div className="relative p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <MetaPill icon={Clock}>{article.readTime}</MetaPill>
            <MetaPill icon={Target}>{article.difficulty}</MetaPill>
            <MetaPill icon={Layers3}>{article.type}</MetaPill>
          </div>

          <h3 className="text-xl font-semibold leading-snug text-white">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{article.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-zinc-400"
              >
                <Hash className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={article.authorAvatar}
                alt=""
                className="h-9 w-9 rounded-full border border-white/10 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{article.author}</p>
                <p className="flex items-center gap-1 text-xs text-zinc-500">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </p>
              </div>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-100"
            >
              Read More
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const MetaPill = ({
  icon: Icon,
  children,
}: {
  icon: typeof Clock;
  children: string;
}) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-xl">
    <Icon className="h-3.5 w-3.5 text-orange-300" />
    {children}
  </span>
);

const TrendingSidebar = () => (
  <aside className="hidden lg:block">
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="sticky top-24 space-y-4"
    >
      <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
        <div className="mb-5 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-300" />
          <h3 className="text-lg font-semibold text-white">Trending Articles</h3>
        </div>

        <div className="space-y-5">
          {trendingGroups.map((group) => {
            const Icon = group.icon;

            return (
              <div key={group.title} className="rounded-[18px] border border-white/10 bg-black/25 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
                  <Icon className="h-4 w-4 text-orange-300" />
                  {group.title}
                </div>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <Link
                      key={item}
                      to="/case-studies"
                      className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[24px] border border-orange-300/20 bg-orange-500/[0.08] p-5 backdrop-blur-2xl">
        <Mail className="h-5 w-5 text-orange-200" />
        <h3 className="mt-3 text-lg font-semibold text-white">Newsletter signup</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Monthly AI implementation notes for technical and business leaders.
        </p>
        <div className="mt-4 flex rounded-full border border-white/10 bg-black/35 p-1">
          <input
            aria-label="Newsletter email"
            placeholder="Work email"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
          />
          <button
            type="button"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-orange-300"
          >
            Join
          </button>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <h3 className="text-lg font-semibold text-white">Popular tags</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-orange-300/35 hover:text-orange-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </aside>
);

const StatsSection = () => (
  <section className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        >
          <Counter value={stat.value} suffix={stat.suffix} />
          <p className="mt-2 text-sm font-medium text-zinc-400 sm:text-base">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-semibold text-white sm:text-5xl">
      {displayValue}
      <span className="text-orange-300">{suffix}</span>
    </span>
  );
};

const NewsletterSection = () => (
  <section className="relative px-4 py-12 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0f] p-6 shadow-[0_40px_150px_rgba(0,0,0,0.4)] sm:p-10 lg:p-14"
    >
      <motion.div
        animate={{ x: ['-8%', '8%', '-8%'], y: ['3%', '-5%', '3%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(249,115,22,0.32),transparent_30%),radial-gradient(circle_at_78%_28%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_45%_85%,rgba(255,255,255,0.10),transparent_28%)]"
      />
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
            <Mail className="h-3.5 w-3.5" />
            Enterprise AI Briefing
          </div>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Stay Ahead of Enterprise AI
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Monthly research, implementation strategies, and industry insights
            delivered directly to your inbox.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/35 p-3 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              aria-label="Email address"
              type="email"
              placeholder="you@company.com"
              className="min-h-[54px] min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition-all placeholder:text-zinc-600 focus:border-orange-300/55 focus:shadow-[0_0_36px_rgba(249,115,22,0.14)]"
            />
            <MagneticButton to="/#contact" variant="primary" className="min-h-[54px]">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const BottomCTA = () => (
  <section className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:pb-28">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-8 text-center shadow-[0_40px_150px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-12 lg:p-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.20),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
      <div className="relative mx-auto max-w-4xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-300/25 bg-orange-500/10 text-orange-200">
          <BrainCircuit className="h-7 w-7" />
        </div>
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Need AI expertise beyond the articles?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
          Schedule a consultation with our engineers.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <MagneticButton to="/#contact" variant="primary">
            Book Discovery Call
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton to="/case-studies" variant="secondary">
            View Case Studies
            <FileText className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  </section>
);

const MagneticButton = ({
  to,
  variant,
  children,
  className = '',
}: {
  to: string;
  variant: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes =
    variant === 'primary'
      ? 'border-orange-300/30 bg-gradient-to-r from-orange-500 to-amber-400 text-black shadow-[0_18px_60px_rgba(249,115,22,0.28)] hover:shadow-[0_22px_80px_rgba(249,115,22,0.38)]'
      : 'border-white/[0.12] bg-white/[0.04] text-white hover:border-orange-300/35 hover:bg-orange-500/10';

  return (
    <MotionLink
      to={to}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${classes} ${className}`}
    >
      {children}
    </MotionLink>
  );
};

export default Insights;
