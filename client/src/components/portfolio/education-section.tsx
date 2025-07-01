import { GraduationCap, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Education } from "@shared/schema";

export default function EducationSection() {
  const { data: education, isLoading } = useQuery<Education[]>({
    queryKey: ["/api/portfolio/education"],
  });

  if (isLoading) {
    return (
      <section id="education" className="py-20 bg-portfolio-neutral">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-80 bg-white rounded-2xl"></div>
              <div className="h-80 bg-white rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const educationItems = education?.filter(item => item.type === "education") || [];
  const certificationItems = education?.filter(item => item.type === "certification") || [];

  return (
    <section id="education" className="py-20 bg-portfolio-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-portfolio-secondary mb-4">Education & Certifications</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Academic background and professional development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-portfolio-secondary mb-6 flex items-center">
              <GraduationCap className="text-portfolio-primary mr-3" size={24} />
              Education
            </h3>
            {educationItems.length > 0 ? (
              educationItems.map((edu) => (
                <div key={edu.id} className="mb-6 p-4 border-l-4 border-portfolio-primary bg-blue-50 rounded-r-lg">
                  <h4 className="text-lg font-semibold text-portfolio-secondary">{edu.degree}</h4>
                  <p className="text-portfolio-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-slate-500 mb-2">{edu.period}</p>
                  {edu.details && (
                    <div className="text-slate-600">
                      {edu.details.split('\n').map((line, index) => (
                        <p key={index} className={index === 0 ? "font-medium" : "text-sm mt-2"}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No education data available</p>
            )}
          </div>
          
          {/* Certifications */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-portfolio-secondary mb-6 flex items-center">
              <Award className="text-portfolio-primary mr-3" size={24} />
              Certifications
            </h3>
            <div className="space-y-4">
              {certificationItems.length > 0 ? (
                certificationItems.map((cert, index) => {
                  const isAccent = index % 2 === 1;
                  
                  return (
                    <div key={cert.id} className="flex items-start space-x-4 p-4 bg-portfolio-neutral rounded-lg">
                      <div className={`w-10 h-10 ${isAccent ? 'bg-portfolio-accent' : 'bg-portfolio-primary'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Award className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-700">{cert.degree}</h4>
                        <p className="text-sm text-slate-600">{cert.institution} • {cert.period}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500 italic">No certifications available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
