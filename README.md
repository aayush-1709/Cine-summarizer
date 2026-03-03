# AI Movie Insight Builder 🚀

A premium full-stack web application that analyzes audience sentiment for movies using AI. Powered by **Next.js 14**, **OMDb**, **TMDb**, and **Gemini AI**.

![Design Preview](https://github.com/user-attachments/assets/5c6b9b3e-3f5f-4a6c-9a8a-e69eeb498528) <!-- Placeholder for preview -->

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Premium Dark Mode UI)
- **AI Engine:** Google Gemini (Flash 2.5)
- **Data Sources:** TMDb API (Primary Metadata & Reviews)
- **Animations:** Framer Motion & CSS Glow Transitions
- **Icons:** Lucide React
- **Testing:** Jest & ts-jest

## ✨ Features

- **Deep AI Analysis:** Summarizes audience sentiment into 5-6 concise lines using actual reviews.
- **Dynamic Theming:** UI colors (badges, glows, borders) automatically shift based on sentiment:
  - 🟢 **Positive:** Emerald
  - 🟡 **Mixed:** Amber
  - 🔴 **Negative:** Rose
- **Validation:** Strict IMDb ID validation (starts with "tt").
- **Recent Searches:** LocalStorage integration to resume previous analyses quickly.
- **Responsive Design:** Mobile-first architecture with premium skeleton states.

## 🚀 Setup & Installation

### 1. External API Keys
You will need API keys from:
- [OMDb API](https://www.omdbapi.com/apikey.aspx) (Metadata)
- [TMDb API](https://www.themoviedb.org/documentation/api) (Reviews)
- [Google AI Studio](https://ai.google.dev/) (Gemini AI)

### 2. Environment Setup
Create a `.env.local` file in the root:
```env
OMDB_API_KEY=your_omdb_key
TMDB_API_KEY=your_tmdb_key
GEMINI_API_KEY=your_gemini_key
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## 🧠 Technical Decisions

- **TMDb for Reviews:** Since IMDb scraping is restricted and they lack a direct public review API, I used TMDb's verified movie review endpoint, matching by title and year.
- **AI Prompting:** Used a strict JSON-output prompt with Gemini to ensure frontend stability and ease of parsing.
- **Sentiment Meter:** Created a dynamic badge system that acts as a visual status indicator for the movie's reception.
- **Performance:** Implemented skeleton loaders and `AnimatePresence` to handle the asynchronous nature of 2 API fetches followed by an LLM call.

## 🛡 Error Handling

- **Invalid IMDb ID:** Frontend prevents submission if the pattern doesn't match "tt*".
- **Movie Not Found:** Graceful 404 handling if OMDb returns no results.
- **AI Fallback:** If the LLM returns invalid JSON or fails, the app provides a generic "Mixed" sentiment with a helpful message instead of crashing.

---
Built with ⚡ by Antigravity AI Engine
