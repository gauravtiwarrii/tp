import { 
  Article, InsertArticle, 
  Category, InsertCategory, 
  Tag, InsertTag, 
  ArticleTag, InsertArticleTag 
} from "@shared/schema";

export interface IStorage {
  // Article methods
  getArticles(limit: number, offset: number): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticlesByCategoryId(categoryId: number, limit: number, offset: number): Promise<Article[]>;
  getArticlesByTagId(tagId: number, limit: number, offset: number): Promise<Article[]>;
  getFeaturedArticle(): Promise<Article | undefined>;
  searchArticles(query: string, limit: number, offset: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<Article>): Promise<Article | undefined>;
  incrementArticleViews(id: number): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Tag methods
  getTags(): Promise<Tag[]>;
  getTagById(id: number): Promise<Tag | undefined>;
  getTagBySlug(slug: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  getArticleTags(articleId: number): Promise<Tag[]>;
  
  // Article-Tag methods
  createArticleTag(articleTag: InsertArticleTag): Promise<ArticleTag>;
  deleteArticleTag(articleId: number, tagId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private articles: Map<number, Article>;
  private categories: Map<number, Category>;
  private tags: Map<number, Tag>;
  private articleTags: Map<number, ArticleTag>;
  
  private articleIdCounter: number;
  private categoryIdCounter: number;
  private tagIdCounter: number;
  private articleTagIdCounter: number;
  
  constructor() {
    this.articles = new Map();
    this.categories = new Map();
    this.tags = new Map();
    this.articleTags = new Map();
    
    this.articleIdCounter = 1;
    this.categoryIdCounter = 1;
    this.tagIdCounter = 1;
    this.articleTagIdCounter = 1;
    
    // Initialize with default categories
    const defaultCategories: InsertCategory[] = [
      { name: "Artificial Intelligence", slug: "ai", description: "News about AI advancements", imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a" },
      { name: "Gadgets", slug: "gadgets", description: "Latest tech gadgets", imageUrl: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81" },
      { name: "Software", slug: "software", description: "Software and app updates", imageUrl: "https://images.unsplash.com/photo-1626379961798-54f819ee896a" },
      { name: "Hardware", slug: "hardware", description: "Computer hardware news", imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f" },
      { name: "Cybersecurity", slug: "cybersecurity", description: "Security and privacy news", imageUrl: "https://images.unsplash.com/photo-1526666923127-b2970f64b422" },
      { name: "Quantum Computing", slug: "quantum-computing", description: "Advances in quantum computing", imageUrl: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a" }
    ];
    
    defaultCategories.forEach(category => this.createCategory(category));
    
    // Initialize with default tags
    const defaultTags: InsertTag[] = [
      { name: "Machine Learning", slug: "machine-learning" },
      { name: "Smart Home", slug: "smart-home" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "5G", slug: "5g" },
      { name: "Deep Learning", slug: "deep-learning" },
      { name: "Cloud Computing", slug: "cloud-computing" },
      { name: "IoT", slug: "iot" },
      { name: "AR", slug: "ar" },
      { name: "Big Data", slug: "big-data" },
      { name: "Blockchain", slug: "blockchain" }
    ];
    
    defaultTags.forEach(tag => this.createTag(tag));
  }
  
  // Article methods
  async getArticles(limit: number = 10, offset: number = 0): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles.slice(offset, offset + limit);
  }
  
  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }
  
  async getArticlesByCategoryId(categoryId: number, limit: number = 10, offset: number = 0): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles.slice(offset, offset + limit);
  }
  
  async getArticlesByTagId(tagId: number, limit: number = 10, offset: number = 0): Promise<Article[]> {
    const articleIds = new Set<number>();
    
    Array.from(this.articleTags.values())
      .filter(at => at.tagId === tagId)
      .forEach(at => articleIds.add(at.articleId));
    
    const articles = Array.from(articleIds)
      .map(id => this.articles.get(id))
      .filter(Boolean) as Article[];
    
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles.slice(offset, offset + limit);
  }
  
  async getFeaturedArticle(): Promise<Article | undefined> {
    // Return the newest article as the featured one
    const articles = Array.from(this.articles.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles[0];
  }
  
  async searchArticles(query: string, limit: number = 10, offset: number = 0): Promise<Article[]> {
    const searchTerm = query.toLowerCase();
    
    const articles = Array.from(this.articles.values())
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm) || 
        article.content.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles.slice(offset, offset + limit);
  }
  
  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.articleIdCounter++;
    const newArticle: Article = {
      ...article,
      id,
      aiProcessed: false,
      createdAt: new Date(),
      viewCount: 0
    };
    
    this.articles.set(id, newArticle);
    return newArticle;
  }
  
  async updateArticle(id: number, article: Partial<Article>): Promise<Article | undefined> {
    const existingArticle = this.articles.get(id);
    
    if (!existingArticle) return undefined;
    
    const updatedArticle = {
      ...existingArticle,
      ...article
    };
    
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }
  
  async incrementArticleViews(id: number): Promise<Article | undefined> {
    const article = this.articles.get(id);
    
    if (!article) return undefined;
    
    const updatedArticle = {
      ...article,
      viewCount: article.viewCount + 1
    };
    
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }
  
  async deleteArticle(id: number): Promise<boolean> {
    return this.articles.delete(id);
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = {
      ...category,
      id
    };
    
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  // Tag methods
  async getTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }
  
  async getTagById(id: number): Promise<Tag | undefined> {
    return this.tags.get(id);
  }
  
  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(tag => tag.slug === slug);
  }
  
  async createTag(tag: InsertTag): Promise<Tag> {
    const id = this.tagIdCounter++;
    const newTag: Tag = {
      ...tag,
      id
    };
    
    this.tags.set(id, newTag);
    return newTag;
  }
  
  async getArticleTags(articleId: number): Promise<Tag[]> {
    const tagIds = Array.from(this.articleTags.values())
      .filter(at => at.articleId === articleId)
      .map(at => at.tagId);
    
    return tagIds.map(id => this.tags.get(id)).filter(Boolean) as Tag[];
  }
  
  // Article-Tag methods
  async createArticleTag(articleTag: InsertArticleTag): Promise<ArticleTag> {
    const id = this.articleTagIdCounter++;
    const newArticleTag: ArticleTag = {
      ...articleTag,
      id
    };
    
    this.articleTags.set(id, newArticleTag);
    return newArticleTag;
  }
  
  async deleteArticleTag(articleId: number, tagId: number): Promise<boolean> {
    const articleTagToDelete = Array.from(this.articleTags.values()).find(
      at => at.articleId === articleId && at.tagId === tagId
    );
    
    if (!articleTagToDelete) return false;
    
    return this.articleTags.delete(articleTagToDelete.id);
  }
}

export const storage = new MemStorage();
