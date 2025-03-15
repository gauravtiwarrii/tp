import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scheduleNewsUpdates, processAndSaveArticles } from "./services/news";
import { testOpenAiConnection } from "./services/openai";
import { z } from "zod";
import cron from "node-cron";

export async function registerRoutes(app: Express): Promise<Server> {
  // Schedule news updates every hour using cron
  // Run immediate news update on startup
  console.log("Running immediate news update on startup");
  scheduleNewsUpdates(60);
  
  // Schedule hourly updates
  cron.schedule("0 * * * *", () => {
    console.log("Running scheduled news update");
    scheduleNewsUpdates(60);
  });
  
  // Test endpoint for AI processing
  app.get("/api/test-ai-features", async (_req: Request, res: Response) => {
    try {
      // Trigger article processing to test OpenAI integration
      console.log("Testing AI features...");
      await processAndSaveArticles();
      res.json({ message: "AI features tested successfully, articles processed with OpenAI" });
    } catch (error: any) {
      console.error("Error testing AI features:", error);
      res.status(500).json({ 
        message: "Failed to test AI features", 
        error: error.message || String(error) 
      });
    }
  });

  // Get articles with pagination
  app.get("/api/articles", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const articles = await storage.getArticles(limit, offset);
      
      // Enrich articles with tags
      const enrichedArticles = await Promise.all(
        articles.map(async (article) => {
          const tags = await storage.getArticleTags(article.id);
          const category = await storage.getCategoryById(article.categoryId || 1);
          
          return {
            ...article,
            tags,
            category
          };
        })
      );
      
      res.json(enrichedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  
  // Get article by ID
  app.get("/api/articles/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticleById(id);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Increment view count
      await storage.incrementArticleViews(id);
      
      // Get tags and category
      const tags = await storage.getArticleTags(article.id);
      const category = await storage.getCategoryById(article.categoryId || 1);
      
      res.json({
        ...article,
        tags,
        category
      });
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  
  // Get articles by category
  app.get("/api/categories/:slug/articles", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const articles = await storage.getArticlesByCategoryId(category.id, limit, offset);
      
      // Enrich articles with tags
      const enrichedArticles = await Promise.all(
        articles.map(async (article) => {
          const tags = await storage.getArticleTags(article.id);
          
          return {
            ...article,
            tags,
            category
          };
        })
      );
      
      res.json(enrichedArticles);
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });
  
  // Get all categories
  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  // Get all tags
  app.get("/api/tags", async (_req: Request, res: Response) => {
    try {
      const tags = await storage.getTags();
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  });
  
  // Get featured article
  app.get("/api/featured-article", async (_req: Request, res: Response) => {
    try {
      const featuredArticle = await storage.getFeaturedArticle();
      
      if (!featuredArticle) {
        return res.status(404).json({ message: "No featured article found" });
      }
      
      // Get tags and category
      const tags = await storage.getArticleTags(featuredArticle.id);
      const category = await storage.getCategoryById(featuredArticle.categoryId || 1);
      
      res.json({
        ...featuredArticle,
        tags,
        category
      });
    } catch (error) {
      console.error("Error fetching featured article:", error);
      res.status(500).json({ message: "Failed to fetch featured article" });
    }
  });
  
  // Search articles
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const searchSchema = z.object({
        query: z.string().min(1).max(100),
        limit: z.string().optional().transform(val => parseInt(val || "10")),
        offset: z.string().optional().transform(val => parseInt(val || "0")),
      });
      
      const { query, limit, offset } = searchSchema.parse(req.query);
      
      const articles = await storage.searchArticles(query, limit, offset);
      
      // Enrich articles with tags and categories
      const enrichedArticles = await Promise.all(
        articles.map(async (article) => {
          const tags = await storage.getArticleTags(article.id);
          const category = await storage.getCategoryById(article.categoryId || 1);
          
          return {
            ...article,
            tags,
            category
          };
        })
      );
      
      res.json(enrichedArticles);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid search parameters", errors: error.errors });
      }
      
      console.error("Error searching articles:", error);
      res.status(500).json({ message: "Failed to search articles" });
    }
  });
  
  // Get articles by tag
  app.get("/api/tags/:slug/articles", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const tag = await storage.getTagBySlug(slug);
      
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      
      const articles = await storage.getArticlesByTagId(tag.id, limit, offset);
      
      // Enrich articles with all tags and category
      const enrichedArticles = await Promise.all(
        articles.map(async (article) => {
          const tags = await storage.getArticleTags(article.id);
          const category = await storage.getCategoryById(article.categoryId || 1);
          
          return {
            ...article,
            tags,
            category
          };
        })
      );
      
      res.json(enrichedArticles);
    } catch (error) {
      console.error("Error fetching articles by tag:", error);
      res.status(500).json({ message: "Failed to fetch articles by tag" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
