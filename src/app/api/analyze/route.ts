import { NextRequest, NextResponse } from "next/server";
import { fetchMovieById } from "@/lib/omdb";
import { fetchReviewsByTitle, getMovieDetailsByImdbId } from "@/lib/tmdb";
import { generateSentimentAnalysis } from "@/lib/ai";
import { AnalysisResponse } from "@/types";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Search query is required." }, { status: 400 });
    }


    try {
        // 1. Fetch Movie Metadata & Details (TMDb)
        const movie = await fetchMovieById(id);
        if (!movie) {
            return NextResponse.json({ error: "Movie not found. Please verify the IMDb ID." }, { status: 404 });
        }

        // 2. Fetch Audience Reviews (TMDb)
        const reviews = await fetchReviewsByTitle(movie.title, movie.year);

        // 3. AI Sentiment Analysis
        const sentiment = await generateSentimentAnalysis(reviews);


        const response: AnalysisResponse = {
            movie,
            sentiment: {
                summary: sentiment.summary,
                classification: sentiment.classification,
            },
            reviews: reviews.slice(0, 10), // Limit reviews returned to frontend
        };

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("Analysis API Error:", error);
        return NextResponse.json(
            { error: error?.message || "Internal server error during movie analysis." },
            { status: 500 }
        );
    }
}
