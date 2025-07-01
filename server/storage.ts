import { 
  users, 
  portfolios,
  skills,
  experiences,
  education,
  projects,
  highlights,
  contactMessages,
  type User, 
  type InsertUser,
  type Portfolio,
  type Skill,
  type Experience,
  type Education,
  type Project,
  type Highlight,
  type ContactMessage,
  type InsertPortfolio,
  type InsertSkill,
  type InsertExperience,
  type InsertEducation,
  type InsertProject,
  type InsertHighlight,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPortfolio(): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  
  getSkills(portfolioId: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  getExperiences(portfolioId: number): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  getEducation(portfolioId: number): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  
  getProjects(portfolioId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getHighlights(portfolioId: number): Promise<Highlight[]>;
  createHighlight(highlight: InsertHighlight): Promise<Highlight>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolios: Map<number, Portfolio>;
  private skills: Map<number, Skill>;
  private experiences: Map<number, Experience>;
  private education: Map<number, Education>;
  private projects: Map<number, Project>;
  private highlights: Map<number, Highlight>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentPortfolioId: number;
  private currentSkillId: number;
  private currentExperienceId: number;
  private currentEducationId: number;
  private currentProjectId: number;
  private currentHighlightId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.portfolios = new Map();
    this.skills = new Map();
    this.experiences = new Map();
    this.education = new Map();
    this.projects = new Map();
    this.highlights = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentPortfolioId = 1;
    this.currentSkillId = 1;
    this.currentExperienceId = 1;
    this.currentEducationId = 1;
    this.currentProjectId = 1;
    this.currentHighlightId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with sample portfolio data
    this.initializePortfolioData();
  }

  private initializePortfolioData() {
    // Create main portfolio
    const portfolio: Portfolio = {
      id: 1,
      name: "John Doe",
      title: "Senior Software Engineer",
      tagline: "Passionate about creating innovative digital solutions that drive business growth and enhance user experiences.",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      aboutDescription: "With over 5 years of experience in software development, I specialize in creating scalable web applications and leading cross-functional teams. My expertise spans full-stack development, cloud architecture, and agile methodologies.",
      aboutDescription2: "I'm passionate about continuous learning and staying current with emerging technologies. When I'm not coding, you can find me contributing to open source projects or mentoring junior developers.",
      yearsExperience: 5,
      projectsCompleted: 50,
      socialLinks: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe",
        email: "mailto:john.doe@example.com"
      }
    };
    this.portfolios.set(1, portfolio);

    // Add highlights
    const sampleHighlights = [
      "Led development of enterprise SaaS platform serving 10,000+ users",
      "Reduced application load time by 40% through optimization",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored 8 junior developers and conducted 50+ code reviews"
    ];
    
    sampleHighlights.forEach((text, index) => {
      this.highlights.set(index + 1, {
        id: index + 1,
        portfolioId: 1,
        text
      });
    });

    // Add technical skills
    const technicalSkills = [
      { name: "JavaScript / TypeScript", level: "Expert", proficiency: 90 },
      { name: "React / Next.js", level: "Expert", proficiency: 85 },
      { name: "Node.js / Express", level: "Advanced", proficiency: 80 },
      { name: "AWS / Cloud Architecture", level: "Advanced", proficiency: 75 }
    ];

    technicalSkills.forEach((skill, index) => {
      this.skills.set(index + 1, {
        id: index + 1,
        portfolioId: 1,
        category: "technical",
        ...skill
      });
    });

    // Add soft skills
    const softSkills = [
      { name: "Strategic Thinking", level: "Expert", proficiency: 90 },
      { name: "Communication", level: "Expert", proficiency: 95 },
      { name: "Team Leadership", level: "Advanced", proficiency: 85 },
      { name: "Problem Solving", level: "Expert", proficiency: 92 }
    ];

    softSkills.forEach((skill, index) => {
      this.skills.set(index + 5, {
        id: index + 5,
        portfolioId: 1,
        category: "soft",
        ...skill
      });
    });

    // Add experiences
    const sampleExperiences = [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Solutions",
        period: "2021 - Present",
        description: "Lead development of microservices architecture serving 100k+ daily active users. Implemented automated testing and deployment pipelines.",
        technologies: ["React", "Node.js", "AWS"],
        startDate: "2021-01",
        endDate: null
      },
      {
        title: "Full Stack Developer",
        company: "Digital Innovations Inc",
        period: "2019 - 2021",
        description: "Developed responsive web applications and RESTful APIs. Collaborated with design teams to implement pixel-perfect UIs.",
        technologies: ["Vue.js", "Python", "PostgreSQL"],
        startDate: "2019-03",
        endDate: "2021-01"
      },
      {
        title: "Junior Web Developer",
        company: "StartupCo",
        period: "2018 - 2019",
        description: "Built e-commerce platforms and content management systems. Gained experience in agile development methodologies.",
        technologies: ["HTML/CSS", "JavaScript", "PHP"],
        startDate: "2018-06",
        endDate: "2019-03"
      }
    ];

    sampleExperiences.forEach((exp, index) => {
      this.experiences.set(index + 1, {
        id: index + 1,
        portfolioId: 1,
        ...exp
      });
    });

    // Add education
    const sampleEducation = [
      {
        degree: "Bachelor of Computer Science",
        institution: "University of Technology",
        period: "2014 - 2018",
        details: "Magna Cum Laude • GPA: 3.8/4.0\nRelevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems",
        type: "education"
      },
      {
        degree: "AWS Solutions Architect",
        institution: "Amazon Web Services",
        period: "2023",
        details: null,
        type: "certification"
      },
      {
        degree: "Certified Kubernetes Administrator",
        institution: "Linux Foundation",
        period: "2022",
        details: null,
        type: "certification"
      },
      {
        degree: "Google Cloud Professional",
        institution: "Google Cloud",
        period: "2021",
        details: null,
        type: "certification"
      }
    ];

    sampleEducation.forEach((edu, index) => {
      this.education.set(index + 1, {
        id: index + 1,
        portfolioId: 1,
        ...edu
      });
    });

    // Add projects
    const sampleProjects = [
      {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
        technologies: ["React", "Node.js", "MongoDB"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/johndoe/ecommerce",
        imageUrl: null
      },
      {
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
        technologies: ["Vue.js", "Firebase", "PWA"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/johndoe/taskapp",
        imageUrl: null
      },
      {
        title: "Analytics Dashboard",
        description: "Real-time analytics dashboard with interactive charts, data visualization, and automated reporting.",
        technologies: ["D3.js", "Python", "PostgreSQL"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/johndoe/analytics",
        imageUrl: null
      }
    ];

    sampleProjects.forEach((project, index) => {
      this.projects.set(index + 1, {
        id: index + 1,
        portfolioId: 1,
        ...project
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPortfolio(): Promise<Portfolio | undefined> {
    return this.portfolios.get(1); // Return the main portfolio
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = this.currentPortfolioId++;
    const portfolio: Portfolio = { ...insertPortfolio, id };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async updatePortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const portfolio: Portfolio = { ...insertPortfolio, id: 1 };
    this.portfolios.set(1, portfolio);
    return portfolio;
  }

  async getSkills(portfolioId: number): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      skill => skill.portfolioId === portfolioId
    );
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }

  async getExperiences(portfolioId: number): Promise<Experience[]> {
    return Array.from(this.experiences.values())
      .filter(exp => exp.portfolioId === portfolioId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = this.currentExperienceId++;
    const experience: Experience = { ...insertExperience, id };
    this.experiences.set(id, experience);
    return experience;
  }

  async getEducation(portfolioId: number): Promise<Education[]> {
    return Array.from(this.education.values()).filter(
      edu => edu.portfolioId === portfolioId
    );
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const id = this.currentEducationId++;
    const education: Education = { ...insertEducation, id };
    this.education.set(id, education);
    return education;
  }

  async getProjects(portfolioId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.portfolioId === portfolioId
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getHighlights(portfolioId: number): Promise<Highlight[]> {
    return Array.from(this.highlights.values()).filter(
      highlight => highlight.portfolioId === portfolioId
    );
  }

  async createHighlight(insertHighlight: InsertHighlight): Promise<Highlight> {
    const id = this.currentHighlightId++;
    const highlight: Highlight = { ...insertHighlight, id };
    this.highlights.set(id, highlight);
    return highlight;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date().toISOString()
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
