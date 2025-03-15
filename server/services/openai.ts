import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key"
});

// Summarize article text
export async function summarizeArticle(text: string): Promise<string> {
  try {
    const prompt = `Please summarize the following tech news article in about 2-3 sentences while preserving key points and technical details:\n\n${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    return response.choices[0].message.content || "Summary not available.";
  } catch (error) {
    console.error("Error summarizing article:", error);
    return "Summary not available due to an error.";
  }
}

// Generate tags for an article
export async function generateTags(title: string, content: string): Promise<string[]> {
  try {
    const prompt = `Based on the following tech article title and content, generate 3-5 relevant tags for categorization. Return the tags as a JSON array of strings (only tag names, no descriptions):\n\nTitle: ${title}\n\nContent: ${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.tags || [];
  } catch (error) {
    console.error("Error generating tags:", error);
    return ["technology"];
  }
}

// Categorize an article
export async function categorizeArticle(title: string, content: string, categories: string[]): Promise<string> {
  try {
    const prompt = `Based on the following tech article title and content, categorize it into one of these categories: ${categories.join(", ")}. Respond with only the category name that best fits the article.\n\nTitle: ${title}\n\nContent: ${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || categories[0];
  } catch (error) {
    console.error("Error categorizing article:", error);
    return categories[0];
  }
}
