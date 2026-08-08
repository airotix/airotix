import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import HeroStats from '@/components/HeroStats';
import ServicesAiSection from '@/components/ServicesAiSection';
import Process from '@/components/Process';
import CtaBanner from '@/components/CtaBanner';
import HomeContact from '@/components/HomeContact';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <PageLayout>
      <SEO
        title="AIROTIX | AI Solutions & Automation"
        description="AIROTIX builds high-performance AI and computer vision systems that see, understand, and act in real time for enterprise automation."
        keywords={['computer vision', 'AI automation', 'enterprise AI', 'defect detection', 'quality control', 'industrial automation', 'machine learning']}
      />
      <Hero />
      <HeroStats />
      <ServicesAiSection />
      <Process />
      <CtaBanner />
      <HomeContact />
    </PageLayout>
  );
};

export default Index;
