import { Code, Users, Lightbulb, Target, MessageCircle, UsersIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";

const softSkillIcons = {
  "Strategic Thinking": Target,
  "Communication": MessageCircle,
  "Team Leadership": UsersIcon,
  "Problem Solving": Lightbulb,
};

export default function SkillsSection() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/portfolio/skills"],
  });

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-portfolio-neutral">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-96 bg-white rounded-2xl p-8">
                <div className="h-6 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-96 bg-white rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const technicalSkills = skills?.filter(skill => skill.category === "technical") || [];
  const softSkills = skills?.filter(skill => skill.category === "soft") || [];

  // Mock technologies for display
  const technologies = ["Python", "PostgreSQL", "Docker", "GraphQL", "Redis", "Git"];

  return (
    <section id="skills" className="py-20 bg-portfolio-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-portfolio-secondary mb-4">Skills & Expertise</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Technical and soft skills developed through years of hands-on experience
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-portfolio-secondary mb-6 flex items-center">
              <Code className="text-portfolio-primary mr-3" size={24} />
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.length > 0 ? (
                technicalSkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-portfolio-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No technical skills available</p>
              )}
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold text-slate-700 mb-4">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-blue-100 text-portfolio-primary text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Soft Skills */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-portfolio-secondary mb-6 flex items-center">
              <Users className="text-portfolio-primary mr-3" size={24} />
              Soft Skills
            </h3>
            <div className="space-y-6">
              {softSkills.length > 0 ? (
                softSkills.map((skill) => {
                  const IconComponent = softSkillIcons[skill.name as keyof typeof softSkillIcons] || Target;
                  const isAccent = skill.name === "Communication" || skill.name === "Problem Solving";
                  
                  return (
                    <div key={skill.id} className="flex items-center space-x-4 p-4 bg-portfolio-neutral rounded-lg">
                      <div className={`w-12 h-12 ${isAccent ? 'bg-portfolio-accent' : 'bg-portfolio-primary'} rounded-full flex items-center justify-center`}>
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-700">{skill.name}</h4>
                        <p className="text-sm text-slate-600">
                          {skill.name === "Strategic Thinking" && "Planning and executing long-term technical roadmaps"}
                          {skill.name === "Communication" && "Clear technical communication with stakeholders"}
                          {skill.name === "Team Leadership" && "Leading and mentoring development teams"}
                          {skill.name === "Problem Solving" && "Creative solutions to complex technical challenges"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500 italic">No soft skills available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
