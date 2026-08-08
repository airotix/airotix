import { useEffect, useRef, useState, memo, useMemo } from 'react';
import { Activity, Shield, HardHat, Zap, ArrowRight, Box, Truck, Code, CheckCircle, Rocket, Factory, Microchip, Handshake, RefreshCcw, MessageSquare } from "lucide-react";
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [currentSprint, setCurrentSprint] = useState(1);
  const totalSprints = 3;
  const isMobile = useIsMobile();

  // Memoize features array to prevent recreation on every render
  const features = useMemo(() => [
    {
      icon: <Activity className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Object Detection & Recognition",
      description: "Advanced algorithms that identify, classify, and locate objects in images and video streams with high precision and real-time processing capabilities for various applications.",
      image: "/bg-images/objdet-bg.avif"
    },
    {
      icon: <Shield className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Image Segmentation & Analysis",
      description: "Pixel-level image analysis that separates objects from backgrounds, enabling detailed understanding of visual scenes and precise measurements for complex applications.",
      image: "/bg-images/imgseg-bg.avif"
    },
    {
      icon: <Factory className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Optical Character Recognition (OCR)",
      description: "Text extraction and recognition from images, documents, and real-world scenes with support for multiple languages, fonts, and handwritten text processing.",
      image: "/bg-images/ocr-bg.avif"
    },
    {
      icon: <Zap className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Motion Detection & Tracking",
      description: "Real-time tracking of moving objects across video frames, enabling surveillance, traffic monitoring, behavioral analysis, and automated response systems.",
      image: "/bg-images/mottarck-bg.avif"
    }
  ], []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Optimized IntersectionObserver - only observe once
  useEffect(() => {
    if (!featuresRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
            (entry.target as HTMLElement).style.opacity = '1';
            observer.unobserve(entry.target);
          }
        });
      }, 
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    const elements = featuresRef.current.querySelectorAll('.feature-item');
    elements.forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const animateProgress = () => {
      setProgressValue(0);
      interval = setInterval(() => {
        setProgressValue(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setCurrentSprint(prev => prev < totalSprints ? prev + 1 : 1);
              animateProgress();
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };
    animateProgress();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const visionCaseStudies = [{
    image: "/bg-images/objdet-bg.avif",
    title: "Object Detection & Recognition",
    description: "Advanced algorithms that identify, classify, and locate objects in images and video streams with high precision and real-time processing capabilities."
  }, {
    image: "/bg-images/imgseg-bg.avif",
    title: "Image Segmentation & Analysis",
    description: "Pixel-level image analysis that separates objects from backgrounds, enabling detailed understanding of visual scenes and precise measurements."
  }, {
    image: "/bg-images/ocr-bg.avif",
    title: "Optical Character Recognition (OCR)",
    description: "Text extraction and recognition from images, documents, and real-world scenes with support for multiple languages and fonts."
  }, {
    image: "/bg-images/mottarck-bg.avif",
    title: "Motion Detection & Tracking",
    description: "Real-time tracking of moving objects across video frames, enabling surveillance, traffic monitoring, and behavioral analysis applications."
  }, {
    image: "/lovable-uploads/927dae7e-6aaf-4b76-add2-1287a1dd9dc0.png",
    title: "Facial Recognition & Biometrics",
    description: "Advanced facial detection, recognition, and biometric analysis for security, access control, and identity verification systems."
  }, {
    image: "/lovable-uploads/48ecf6e2-5a98-4a9d-af6f-ae2265cd4098.png",
    title: "Quality Control & Inspection",
    description: "Automated visual inspection systems that detect defects, measure dimensions, and ensure quality standards in manufacturing processes."
  }];
  const stepFlowItems = [{
    icon: <Microchip className="h-10 w-10 text-gray-700" />,
    title: "AIROTIX Proprietary AI Models",
    description: "Custom computer vision algorithms trained for specific industries"
  }, {
    icon: <Factory className="h-10 w-10 text-gray-700" />,
    title: "Advanced Vision Frameworks",
    description: "YOLOv8, TensorFlow, PyTorch, and OpenCV integration for optimal performance"
  }, {
    icon: <Handshake className="h-10 w-10 text-gray-700" />,
    title: "Enterprise Integration",
    description: "Seamless deployment into existing industrial workflows and systems"
  }];
  const sprintPhases = [{
    name: "Planning",
    icon: <CheckCircle className="h-4 w-4" />
  }, {
    name: "Development",
    icon: <Code className="h-4 w-4" />
  }, {
    name: "Testing",
    icon: <Box className="h-4 w-4" />
  }, {
    name: "Review",
    icon: <RefreshCcw className="h-4 w-4" />
  }];

  return <>
      <section id="features" className="relative bg-black overflow-hidden py-10 md:py-[50px] w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8" ref={featuresRef}> 
          <div className="text-center mb-10 max-w-3xl mx-auto feature-item">
            <div className="inline-block mb-2 px-3 py-1 bg-[#cf4500]/10 text-[#cf4500] rounded-full text-sm font-medium">
              Computer Vision Applications
            </div>
            <p className="text-gray-300 mt-4">
              AIROTIX specializes in computer vision solutions that help industries automate tasks that normally require human eyes. We teach machines to see, understand, and make decisions from visual data like images, videos, and live camera feeds.
            </p>
          </div>
          
          {/* Features grid - optimized without scroll hijacking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-item rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 relative shadow-lg h-[280px]"
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredFeature(index)} 
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover grayscale transition-all duration-300"
                    loading="lazy"
                  />
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    hoveredFeature === index ? "bg-black/50" : "bg-black/70"
                  )}></div>
                </div>
                
                <div className="relative z-10 flex flex-col justify-between p-6 h-full">
                  <div>
                    <div className={cn(
                      "inline-block p-3 bg-gray-800/40 backdrop-blur-sm rounded-lg transition-all duration-300 transform mb-4",
                      hoveredFeature === index && "hover:scale-110"
                    )}>
                      <div className={`transform transition-transform duration-300 ${hoveredFeature === index ? 'rotate-12' : ''}`}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-xl mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <div className={`h-0.5 bg-white/70 mt-3 transition-all duration-500 ${hoveredFeature === index ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 mb-8 feature-item">
            <div className="text-center mb-8">
              <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Computer Vision Applications
              </div>
              <h3 className="text-2xl font-bold">Major AI Computer Vision Domains</h3>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Explore the core domains of computer vision AI that power modern intelligent systems, 
                from object recognition to advanced image analysis and automated inspection.
                <span className="block text-sm mt-1 text-blue-500">Scroll horizontally to see more domains →</span>
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden bg-white p-4 feature-item">
              <Carousel className="w-full max-w-7xl mx-auto">
                <CarouselContent className="flex">
                  {visionCaseStudies.map((study, index) => <CarouselItem key={index} className="md:basis-1/3 flex-shrink-0">
                      <Card className="border border-gray-100 shadow-md">
                        <CardContent className="p-0">
                          <div className="w-full h-full">
                            <img 
                              src={study.image} 
                              alt={study.title} 
                              className="w-full h-auto object-contain"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-lg">{study.title}</h4>
                            <p className="text-sm text-gray-600 mt-2">{study.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>)}
                </CarouselContent>
                <div className="flex justify-center mt-6 gap-2">
                  <CarouselPrevious className="relative static left-auto translate-y-0 hover:bg-gray-100" />
                  <CarouselNext className="relative static right-auto translate-y-0 hover:bg-gray-100" />
                </div>
              </Carousel>
              <div className="text-center mt-6 text-sm text-gray-600">
                <p className="font-medium">These domains represent the fundamental areas of computer vision AI that enable intelligent visual understanding and automation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button onClick={scrollToContact} className="inline-flex items-center px-4 sm:px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all group w-full sm:w-auto">
            Need Custom Solutions?
            <MessageSquare className="ml-2 w-4 h-4 group-hover:animate-pulse" />
          </Button>
          
          <Button onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center px-4 sm:px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all group w-full sm:w-auto">
            Learn More About Our Technology
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
      
      <section id="technology" className="bg-black py-10 md:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Our Approach
            </div>
            <h2 className="text-3xl font-bold mb-4">How our computer vision works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              AIROTIX combines cutting-edge AI frameworks with custom algorithms and enterprise integration, 
              delivering real-time computer vision solutions that transform how industries operate.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-10 transition-all duration-300 hover:shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {stepFlowItems.map((item, index) => <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-gray-50 rounded-full p-4 mb-4">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 shadow-lg">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-sm">{item.description}</p>
                      {index === 0 && <p className="text-xs text-gray-500">Our proprietary technology provides the core foundation of every solution we build.</p>}
                      {index === 1 && <p className="text-xs text-gray-500">We carefully select the best off-the-shelf components to complement our proprietary technology.</p>}
                      {index === 2 && <p className="text-xs text-gray-500">Our network of production partners ensures quality manufacturing at scale.</p>}
                    </div>
                  </HoverCardContent>
                </HoverCard>)}
            </div>

            <div className="relative h-16 mb-10">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-400 rounded-full p-1">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>
              
              <div className="md:hidden flex justify-center items-center h-full">
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
                <div className="bg-gray-400 rounded-full p-1 mx-2">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-10 shadow-md">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold">Adaptation Project</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Iterative Development</span>
                    <RefreshCcw className="h-5 w-5 text-gray-600 animate-rotate-slow" />
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">Working iteratively with customers to tailor solutions to their needs</p>
                
                <div className="relative mb-2">
                  <Progress value={progressValue} className="h-3 bg-gray-200" />
                </div>
                
                <div className={cn("grid gap-1 mt-4", isMobile ? "grid-cols-2 gap-y-2" : "grid-cols-4")}>
                  {sprintPhases.map((phase, index) => <div key={index} className={cn("text-center p-2 rounded transition-all", progressValue >= index / sprintPhases.length * 100 && progressValue < (index + 1) / sprintPhases.length * 100 ? "bg-blue-50 border border-blue-100" : "bg-gray-50")}>
                      <div className="flex flex-col items-center">
                        <div className={cn("rounded-full p-1 mb-1", progressValue >= index / sprintPhases.length * 100 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500")}>
                          {phase.icon}
                        </div>
                        <span className="text-xs font-medium">{phase.name}</span>
                      </div>
                    </div>)}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-2">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-2 shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">Customer feedback integrated at every stage</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-2 sm:mt-0">
                    <span className="mr-2">Continuous improvement</span>
                    <div className="flex space-x-1">
                      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-200"></span>
                      <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-pulse animation-delay-400"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-16 mb-10">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-400 rounded-full p-1">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>
              
              <div className="md:hidden flex justify-center items-center h-full">
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
                <div className="bg-gray-400 rounded-full p-1 mx-2">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg p-8 max-w-xl mx-auto text-center shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-black/10 rounded-full animate-pulse-slow"></div>
                <div className="relative bg-white rounded-full p-4 border border-gray-200 shadow-md">
                  <Rocket className="h-10 w-10 text-gray-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Hitting the Market</h3>
              <p className="text-gray-700">Ready to scale, produce, and launch</p>
              <div className="flex justify-center mt-4 space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-300 animate-pulse"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-gray-500 animate-pulse animation-delay-200"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-gray-700 animate-pulse animation-delay-400"></span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/tech-details" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center px-4 sm:px-6 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all group py-3 w-full sm:w-auto justify-center">
                Learn More About Our Technology
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Button onClick={scrollToContact} className="inline-flex items-center px-4 sm:px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all group w-full sm:w-auto justify-center">
                Contact Our Experts
                <MessageSquare className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>;
};
export default Features;
