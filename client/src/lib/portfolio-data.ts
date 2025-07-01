// This file contains utility functions for portfolio data management
// if needed for client-side data processing

export const formatPeriod = (startDate: string, endDate?: string | null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };
  
  return `${formatDate(start)} - ${end ? formatDate(end) : 'Present'}`;
};

export const calculateYearsOfExperience = (experiences: any[]) => {
  if (!experiences || experiences.length === 0) return 0;
  
  const sortedExperiences = experiences.sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  const firstJob = new Date(sortedExperiences[0].startDate);
  const now = new Date();
  
  return Math.floor((now.getTime() - firstJob.getTime()) / (1000 * 60 * 60 * 24 * 365));
};

export const groupSkillsByCategory = (skills: any[]) => {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);
};
