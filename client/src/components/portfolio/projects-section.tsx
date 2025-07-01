import { ExternalLink, Github, Laptop, Smartphone, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

const projectIcons = [Laptop, Smartphone, TrendingUp];

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/portfolio/projects"],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-portfolio-secondary mb-4">Featured Projects</h2>
            <p className="text-slate-500">No projects available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-portfolio-secondary mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Showcase of recent work and personal projects
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = projectIcons[index % projectIcons.length];
            const gradientClasses = [
              "from-portfolio-primary to-portfolio-accent",
              "from-portfolio-accent to-portfolio-primary",
              "from-purple-500 to-pink-500"
            ];
            const gradientClass = gradientClasses[index % gradientClasses.length];
            
            return (
              <div key={project.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${
                index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}>
                {/* Project image placeholder */}
                <div className={`h-48 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                  <IconComponent className="text-white text-4xl opacity-50" size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-portfolio-secondary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-blue-100 text-portfolio-primary text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-portfolio-primary hover:text-blue-700 font-medium flex items-center"
                      >
                        <ExternalLink className="mr-1" size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-800 font-medium flex items-center"
                      >
                        <Github className="mr-1" size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
