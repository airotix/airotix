import SubpageLayout from "@/components/SubpageLayout";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES_OFFERINGS } from "@/data/servicesOfferings";

const Services = () => {
  return (
    <SubpageLayout>
      <SEO
        title="AIROTIX | Services"
        description="Discover AIROTIX's core service offerings: AI/ML automation, computer vision solutions, and web & app development — from concept to deployment."
      />

      {/* Hero image */}
      <div className="w-full h-64 md:h-80 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/lovable-uploads/39671993-1bb4-4bb6-8819-3ca5c07c0042.png"
            alt="Core service offerings overview"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">What We Build</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Core Service Offerings</h1>
          <p className="text-xl text-gray-600">
            From concept to deployment, we build intelligent systems that deliver measurable business outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SERVICES_OFFERINGS.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors">
                  <Icon className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <a
                  href="/#contact"
                  className="inline-flex items-center text-sm font-medium text-black hover:underline"
                >
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SubpageLayout>
  );
};

export default Services;
