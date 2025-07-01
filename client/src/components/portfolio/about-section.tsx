import { useQuery } from "@tanstack/react-query";
import type { Portfolio, Highlight } from "@shared/schema";

export default function AboutSection() {
  const { data: portfolio, isLoading: portfolioLoading } = useQuery<Portfolio>({
    queryKey: ["/api/portfolio"],
  });

  const { data: highlights, isLoading: highlightsLoading } = useQuery<Highlight[]>({
    queryKey: ["/api/portfolio/highlights"],
  });

  if (portfolioLoading || highlightsLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-80 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!portfolio) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-red-600">About data not found</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-portfolio-secondary mb-4">About Me</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Engineering Manager | Leading High-Impact Teams to Build Scalable Full-Stack Solutions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              {portfolio.aboutDescription}
            </p>
            {portfolio.aboutDescription2 && (
              <p className="text-lg text-slate-600 leading-relaxed">
                {portfolio.aboutDescription2}
              </p>
            )}
            

          </div>
          
          <div className="bg-gradient-to-br from-portfolio-neutral to-blue-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-portfolio-secondary mb-6">Key Highlights</h3>
            <div className="space-y-4">
              {highlights && highlights.length > 0 ? (
                highlights.map((highlight) => (
                  <div key={highlight.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-portfolio-primary rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-slate-600">{highlight.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No highlights available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
