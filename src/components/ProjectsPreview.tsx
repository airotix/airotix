import { Link } from 'react-router-dom';
import { ArrowRight, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  technologies: string[];
}

const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'IndustriTrack',
    description: 'A full-stack web application that automates order processing for manufacturing factories with smart parsing algorithms.',
    imageUrl: '/bg-images/industritrack-bg.png',
    category: 'Manufacturing',
    status: 'Completed',
    technologies: ['React', 'ASP.NET Core', 'SQL Server']
  },
  {
    id: '2',
    title: 'VisionTex',
    description: 'AI-powered industrial inspection system using YOLOv8 for real-time fabric defect detection.',
    imageUrl: '/bg-images/visiontex-bg.png',
    category: 'Manufacturing',
    status: 'In Progress',
    technologies: ['YOLOv8', 'Computer Vision', 'Deep Learning']
  },
  {
    id: '3',
    title: 'MarketKit',
    description: 'All-in-one digital marketing platform with AI-powered content creation and campaign automation.',
    imageUrl: '/bg-images/marketkit-bg.avif',
    category: 'Marketing',
    status: 'In Progress',
    technologies: ['AI Content Creation', 'Marketing Automation', 'Analytics']
  }
];

const ProjectsPreview = () => {
  return (
    <section id="projects" className="py-12 md:py-24 px-4 md:px-12 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Folder size={20} className="text-black" />
              <span className="text-black font-medium">Our Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Featured Projects</h2>
            <p className="text-gray-800 max-w-xl">
              Explore our innovative solutions in web applications, AI-powered systems, and digital platforms.
            </p>
          </div>
          <Link to="/projects" className="mt-4 md:mt-0">
            <Button variant="outline" className="group border-black text-black hover:bg-black hover:text-white">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-48">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
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
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/70 text-white rounded text-xs">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 group-hover:text-gray-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Link to="/projects" className="text-black hover:text-gray-600 text-sm font-medium flex items-center group">
                    Learn More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-3">Have a Project in Mind?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with cutting-edge technology solutions.
          </p>
          <Button className="bg-black hover:bg-gray-800">
            <Link to="/services" className="flex items-center">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;