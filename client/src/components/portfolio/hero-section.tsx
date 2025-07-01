import { ArrowRight, Download, User, Code, Linkedin, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Portfolio } from "@shared/schema";

export default function HeroSection() {
  const { data: portfolio, isLoading } = useQuery<Portfolio>({
    queryKey: ["/api/portfolio"],
  });

  const handleContactClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    // This would typically link to a PDF file
    window.open("/resume.pdf", "_blank");
  };

  if (isLoading) {
    return (
      <section id="home" className="pt-20 pb-16 gradient-hero min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!portfolio) {
    return (
      <section id="home" className="pt-20 pb-16 gradient-hero min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600">Portfolio data not found</h1>
            <p className="text-slate-600 mt-4">Please check your configuration.</p>
          </div>
        </div>
      </section>
    );
  }

  const firstName = portfolio.name.split(" ")[0];

  return (
    <section id="home" className="pt-20 pb-16 gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-portfolio-secondary leading-tight">
                Hi, I'm <span className="text-portfolio-primary">{firstName}</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-slate-600 font-medium">
                {portfolio.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                {portfolio.tagline}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleContactClick}
                className="bg-portfolio-primary hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                Get In Touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadResume}
                className="border-2 border-portfolio-primary text-portfolio-primary hover:bg-portfolio-primary hover:text-white font-medium transition-all duration-200"
                size="lg"
              >
                <Download className="mr-2 w-4 h-4" />
                Download Resume
              </Button>
            </div>
            
            <div className="flex space-x-6 pt-4">
              {portfolio.socialLinks?.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-portfolio-primary transition-colors duration-200"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {portfolio.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-portfolio-primary transition-colors duration-200"
                >
                  <Github size={24} />
                </a>
              )}
              {portfolio.socialLinks?.twitter && (
                <a
                  href={portfolio.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-portfolio-primary transition-colors duration-200"
                >
                  <Twitter size={24} />
                </a>
              )}
              {portfolio.socialLinks?.email && (
                <a
                  href={portfolio.socialLinks.email}
                  className="text-slate-600 hover:text-portfolio-primary transition-colors duration-200"
                >
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-portfolio-primary to-portfolio-accent shadow-2xl flex items-center justify-center">
                <User className="text-white text-8xl opacity-50" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-portfolio-accent rounded-full flex items-center justify-center shadow-lg">
                <Code className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
