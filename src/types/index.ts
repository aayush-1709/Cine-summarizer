export interface CastMember {
    name: string;
    role: string;
    image: string;
}

export interface MovieMetadata {
    title: string;
    year: string;
    poster: string;
    rating: string;
    genre: string;
    actors: string;
    plot: string;
    imdbID: string;
    runtime: string;
    tagline: string;
    releaseDate: string;
    language: string;
    director: string;
    cast: CastMember[];
    trailerUrl?: string;
}

export interface Review {
    author: string;
    content: string;
    url?: string;
}

export type SentimentClassification = "Positive" | "Mixed" | "Negative";

export interface AISentiment {
    summary: string;
    classification: SentimentClassification;
}

export interface AnalysisResponse {
    movie: MovieMetadata;
    sentiment: AISentiment;
    reviews: Review[];
}
