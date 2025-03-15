import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Summarize article text
export async function summarizeArticle(text: string, maxLength: number = 150): Promise<string> {
  try {
    const prompt = `Please summarize the following text concisely in about ${maxLength} characters while maintaining key points. Make it engaging for a tech blog reader:\n\n${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content returned from OpenAI");
    return content;
  } catch (error) {
    console.error("Error summarizing article:", error);
    throw new Error("Failed to summarize article");
  }
}

// Categorize article text
export async function categorizeArticle(text: string, availableCategories: string[]): Promise<{
  category: string;
  confidence: number;
}> {
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
  } catch (error) {
    console.error("Error categorizing article:", error);
    throw new Error("Failed to categorize article");
  }
}

// Generate article tags
export async function generateTags(text: string, maxTags: number = 5): Promise<string[]> {
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
  } catch (error) {
    console.error("Error generating tags:", error);
    throw new Error("Failed to generate tags");
  }
}

// Enhance article content
export async function enhanceArticleContent(title: string, content: string): Promise<string> {
  try {
    const prompt = `Rewrite the following tech article content to be more engaging and informative while maintaining factual accuracy. Add relevant technical context where appropriate. Keep the same overall length.

Title: ${title}

Content: ${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) throw new Error("No content returned from OpenAI");
    return responseContent;
  } catch (error) {
    console.error("Error enhancing article content:", error);
    throw new Error("Failed to enhance article content");
  }
}
