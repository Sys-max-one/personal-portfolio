import { useQuery } from "@tanstack/react-query";
import type { Experience } from "@shared/schema";

export default function ExperienceSection() {
  const { data: experiences, isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/portfolio/experiences"],
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-portfolio-secondary mb-4">Work Experience</h2>
            <p className="text-slate-500">No experience data available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-portfolio-secondary mb-4">Work Experience</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Professional journey and key achievements
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-primary to-portfolio-accent"></div>
          
          {experiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            const isAccent = index % 2 === 1;
            
            return (
              <div key={experience.id} className="relative mb-12 md:mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  {/* Timeline dot */}
                  <div className={`absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 ${
                    isAccent ? 'bg-portfolio-accent' : 'bg-portfolio-primary'
                  } rounded-full border-4 border-white shadow-lg z-10`}></div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    isEven 
                      ? 'md:pr-8 md:text-right' 
                      : 'md:pl-8 md:ml-auto'
                  }`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-portfolio-secondary">
                          {experience.title}
                        </h3>
                        <p className="text-portfolio-primary font-medium">
                          {experience.company}
                        </p>
                        <p className="text-sm text-slate-500">
                          {experience.period}
                        </p>
                      </div>
                      <p className="text-slate-600 mb-4">
                        {experience.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies?.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-blue-100 text-portfolio-primary text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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
