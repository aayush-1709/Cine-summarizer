const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

async function testGemini() {
    const envFile = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
    const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.*)/);
    const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

    if (!apiKey) {
        console.error("GEMINI_API_KEY NOT FOUND");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];

    for (const modelName of models) {
        try {
            console.log(`Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say 'hello'");
            console.log(`Success with ${modelName}: ${result.response.text()}`);
            break;
        } catch (error) {
            console.error(`Failed with ${modelName}: ${error.message}`);
        }
    }
}

testGemini();
