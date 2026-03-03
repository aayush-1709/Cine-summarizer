import { generateSentimentAnalysis } from "../ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Standard mock for Gemini
jest.mock("@google/generative-ai");

describe("AI Sentiment Analysis Utility", () => {
    const mockReviews = [
        { author: "John", content: "Amazing film, absolutely loved it!" },
        { author: "Jane", content: "Great acting and cinematography." },
    ];

    beforeEach(() => {
        process.env.GEMINI_API_KEY = "dummy_key";
        jest.clearAllMocks();
    });

    it("should parse AI JSON response correctly and return classification", async () => {
        // Mock successful AI response
        const mockModel = {
            generateContent: jest.fn().mockResolvedValue({
                response: {
                    text: () => JSON.stringify({
                        summary: "Audiences generally loved the movie for its acting.",
                        sentiment: "Positive"
                    })
                }
            })
        };

        (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
            getGenerativeModel: () => mockModel
        }));

        const result = await generateSentimentAnalysis(mockReviews);

        expect(result.classification).toBe("Positive");
        expect(result.summary).toContain("acting");
    });

    it("should handle empty reviews with a fallback", async () => {
        const result = await generateSentimentAnalysis([]);
        expect(result.classification).toBe("Mixed");
        expect(result.summary).toContain("No audience reviews");
    });
});
