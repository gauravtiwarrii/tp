import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { summarizeArticle, categorizeArticle, enhanceArticleContent } from "./openai";
import { z } from "zod";
import cron from "node-cron";
import axios from "axios";

// Define NewsAPI response types
interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

// Helper to convert strings to slugs
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Fetch articles from NewsAPI
async function fetchArticlesFromNewsAPI() {
  try {
    // Use a free API key or get one from environment variables
    const apiKey = process.env.NEWS_API_KEY || "dummy-key";
    const response = await axios.get<NewsAPIResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`);
    
    if (response.data.status === "ok") {
      return response.data.articles;
    }
    return [];
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
}

// Process and store articles from NewsAPI
async function processAndStoreArticles() {
  try {
    const newsArticles = await fetchArticlesFromNewsAPI();
    const categories = await storage.getCategories();
    const categoryMap = new Map(categories.map(cat => [cat.slug, cat.id]));
    
    for (const article of newsArticles) {
      // Skip if article doesn't have required fields
      if (!article.title || !article.content || !article.urlToImage) continue;
      
      // Check if article already exists (by url)
      const slug = createSlug(article.title);
      const existingArticle = await storage.getArticleBySlug(slug);
      if (existingArticle) continue;
      
      // Summarize and categorize the article
      const summary = await summarizeArticle(article.content);
      const { category } = await categorizeArticle(
        article.content,
        categories.map(c => c.slug)
      );
      
      // Enhance content
      const enhancedContent = await enhanceArticleContent(article.title, article.content);
      
      // Determine if article should be trending or featured
      const isTrending = Math.random() > 0.7;
      const isFeatured = !isTrending && Math.random() > 0.9;
      
      // Create the article
      await storage.createArticle({
        title: article.title,
        slug,
        summary,
        content: enhancedContent,
        imageUrl: article.urlToImage,
        sourceUrl: article.url,
        categoryId: categoryMap.get(category) || categories[0].id,
        isAiGenerated: true,
        isTrending,
        isFeatured,
        publishedAt: new Date(article.publishedAt),
        author: article.author || "AI Reporter",
        authorImageUrl: "https://images.unsplash.com/photo-1619379180294-3e714910e6a9?ixlib=rb-4.0.3"
      });
    }
    
    console.log(`Processed ${newsArticles.length} articles from NewsAPI`);
  } catch (error) {
    console.error("Error in processAndStoreArticles:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  // Get articles with optional limit
  app.get("/api/articles", async (req, res) => {
    try {
      const limitParam = req.query.limit;
      const limit = limitParam ? parseInt(limitParam as string) : undefined;
      const articles = await storage.getArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  
  // Get featured article
  app.get("/api/articles/featured", async (_req, res) => {
    try {
      const featuredArticle = await storage.getFeaturedArticle();
      if (featuredArticle) {
        res.json(featuredArticle);
      } else {
        res.status(404).json({ message: "No featured article found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured article" });
    }
  });
  
  // Get trending articles
  app.get("/api/articles/trending", async (req, res) => {
    try {
      const limitParam = req.query.limit;
      const limit = limitParam ? parseInt(limitParam as string) : undefined;
      const trendingArticles = await storage.getTrendingArticles(limit);
      res.json(trendingArticles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending articles" });
    }
  });
  
  // Get articles by category
  app.get("/api/categories/:slug/articles", async (req, res) => {
    try {
      const { slug } = req.params;
      const limitParam = req.query.limit;
      const limit = limitParam ? parseInt(limitParam as string) : undefined;
      
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const articles = await storage.getArticlesByCategory(category.id, limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category articles" });
    }
  });
  
  // Get article by slug
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  
  // Search articles
  app.get("/api/search", async (req, res) => {
    try {
      const query = (req.query.q as string || "").toLowerCase();
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const articles = await storage.getArticles();
      const results = articles.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.summary.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });
  
  // Initial data fetching on startup
  processAndStoreArticles();
  
  // Setup scheduled task to fetch new articles every hour
  cron.schedule('0 * * * *', () => {
    console.log('Running scheduled task to fetch new articles');
    processAndStoreArticles();
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
