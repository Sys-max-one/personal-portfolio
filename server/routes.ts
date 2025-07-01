import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const portfolio = await storage.getPortfolio();
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  app.get("/api/portfolio/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills(1); // Portfolio ID 1
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.get("/api/portfolio/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences(1);
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.get("/api/portfolio/education", async (req, res) => {
    try {
      const education = await storage.getEducation(1);
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education" });
    }
  });

  app.get("/api/portfolio/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects(1);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/portfolio/highlights", async (req, res) => {
    try {
      const highlights = await storage.getHighlights(1);
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch highlights" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse({
        ...req.body,
        portfolioId: 1
      });
      
      const message = await storage.createContactMessage(messageData);
      res.status(201).json({ 
        message: "Message sent successfully",
        data: message 
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
