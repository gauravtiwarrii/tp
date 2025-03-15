import {
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  articles, type Article, type InsertArticle
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryArticleCount(id: number, count: number): Promise<Category>;
  
  // Article operations
  getArticles(limit?: number): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getFeaturedArticle(): Promise<Article | undefined>;
  getTrendingArticles(limit?: number): Promise<Article[]>;
  getArticlesByCategory(categoryId: number, limit?: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  
  private userCurrentId: number;
  private categoryCurrentId: number;
  private articleCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.articleCurrentId = 1;
    
    // Initialize with default categories
    this.initializeDefaultData();
  }
  
  private initializeDefaultData() {
    // Add default categories
    const defaultCategories = [
      { name: "AI & ML", slug: "ai-ml", icon: "robot", color: "bg-gradient-to-r from-[#6C63FF] to-[#9089FC]", articleCount: 153 },
      { name: "Gadgets", slug: "gadgets", icon: "microchip", color: "bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C]", articleCount: 98 },
      { name: "Software", slug: "software", icon: "code", color: "bg-gradient-to-r from-[#2DD4BF] to-[#06B6D4]", articleCount: 122 },
      { name: "Innovation", slug: "innovation", icon: "lightbulb", color: "bg-gradient-to-r from-[#9333EA] to-[#F472B6]", articleCount: 75 }
    ];
    
    defaultCategories.forEach(category => {
      this.createCategory({
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        color: category.color,
        articleCount: category.articleCount
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  async updateCategoryArticleCount(id: number, count: number): Promise<Category> {
    const category = this.categories.get(id);
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    const updatedCategory: Category = {
      ...category,
      articleCount: count
    };
    
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }
  
  // Article methods
  async getArticles(limit?: number): Promise<Article[]> {
    const allArticles = Array.from(this.articles.values());
    allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    if (limit) {
      return allArticles.slice(0, limit);
    }
    
    return allArticles;
  }
  
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug,
    );
  }
  
  async getFeaturedArticle(): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.isFeatured,
    );
  }
  
  async getTrendingArticles(limit?: number): Promise<Article[]> {
    const trendingArticles = Array.from(this.articles.values())
      .filter(article => article.isTrending)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    if (limit) {
      return trendingArticles.slice(0, limit);
    }
    
    return trendingArticles;
  }
  
  async getArticlesByCategory(categoryId: number, limit?: number): Promise<Article[]> {
    const categoryArticles = Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    if (limit) {
      return categoryArticles.slice(0, limit);
    }
    
    return categoryArticles;
  }
  
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleCurrentId++;
    const article: Article = { 
      ...insertArticle, 
      id,
      publishedAt: insertArticle.publishedAt || new Date()
    };
    
    this.articles.set(id, article);
    
    // Update category article count
    const category = this.categories.get(article.categoryId);
    if (category) {
      this.updateCategoryArticleCount(category.id, category.articleCount + 1);
    }
    
    return article;
  }
  
  async updateArticle(id: number, articleUpdate: Partial<InsertArticle>): Promise<Article> {
    const article = this.articles.get(id);
    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }
    
    const updatedArticle: Article = {
      ...article,
      ...articleUpdate
    };
    
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }
}

export const storage = new MemStorage();
