
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center bg-black">
        <div className="text-center px-4">
          <h1 className="text-8xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-[#A8A8A8] mb-8">Oops! Page not found</p>
          <Link
            to="/"
            className="group inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_44px_rgba(249,115,22,0.5)]"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Return to Home
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
