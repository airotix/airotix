import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type SubpageLayoutProps = {
  children: React.ReactNode;
};

const SubpageLayout = ({ children }: SubpageLayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (location.hash === '#contact') {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-black w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        {/* Back link — aligned with the centered page content */}
        <div className="w-full px-5 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Link
              to="/"
              className="group inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-[#A8A8A8] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/40 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default SubpageLayout;