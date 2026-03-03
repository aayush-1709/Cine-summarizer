"use client";

import { useState, useEffect } from "react";
import MovieSearch from "@/components/MovieSearch";
import MovieInfo from "@/components/MovieInfo";
import AIInsightCard from "@/components/AIInsightCard";
import ReviewList from "@/components/ReviewList";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { AnalysisResponse } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Film } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("movie_searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  const handleSearch = async (id: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/analyze?id=${id}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Error ${res.status}: Failed to analyze movie.`);
      }
      const result = await res.json();
      setData(result);

      const updated = [id, ...recentSearches.filter(s => s !== id)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("movie_searches", JSON.stringify(updated));
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-yellow-400/30 selection:text-white">
      <Navbar />

      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 relative z-10">
        {/* Search Section */}
        <MovieSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* Recent Searches (Creative Addition) */}
        <AnimatePresence>
          {recentSearches.length > 0 && !data && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 mb-20"
            >
              <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">Quick Resume</span>
              <div className="flex flex-wrap justify-center gap-3">
                {recentSearches.map(id => (
                  <button
                    key={id}
                    onClick={() => handleSearch(id)}
                    className="px-6 py-2 bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 text-zinc-400 hover:text-white rounded-2xl text-[11px] font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              <LoadingSkeleton />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto flex items-center gap-6 bg-rose-500/5 border border-rose-500/10 p-8 rounded-3xl text-rose-400 mb-20 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0">
                <AlertCircle size={24} />
              </div>
              <p className="font-bold text-lg tracking-tight">{error}</p>
            </motion.div>
          )}

          {data && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <MovieInfo movie={data.movie} />

              {/* AI Insight Section */}
              <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="h-px bg-white/5 w-full mb-16 shadow-[0_0_50px_rgba(255,255,255,0.05)]" />
                <AIInsightCard sentiment={data.sentiment} />
                <div className="mt-20">
                  <ReviewList reviews={data.reviews} />
                </div>
              </div>
            </motion.div>
          )}

          {!data && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center h-[20rem] opacity-20">
              <Film size={64} className="text-zinc-700 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Ready for Search</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
