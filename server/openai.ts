
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Summarize article text
export async function summarizeArticle(text: string, maxLength: number = 150): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }

  try {
    const prompt = `Please summarize the following text concisely in about ${maxLength} characters while maintaining key points. Make it engaging for a tech blog reader:\n\n${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content returned from OpenAI");
    return content;
  } catch (error: any) {
    console.error("Error summarizing article:", error);
    throw new Error(`Failed to summarize article: ${error.message}`);
  }
}

// Categorize article text
export async function categorizeArticle(text: string, availableCategories: string[]): Promise<{
  category: string;
  confidence: number;
}> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }

  try {
    const categoriesString = availableCategories.join(", ");
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a tech content categorization expert. Analyze the text and assign it to one of these categories: ${categoriesString}. Respond with JSON in this format: { "category": "category-name", "confidence": 0.x }`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      category: result.category,
      confidence: result.confidence,
    };
  } catch (error: any) {
    console.error("Error categorizing article:", error);
    throw new Error(`Failed to categorize article: ${error.message}`);
  }
}

// Generate article tags
export async function generateTags(text: string, maxTags: number = 5): Promise<string[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a tech content expert. Generate up to ${maxTags} relevant tags for the given text. Respond with JSON in this format: { "tags": ["tag1", "tag2", "tag3"] }`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.tags;
  } catch (error: any) {
    console.error("Error generating tags:", error);
    throw new Error(`Failed to generate tags: ${error.message}`);
  }
}

// Test OpenAI API connection
export async function testOpenAiConnection(): Promise<{ success: boolean; message: string }> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      message: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.",
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: "Test connection" }],
    });

    return {
      success: true,
      message: "Successfully connected to OpenAI API",
    };
  } catch (error: any) {
    return {
      success: false,
      message: `OpenAI API error: ${error.message}`,
    };
  }
}
