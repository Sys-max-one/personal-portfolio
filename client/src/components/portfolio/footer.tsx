import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Portfolio } from "@shared/schema";

export default function Footer() {
  const { data: portfolio } = useQuery<Portfolio>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-4">
            {portfolio?.name || "Your Name"}
          </div>
          <p className="mb-6">
            {portfolio?.tagline || "Building the future, one line of code at a time."}
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            {portfolio?.socialLinks?.linkedin && (
              <a
                href={portfolio.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-portfolio-primary transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
            )}
            {portfolio?.socialLinks?.github && (
              <a
                href={portfolio.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-portfolio-primary transition-colors duration-200"
              >
                <Github size={20} />
              </a>
            )}
            {portfolio?.socialLinks?.twitter && (
              <a
                href={portfolio.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-portfolio-primary transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
            )}
            {portfolio?.socialLinks?.email && (
              <a
                href={portfolio.socialLinks.email}
                className="hover:text-portfolio-primary transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
          
          <div className="border-t border-slate-700 pt-8">
            <p>&copy; 2024 {portfolio?.name || "Your Name"}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
