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
      name: "Sumit Kaushik",
      title: "Engineering Manager & AWS Architect",
      tagline: "Engineering Manager with 4+ years of experience leading software teams, backed by 10+ years of hands-on development expertise in AWS, AI/ML, and Blockchain technologies.",
      email: "sumitcomp31@gmail.com",
      phone: "312-961-1061",
      location: "San Francisco, CA",
      aboutDescription: "Engineering Manager with 4+ years of experience leading and managing software development teams, backed by 10+ years of hands-on software development expertise. I have successfully led end-to-end delivery of services using multi-model ML-based AI and enhanced model reliability through iterative training and deployment.",
      aboutDescription2: "I specialize in recruiting and leading geographically distributed teams, re-architecting systems for high-throughput (10k-19k logs/second), and designing innovative solutions including Blockchain, Smart Contracts, and serverless Generative AI services. My passion lies in mentoring team members and driving business impact through strategic technical leadership.",
      yearsExperience: 14,
      projectsCompleted: 75,
      socialLinks: {
        linkedin: "https://linkedin.com/in/sumitkaushik",
        github: "https://github.com/sumitkaushik",
        email: "mailto:sumitcomp31@gmail.com"
      }
    };
    this.portfolios.set(1, portfolio);

    // Add highlights
    const sampleHighlights = [
      "Managed multi-quarter re-architecture achieving 99.99% SLA and reducing infrastructure costs by 85%",
      "Led AI-powered critical service using Amazon SageMaker reducing costs by 15% and saving 0.5 hours/day",
      "Successfully led end-to-end delivery of services with high-throughput of 10k to 19k logs per second",
      "Designed and implemented Blockchain, Smart Contracts, and serverless Generative AI services",
      "Led cost-saving initiatives resulting in 18% infrastructure cost reduction and $62K monthly savings"
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
      { name: "AWS & Cloud Architecture", level: "Expert", proficiency: 95 },
      { name: "Java & Spring Boot", level: "Expert", proficiency: 90 },
      { name: "Python & ML/AI", level: "Advanced", proficiency: 85 },
      { name: "Blockchain & Solidity", level: "Advanced", proficiency: 80 },
      { name: "Go & Scala", level: "Advanced", proficiency: 75 },
      { name: "DevOps & Kubernetes", level: "Expert", proficiency: 88 }
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
      { name: "Team Leadership", level: "Expert", proficiency: 95 },
      { name: "Strategic Planning", level: "Expert", proficiency: 92 },
      { name: "Cross-functional Collaboration", level: "Expert", proficiency: 90 },
      { name: "Mentoring & Development", level: "Expert", proficiency: 88 }
    ];

    softSkills.forEach((skill, index) => {
      this.skills.set(index + 7, {
        id: index + 7,
        portfolioId: 1,
        category: "soft",
        ...skill
      });
    });

    // Add experiences
    const sampleExperiences = [
      {
        title: "Engineering Manager",
        company: "Zendesk",
        period: "June 2021 - April 2025",
        description: "Managed customer-facing, cross-functional engineering teams to deliver end-to-end, high-throughput scalable backend solutions. Led re-architecture achieving 99.99% SLA and reducing infrastructure costs by 85%. Designed AI-powered service using Amazon SageMaker for real-time security alerting.",
        technologies: ["AWS", "SageMaker", "Python", "Java", "Kubernetes", "Terraform"],
        startDate: "2021-06",
        endDate: "2025-04"
      },
      {
        title: "Technical Lead",
        company: "StateFarm",
        period: "November 2018 - June 2021",
        description: "Designed and developed RESTful APIs as the foundation for ML-powered applications, enabling AI-driven recommendations. Led design discussions and defined strategic roadmaps for future work, optimizing project development within budget.",
        technologies: ["Java", "Spring Boot", "ML/AI", "REST APIs", "Python"],
        startDate: "2018-11",
        endDate: "2021-06"
      },
      {
        title: "Senior Development Engineer",
        company: "American Express",
        period: "December 2014 - December 2017",
        description: "Designed and developed event-driven architecture for customer card updates, enabling seamless campaign execution. Proposed and implemented batch processing improvements for mobile platforms, enhancing efficiency.",
        technologies: ["Java", "Spring MVC", "Event-driven Architecture", "Batch Processing"],
        startDate: "2014-12",
        endDate: "2017-12"
      },
      {
        title: "Development Engineer",
        company: "Sears Holding Corporation",
        period: "April 2013 - December 2014",
        description: "Designed and developed scheduler from scratch that's now been used for many nightly batch processes. Designed and built a component to monitor status of all interacting applications.",
        technologies: ["Java", "J2EE", "Batch Processing", "System Monitoring"],
        startDate: "2013-04",
        endDate: "2014-12"
      },
      {
        title: "Technical Lead",
        company: "Guardian Life Insurance",
        period: "February 2012 - March 2013",
        description: "Understanding of business requirements and relating it to technical detail. Design and developed code for automatically creating work items.",
        technologies: ["Java", "J2EE", "Workflow Automation"],
        startDate: "2012-02",
        endDate: "2013-03"
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
        degree: "Master of Science in Computer Science",
        institution: "University",
        period: "Completed December 2010",
        details: "Advanced coursework in Computer Science fundamentals, algorithms, and software engineering principles.",
        type: "education"
      },
      {
        degree: "Certified Blockchain Expert",
        institution: "Blockchain Certification Authority",
        period: "April 2025",
        details: null,
        type: "certification"
      },
      {
        degree: "AWS Certified Solutions Architect - Associate",
        institution: "Amazon Web Services",
        period: "March 2021",
        details: null,
        type: "certification"
      },
      {
        degree: "AWS Certified Developer - Associate",
        institution: "Amazon Web Services",
        period: "September 2020",
        details: null,
        type: "certification"
      },
      {
        degree: "Sun Certified Business Component Developer (SCBCD)",
        institution: "Oracle/Sun Microsystems",
        period: "Completed",
        details: null,
        type: "certification"
      },
      {
        degree: "Sun Certified Java Programmer (SCJP)",
        institution: "Oracle/Sun Microsystems",
        period: "Completed",
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
        title: "Blockchain Implementation",
        description: "A simplified yet functional implementation of a basic Blockchain system with mining support and RESTful APIs. Features creation and mining of new blocks, maintenance of full blockchain, and validation of blockchain integrity with proof-of-work algorithm.",
        technologies: ["Python", "Flask", "Blockchain", "Cryptography", "REST API"],
        liveUrl: null,
        githubUrl: "https://github.com/Sys-max-one/blockchain",
        imageUrl: null
      },
      {
        title: "Kcoin ICO Smart Contract",
        description: "Smart contract implementing a basic Initial Coin Offering (ICO) for Kcoin. Allows investors to buy and sell Kcoin using USD, check equity in both Kcoin and USD. Built with Solidity 0.8.30 and tested on Remix VM.",
        technologies: ["Solidity", "Smart Contracts", "Ethereum", "Remix IDE", "ICO"],
        liveUrl: null,
        githubUrl: "https://github.com/Sys-max-one/smart-contract",
        imageUrl: null
      },
      {
        title: "Generative AI Sketch Service",
        description: "Serverless Generative AI service leveraging Amazon Bedrock, AWS Lambda, and Stability-AI to generate images from text prompts. Features secure S3 storage with pre-signed URLs and live API endpoint for immediate image generation in browser.",
        technologies: ["AWS Bedrock", "Lambda", "S3", "Stability-AI", "Python", "API Gateway"],
        liveUrl: "https://dsb2zwz7pk.execute-api.us-east-1.amazonaws.com/dev/ai/sketch?prompt=WHAT_YOU_WANT_TO_SKETCH_TODAY",
        githubUrl: "https://github.com/Sys-max-one/generative-ai",
        imageUrl: null
      },
      {
        title: "RAG-based HR Policy Q&A",
        description: "Retrieval-Augmented Generation pipeline using FAQ PDF documents and AWS Bedrock for LLM inference. Enables natural language querying over HR policy documents using embeddings, vector database storage, and Claude foundation model for intelligent responses.",
        technologies: ["Python", "LangChain", "AWS Bedrock", "Claude", "RAG", "Vector Database"],
        liveUrl: null,
        githubUrl: "https://github.com/Sys-max-one/retrieval_augmented_generation_faq",
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
