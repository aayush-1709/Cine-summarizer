import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not defined");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        // The listModels method might not be directly on genAI in this version, 
        // usually it's a fetch to the endpoint.
        // But let's try a test call to a very common model.
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("test");
        console.log("Success with gemini-2.5-flash:", result.response.text());
    } catch (error: any) {
        console.error("Failed with gemini-1.5-flash:", error.message);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("test");
            console.log("Success with gemini-pro:", result.response.text());
        } catch (error2: any) {
            console.error("Failed with gemini-pro:", error2.message);
        }
    }
}

listModels();
