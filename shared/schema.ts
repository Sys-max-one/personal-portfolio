import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  aboutDescription: text("about_description").notNull(),
  aboutDescription2: text("about_description_2"),
  yearsExperience: integer("years_experience").notNull(),
  projectsCompleted: integer("projects_completed").notNull(),
  socialLinks: jsonb("social_links").$type<{
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  }>(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull(),
  name: text("name").notNull(),
  level: text("level").notNull(), // Expert, Advanced, Intermediate
  proficiency: integer("proficiency").notNull(), // 0-100
  category: text("category").notNull(), // technical, soft
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  period: text("period").notNull(),
  details: text("details"),
  type: text("type").notNull(), // education, certification
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  imageUrl: text("image_url"),
});

export const highlights = pgTable("highlights", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull(),
  text: text("text").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

export const insertEducationSchema = createInsertSchema(education).omit({
  id: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertHighlightSchema = createInsertSchema(highlights).omit({
  id: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Portfolio = typeof portfolios.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Highlight = typeof highlights.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertHighlight = z.infer<typeof insertHighlightSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
