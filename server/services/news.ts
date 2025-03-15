import { InsertArticle } from "@shared/schema";
import { summarizeArticle, generateTags, categorizeArticle } from "./openai";
import { storage } from "../storage";

// API key for NewsAPI
const NEWS_API_KEY = process.env.NEWS_API_KEY || "";
const NEWS_API_URL = "https://newsapi.org/v2";

// Define news sources for tech news
const TECH_SOURCES = [
  "wired", "the-verge", "techcrunch", "ars-technica", "hacker-news", 
  "engadget", "recode", "techradar"
].join(",");

// Tech-related topics to search for
const TECH_TOPICS = [
  "technology", "ai", "artificial intelligence", "machine learning",
  "blockchain", "quantum computing", "gadgets", "smartphones", 
  "cybersecurity", "software", "hardware", "robotics"
];

interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

// Function to fetch articles from NewsAPI
export async function fetchNewsArticles(): Promise<InsertArticle[]> {
  try {
    // Choose a random tech topic to search for
    const randomTopic = TECH_TOPICS[Math.floor(Math.random() * TECH_TOPICS.length)];
    
    const url = `${NEWS_API_URL}/everything?q=${encodeURIComponent(randomTopic)}&sources=${TECH_SOURCES}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
    
    let articles: InsertArticle[] = [];
    
    // If NEWS_API_KEY is not provided, use mock data for development
    if (!NEWS_API_KEY) {
      console.log("No NEWS_API_KEY provided, using mock data");
      return getMockArticles();
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json() as NewsAPIResponse;
    
    if (data.status !== "ok") {
      throw new Error(`NewsAPI error: ${data.status}`);
    }
    
    const processedArticles = await Promise.all(
      data.articles.map(async (article) => {
        if (!article.title || !article.url || !article.publishedAt) {
          return null;
        }
        
        // Initialize full content with description if content is missing
        const fullContent = article.content || article.description || "No content available";
        
        // Generate a summary using AI if there's content, otherwise use description
        const summary = await summarizeArticle(fullContent);
        
        // Get all categories
        const categories = await storage.getCategories();
        const categoryNames = categories.map(cat => cat.name);
        
        // Determine category using AI
        const categoryName = await categorizeArticle(article.title, fullContent, categoryNames);
        const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        
        return {
          title: article.title,
          content: fullContent,
          summary: summary,
          originalUrl: article.url,
          imageUrl: article.urlToImage || undefined,
          publishedAt: new Date(article.publishedAt),
          sourceId: article.source.id || article.source.name.toLowerCase().replace(/\s+/g, "-"),
          sourceName: article.source.name,
          categoryId: category?.id || categories[0].id,
        };
      })
    );
    
    articles = processedArticles.filter(Boolean) as InsertArticle[];
    return articles;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return getMockArticles();
  }
}

// Process and save new articles
export async function processAndSaveArticles(): Promise<void> {
  try {
    const articles = await fetchNewsArticles();
    
    for (const article of articles) {
      // Check if article already exists (by URL)
      const existingArticles = await storage.searchArticles(article.originalUrl, 1, 0);
      const isExisting = existingArticles.some(a => a.originalUrl === article.originalUrl);
      
      if (!isExisting) {
        // Save article
        const savedArticle = await storage.createArticle(article);
        
        // Generate tags
        const tags = await generateTags(article.title, article.content);
        
        // Save tags and link to article
        for (const tagName of tags) {
          // Find or create tag
          let tag = await storage.getTagBySlug(
            tagName.toLowerCase().replace(/\s+/g, "-")
          );
          
          if (!tag) {
            tag = await storage.createTag({
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, "-")
            });
          }
          
          // Link tag to article
          await storage.createArticleTag({
            articleId: savedArticle.id,
            tagId: tag.id
          });
        }
        
        // Mark as AI processed
        await storage.updateArticle(savedArticle.id, { aiProcessed: true });
      }
    }
  } catch (error) {
    console.error("Error processing and saving articles:", error);
  }
}

// Development mock data
function getMockArticles(): InsertArticle[] {
  return [
    {
      title: "GPT-5 Prototype Shows Remarkable Reasoning Skills in Early Tests",
      content: "Researchers at OpenAI unveiled the next evolution in AI language models with GPT-5, which shows capabilities that approach human-like understanding and problem-solving in complex scenarios. The new model demonstrates unprecedented ability to reason about abstract concepts and solve multi-step problems that previous models struggled with. In internal testing, GPT-5 showed significant improvements in mathematical reasoning, logical deduction, and common-sense reasoning tasks. While GPT-4 made notable strides in these areas, GPT-5 takes another leap forward by maintaining coherent reasoning chains across much longer and more complex problems. Particularly impressive is the model's ability to identify and correct its own reasoning errors - a capability that begins to resemble human metacognition. Researchers caution that the technology is still in early prototype stages and a public release date has not been announced.",
      summary: "Researchers unveil the next evolution in AI language models with capabilities that approach human-like understanding and problem-solving in complex scenarios.",
      originalUrl: "https://example.com/gpt-5-prototype",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
      publishedAt: new Date(),
      sourceId: "tech-journal",
      sourceName: "Tech Journal",
      categoryId: 1, // AI category
    },
    {
      title: "Microsoft Unveils AI-Powered Development Tools to Enhance Coding Efficiency",
      content: "The new suite of tools promises to automate repetitive tasks and suggest optimizations, potentially saving developers hundreds of hours annually. Microsoft's latest development tools use machine learning to analyze code patterns and offer contextual suggestions that significantly reduce debugging time.",
      summary: "The new suite of tools promises to automate repetitive tasks and suggest optimizations, potentially saving developers hundreds of hours annually.",
      originalUrl: "https://example.com/microsoft-ai-dev-tools",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      sourceId: "techcrunch",
      sourceName: "TechCrunch",
      categoryId: 3, // Software category
    },
    {
      title: "iPhone 16 Design Leaked: What to Expect from Apple's Next Generation Smartphone",
      content: "Leaked schematics reveal a radical design overhaul featuring a unique camera layout and new display technology not seen in previous models. Industry insiders suggest the iPhone 16 will feature significantly improved camera capabilities and potentially revolutionary display technology that could change how we interact with mobile devices.",
      summary: "Leaked schematics reveal a radical design overhaul featuring a unique camera layout and new display technology not seen in previous models.",
      originalUrl: "https://example.com/iphone-16-leaks",
      imageUrl: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      sourceId: "the-verge",
      sourceName: "The Verge",
      categoryId: 2, // Gadgets category
    },
    {
      title: "Breakthrough in Quantum Computing Could Lead to More Stable Qubits",
      content: "Researchers have developed a new method to maintain quantum coherence for longer periods, potentially accelerating the path to practical quantum applications. The breakthrough involves a novel approach to error correction that significantly extends the stability of quantum bits, bringing quantum computing one step closer to practical applications.",
      summary: "Researchers have developed a new method to maintain quantum coherence for longer periods, potentially accelerating the path to practical quantum applications.",
      originalUrl: "https://example.com/quantum-computing-breakthrough",
      imageUrl: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      sourceId: "wired",
      sourceName: "Wired",
      categoryId: 6, // Quantum Computing category
    },
    {
      title: "New Zero-Day Vulnerability Affecting Multiple Operating Systems Found by Security Researchers",
      content: "A critical vulnerability has been discovered that could allow attackers to execute arbitrary code remotely; patches are being developed urgently. Security experts are advising users to disable certain features until patches are available, as the vulnerability affects core components of several major operating systems.",
      summary: "A critical vulnerability has been discovered that could allow attackers to execute arbitrary code remotely; patches are being developed urgently.",
      originalUrl: "https://example.com/zero-day-vulnerability",
      imageUrl: "https://images.unsplash.com/photo-1526666923127-b2970f64b422",
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
      sourceId: "ars-technica",
      sourceName: "Ars Technica",
      categoryId: 5, // Cybersecurity category
    }
  ];
}

// Schedule news updates
export function scheduleNewsUpdates(intervalMinutes: number = 60): NodeJS.Timeout {
  console.log(`Scheduling news updates every ${intervalMinutes} minutes`);
  
  // Run once immediately
  processAndSaveArticles();
  
  // Then schedule at interval
  return setInterval(processAndSaveArticles, intervalMinutes * 60 * 1000);
}
