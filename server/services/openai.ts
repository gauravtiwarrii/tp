import OpenAI from "openai";

// Initialize OpenAI with the API key or a placeholder
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key"
});

// Flag to track API status
let isOpenAiAvailable = true;

// Check API availability
async function checkOpenAiAvailability(): Promise<boolean> {
  if (!process.env.OPENAI_API_KEY) {
    console.log("No OpenAI API key provided, using demo mode");
    return false;
  }
  
  try {
    // Simple test call to check API access
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
      messages: [{ role: "user", content: "Test connection" }],
      max_tokens: 5,
    });
    
    return response.choices && response.choices.length > 0;
  } catch (error: any) {
    console.warn("OpenAI API check failed:", error.message || error);
    // Update the availability flag
    isOpenAiAvailable = false;
    return false;
  }
}

// Demo mode: generate a summary based on the first few sentences
function generateDemoSummary(text: string): string {
  // Extract the first 1-2 sentences up to ~200 characters
  const sentences = text.split(/[.!?]+/);
  let summary = "";
  let charCount = 0;
  
  for (const sentence of sentences) {
    if (sentence.trim() === "") continue;
    const cleanSentence = sentence.trim() + ".";
    charCount += cleanSentence.length;
    summary += cleanSentence + " ";
    if (charCount > 200) break;
  }
  
  return summary.trim();
}

// Demo mode: generate tags based on common tech topics and keywords in content
function generateDemoTags(title: string, content: string): string[] {
  const combinedText = (title + " " + content).toLowerCase();
  const tags = [];
  
  // Common tech categories and their keywords
  const techCategories = {
    "ai": ["ai", "artificial intelligence", "machine learning", "neural", "gpt", "llm"],
    "blockchain": ["blockchain", "crypto", "bitcoin", "ethereum", "web3", "nft"],
    "cybersecurity": ["security", "hack", "vulnerability", "password", "encryption", "privacy"],
    "cloud": ["cloud", "aws", "azure", "google cloud", "serverless"],
    "hardware": ["hardware", "chip", "processor", "gpu", "device"],
    "mobile": ["mobile", "iphone", "android", "smartphone", "app"],
    "software": ["software", "programming", "code", "developer", "app"],
    "gaming": ["game", "gaming", "playstation", "xbox", "nintendo"],
    "vr": ["vr", "virtual reality", "ar", "augmented reality", "metaverse"]
  };
  
  // Check for keywords and add corresponding tags
  for (const [category, keywords] of Object.entries(techCategories)) {
    for (const keyword of keywords) {
      if (combinedText.includes(keyword)) {
        tags.push(category);
        break;
      }
    }
  }
  
  // Ensure we have at least one tag
  if (tags.length === 0) {
    tags.push("technology");
  }
  
  // Limit to 5 tags
  return tags.slice(0, 5);
}

// Demo mode: basic categorization based on keywords
function categorizeDemoArticle(title: string, content: string, categories: string[]): string {
  const combinedText = (title + " " + content).toLowerCase();
  
  // Map of category keywords
  const categoryKeywords: Record<string, string[]> = {
    "AI": ["ai", "artificial intelligence", "machine learning", "neural network", "gpt", "llm"],
    "Gadgets": ["gadget", "device", "hardware", "phone", "laptop", "wearable"],
    "Software": ["software", "app", "application", "program", "code", "developer"],
    "Cybersecurity": ["security", "hack", "breach", "vulnerability", "encrypt", "protect"],
    "Blockchain": ["blockchain", "crypto", "bitcoin", "ethereum", "nft", "web3"],
    "Quantum Computing": ["quantum", "qubit", "superposition", "entanglement"]
  };
  
  // Score each category based on keyword matches
  const scores: Record<string, number> = {};
  
  for (const category of categories) {
    scores[category] = 0;
    const keywords = categoryKeywords[category] || [];
    
    for (const keyword of keywords) {
      if (combinedText.includes(keyword)) {
        scores[category] += 1;
      }
    }
  }
  
  // Find the category with the highest score
  let bestCategory = categories[0];
  let highestScore = 0;
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  }
  
  return bestCategory;
}

// Summarize article text
export async function summarizeArticle(text: string): Promise<string> {
  // Validate API availability on first call
  if (isOpenAiAvailable && await checkOpenAiAvailability()) {
    try {
      const prompt = `Please summarize the following tech news article in about 2-3 sentences while preserving key points and technical details:\n\n${text}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      });

      return response.choices[0].message.content || "Summary not available.";
    } catch (error) {
      console.error("Error summarizing article with OpenAI:", error);
      isOpenAiAvailable = false;
    }
  }
  
  // Fallback to demo mode
  console.log("Using demo mode for article summarization");
  return generateDemoSummary(text);
}

// Generate tags for an article
export async function generateTags(title: string, content: string): Promise<string[]> {
  // Check API availability
  if (isOpenAiAvailable && await checkOpenAiAvailability()) {
    try {
      const prompt = `Based on the following tech article title and content, generate 3-5 relevant tags for categorization. Return the tags as a JSON array of strings (only tag names, no descriptions):\n\nTitle: ${title}\n\nContent: ${content}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result.tags || [];
    } catch (error) {
      console.error("Error generating tags with OpenAI:", error);
      isOpenAiAvailable = false;
    }
  }
  
  // Fallback to demo mode
  console.log("Using demo mode for tag generation");
  return generateDemoTags(title, content);
}

// Categorize an article
export async function categorizeArticle(title: string, content: string, categories: string[]): Promise<string> {
  // Check API availability
  if (isOpenAiAvailable && await checkOpenAiAvailability()) {
    try {
      const prompt = `Based on the following tech article title and content, categorize it into one of these categories: ${categories.join(", ")}. Respond with only the category name that best fits the article.\n\nTitle: ${title}\n\nContent: ${content}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [{ role: "user", content: prompt }],
      });

      return response.choices[0].message.content || categories[0];
    } catch (error) {
      console.error("Error categorizing article with OpenAI:", error);
      isOpenAiAvailable = false;
    }
  }
  
  // Fallback to demo mode
  console.log("Using demo mode for article categorization");
  return categorizeDemoArticle(title, content, categories);
}

// Direct method to test OpenAI API connectivity
export async function testOpenAiConnection(): Promise<{ success: boolean; message: string }> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return { 
        success: false, 
        message: "No OpenAI API key provided. The application is running in demo mode." 
      };
    }
    
    const available = await checkOpenAiAvailability();
    
    if (available) {
      return { 
        success: true, 
        message: "Successfully connected to OpenAI API." 
      };
    } else {
      return { 
        success: false, 
        message: "Failed to connect to OpenAI API. The application is running in demo mode." 
      };
    }
  } catch (error: any) {
    return { 
      success: false, 
      message: `Error testing OpenAI connection: ${error.message || String(error)}` 
    };
  }
}
