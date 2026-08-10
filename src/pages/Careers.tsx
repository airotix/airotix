import PageLayout from '@/components/PageLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout>
      <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="text-4xl font-bold mb-6 text-white"
            >
              Join Our Team
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.2 }} 
              className="text-xl text-[#A8A8A8] mb-4"
            >
              We're looking for passionate innovators to help us revolutionize computer vision and AI automation.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-[#A8A8A8] mb-12"
            >
              We welcome both full-time professionals and interns who are eager to contribute to groundbreaking technology.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Why Join AIROTIX?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Innovation",
                    description: "Work on cutting-edge computer vision technology that's transforming manufacturing and automation."
                  },
                  {
                    title: "Impact",
                    description: "Create AI solutions that improve quality control, reduce waste, and enhance industrial efficiency."
                  },
                  {
                    title: "Growth",
                    description: "Develop your skills in computer vision and AI in a rapidly expanding field with diverse applications."
                  }
                ].map((benefit, i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-orange-300/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] h-full">
                    <h3 className="font-bold text-lg mb-2 text-white">{benefit.title}</h3>
                    <p className="text-[#A8A8A8]">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;