"use client";

import { useState } from "react";
import { Search, Loader2, Zap } from "lucide-react";

interface MovieSearchProps {
    onSearch: (id: string) => void;
    isLoading: boolean;
}

export default function MovieSearch({ onSearch, isLoading }: MovieSearchProps) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) {
            setError("Required: Please enter a movie title or ID.");
            return;
        }

        onSearch(query.trim());
    };

    const handleTagClick = (tagId: string) => {
        setQuery(tagId);
        onSearch(tagId);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-16 px-4">
            <div className="text-center mb-10 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white transition-all duration-300">
                    Instant Movie Insights
                </h1>
                <p className="text-zinc-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
                    Enter a Movie ID from IMDb or TMDb to fetch comprehensive details, cast, and summaries.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden focus-within:ring-2 ring-yellow-400/30 focus-within:border-yellow-400 shadow-2xl transition-all duration-500 p-1.5 pr-2">
                    <div className="pl-6 text-zinc-500">
                        <Search size={22} strokeWidth={2.5} />
                    </div>
                    <input
                        id="imdbId"
                        type="text"
                        placeholder="Enter Movie Title or ID (e.g., Inception or tt0111161)"
                        className="flex-1 bg-transparent py-4 px-6 text-white outline-none placeholder:text-zinc-600 text-lg font-medium"
                        value={query}
                        onFocus={() => setError("")}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl transition-all active:scale-[0.98] flex items-center gap-3 shadow-lg shadow-yellow-400/10 min-w-[200px] justify-center"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <Zap size={20} fill="currentColor" />
                                <span>Fetch Details</span>
                            </>
                        )}
                    </button>
                </div>
                {error && (
                    <p className="mt-3 ml-2 text-rose-500 text-sm font-bold flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose-500" />
                        {error}
                    </p>
                )}
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mr-2">Popular:</span>
                {[
                    { name: "Inception", id: "tt1375666" },
                    { name: "The Dark Knight", id: "tt0468569" },
                    { name: "Interstellar", id: "tt0816692" }
                ].map((movie) => (
                    <button
                        key={movie.id}
                        onClick={() => handleTagClick(movie.id)}
                        className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                        {movie.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
