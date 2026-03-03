import { GoogleGenerativeAI } from "@google/generative-ai";
import { AISentiment, SentimentClassification, Review } from "@/types";

export async function generateSentimentAnalysis(reviews: Review[]): Promise<AISentiment> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not defined");

    if (!reviews || reviews.length === 0) {
        return {
            summary: "No audience reviews were found for this movie to analyze.",
            classification: "Mixed",
        };
    }

    // Use a reasonable subset of reviews to avoid context window issues
    const reviewsText = reviews
        .slice(0, 8)
        .map((r, i) => `Review ${i + 1} by ${r.author}: ${r.content.substring(0, 1500)}`)
        .join("\n\n");

    const promptText = `You are a movie sentiment analysis expert.
Based on the following audience reviews:

${reviewsText}

1. Provide a concise 5-6 line summary of overall audience sentiment.
2. Classify overall sentiment as exactly one of:
   - Positive
   - Mixed
   - Negative

Return ONLY valid JSON in this format:
{
  "summary": "string",
  "sentiment": "Positive | Mixed | Negative"
}

Do not include markdown.
Do not include extra explanation.
Only return JSON.`;

    const genAI = new GoogleGenerativeAI(apiKey);

    // As per user requirement, only gemini-2.5-flash is supported
    const modelName = "gemini-2.5-flash";

    try {
        console.log(`[AI ANALYSIS] Requesting analysis with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent(promptText);
        const responseText = result.response.text().trim();

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error(`[AI ERROR] No JSON found in response from ${modelName}`);
            throw new Error("Invalid AI response format");
        }

        const data = JSON.parse(jsonMatch[0]);

        console.log(`[AI SUCCESS] Analysis completed with model: ${modelName}`);
        return {
            summary: data.summary,
            classification: data.sentiment as SentimentClassification,
        };
    } catch (error: any) {
        console.error(`[AI CRITICAL FAILURE] Model ${modelName} failed:`, error.message);
        const summary = "Automated sentiment analysis encountered an error. Please read individual reviews below.";
        const classification: SentimentClassification = "Mixed";
        return { summary, classification };
    }
}
