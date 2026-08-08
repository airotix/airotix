import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Github, Calendar, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  date: string;
  features: string[];
  metrics?: {
    value: string;
    label: string;
    icon: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'IndustriTrack',
    description: 'A full-stack web application that automates order processing for manufacturing factories.',
    longDescription: 'A comprehensive order processing system that allows users to upload order PDFs or Excel sheets, automatically extracts item details (articles, colors, sizes, quantities) using smart parsing algorithms, and updates inventory records in real time. Built with React, ASP.NET Core, and SQL Server, it streamlines manual data entry, improves accuracy, and enhances operational efficiency.',
    imageUrl: '/bg-images/industritrack-bg.png',
    technologies: ['React', 'ASP.NET Core', 'SQL Server', 'Smart Parsing', 'PDF Processing'],
    category: 'Manufacturing',
    status: 'Completed',
    date: 'December 2024',
    features: [
      'Automated PDF and Excel order processing',
      'Smart parsing algorithms for data extraction',
      'Real-time inventory updates',
      'Streamlined manual data entry elimination'
    ],
    metrics: [
      { value: '95%', label: 'Processing Accuracy', icon: 'Zap' },
      { value: '80%', label: 'Time Saved', icon: 'Calendar' },
      { value: '100+', label: 'Orders Processed Daily', icon: 'Users' }
  ],
  //   demoUrl: 'https://industri-track-frontend.vercel.app/'
  //
   },
  {
    id: '2',
    title: 'VisionTex',
    description: 'An AI-powered industrial inspection system that uses computer vision and deep learning (YOLOv8) to detect fabric defects in real time.',
    longDescription: 'An advanced industrial inspection system that uses computer vision and deep learning (YOLOv8) to detect fabric defects in real time through a live camera feed. The system continuously monitors fabric on a conveyor, highlights defects with bounding boxes, and displays detection results on an interactive software dashboard. Designed for textile factories, it eliminates manual inspection errors and improves quality control efficiency.',
    imageUrl: '/bg-images/visiontex-bg.png',
    technologies: ['YOLOv8', 'Computer Vision', 'Deep Learning', 'Real-time Processing', 'Dashboard UI'],
    category: 'Manufacturing',
    status: 'In Progress',
    date: 'January 2025',
    features: [
      'Real-time fabric defect detection',
      'YOLOv8-powered deep learning models',
      'Interactive software dashboard',
      'Automated alert and reporting systems'
    ],
    metrics: [
      { value: '98%', label: 'Defect Detection Rate', icon: 'Zap' },
      { value: 'Real-time', label: 'Processing Speed', icon: 'Calendar' },
      { value: '24/7', label: 'Continuous Monitoring', icon: 'Users' }
    ]
  },
  {
    id: '3',
    title: 'FlightShop380',
    description: 'A platform for a travel booking company to help their clients book flights easily.',
    longDescription: 'A comprehensive travel booking platform designed to simplify the flight booking process for travel companies and their clients. The platform provides an intuitive interface for searching, comparing, and booking flights, with integrated payment processing and booking management features.',
    imageUrl: '/bg-images/tripscart-bg.avif',
    technologies: ['React', 'Node.js', 'Travel APIs', 'Payment Integration', 'Booking Management'],
    category: 'Travel',
    status: 'Completed',
    date: 'November 2024',
    features: [
      'Easy flight search and comparison',
      'Integrated payment processing',
      'Booking management system',
      'User-friendly interface'
    ],
    metrics: [
      { value: '1000+', label: 'Bookings Processed', icon: 'Users' },
      { value: '99.9%', label: 'Uptime', icon: 'Zap' },
      { value: '4.8/5', label: 'User Rating', icon: 'Calendar' }
    ],
    demoUrl: 'https://trips-cart-final.vercel.app/'
  },
  {
    id: '4',
    title: 'MarketKit',
    description: 'A modern all-in-one digital marketing platform where marketers can research, create, execute, report, and automate campaigns in one place.',
    longDescription: 'A comprehensive digital marketing platform that replaces tools like SpyFu, HubSpot, and Mailchimp. It features AI-powered content creation, automated scheduling, analytics dashboards, and workflow automations, all integrated into a single intuitive interface designed for speed, collaboration, and efficiency.',
    imageUrl: '/bg-images/marketkit-bg.avif',
    technologies: ['AI Content Creation', 'Marketing Automation', 'Analytics', 'React', 'Dashboard UI'],
    category: 'Marketing',
    status: 'In Progress',
    date: 'February 2025',
    features: [
      'AI-powered content creation',
      'Automated campaign scheduling',
      'Comprehensive analytics dashboards',
      'Workflow automation tools'
    ],
    metrics: [
      { value: '5-in-1', label: 'Tools Replaced', icon: 'Zap' },
      { value: '60%', label: 'Time Saved', icon: 'Calendar' },
      { value: '50+', label: 'Active Campaigns', icon: 'Users' }
    ]
  },
  {
    id: '5',
    title: 'AI Video Sorter',
    description: 'An AI-powered media quality management desktop app designed for video editors and content creators.',
    longDescription: 'An intelligent desktop application that automatically analyzes and sorts images and videos based on technical and visual quality factors such as sharpness, exposure, brightness, noise, resolution, and stability. For videos, the software generates clickable timestamps that highlight moments with specific quality issues, allowing editors to quickly review and fix them. The goal is to eliminate manual sorting, save editing time, and help professionals focus only on usable, high-quality footage.',
    imageUrl: '/bg-images/vidsort-bg.avif',
    technologies: ['AI/ML', 'Computer Vision', 'Desktop App', 'Video Analysis', 'Quality Assessment'],
    category: 'Media',
    status: 'Planning',
    date: 'March 2025',
    features: [
      'Automated quality analysis and sorting',
      'Technical quality factor assessment',
      'Clickable timestamp generation',
      'Quality issue highlighting'
    ]
  }
];

const Projects = () => {
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <PageLayout>
      <SEO 
        title="AIROTIX - Our Projects & Solutions"
        description="Explore AIROTIX Technologies' innovative projects in computer vision, smart textiles, and AI-powered industrial solutions."
        imageUrl={featuredProject?.imageUrl || "/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png"}
        keywords={['computer vision projects', 'smart textiles', 'AI solutions', 'industrial automation', 'safety technology', 'quality control']}
        type="website"
      />
      
      <div className="w-full pt-8 pb-12 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
            <p className="text-xl text-gray-300 mb-6">
              Innovative solutions in computer vision, smart textiles, and AI-powered automation
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Project */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Project</h2>
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={featuredProject.imageUrl} 
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    featuredProject.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    featuredProject.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {featuredProject.status}
                  </span>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">{featuredProject.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{featuredProject.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredProject.title}</h3>
                <p className="text-gray-600 mb-6">{featuredProject.longDescription}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {featuredProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {featuredProject.metrics && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {featuredProject.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-black">{metric.value}</div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {featuredProject.demoUrl && (
                    <Button variant="default" size="sm" asChild>
                      <a href={featuredProject.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Demo
                      </a>
                    </Button>
                  )}
                  {featuredProject.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Other Projects Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">{project.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{project.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.metrics.map((metric, index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg font-bold text-black">{metric.value}</div>
                          <div className="text-xs text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <Button variant="default" size="sm" className="flex-1" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 h-3 w-3" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let's discuss how AIROTIX can help bring your vision to life with cutting-edge computer vision and smart textile solutions.
          </p>
          <Button size="lg" className="bg-black hover:bg-gray-800">
            <Link to="/services" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;