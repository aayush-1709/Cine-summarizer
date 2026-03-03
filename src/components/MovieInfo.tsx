import { MovieMetadata } from "@/types";
import { Star, Clock, Globe, Calendar, AlignLeft, Users, Play, Plus, Share2 } from "lucide-react";

interface MovieInfoProps {
    movie: MovieMetadata;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 max-w-7xl mx-auto px-4 py-8">
            {/* Sidebar */}
            <aside className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                <div className="relative group rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-zinc-900">
                    <div className="aspect-[2/3] w-full relative">
                        {movie.poster ? (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                <span className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No Poster Available</span>
                            </div>
                        )}

                        {/* View Trailer Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                            {movie.trailerUrl ? (
                                <a
                                    href={movie.trailerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold text-sm transition-all active:scale-95"
                                >
                                    <Play size={16} fill="currentColor" />
                                    View Trailer
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white/50 font-bold text-sm cursor-not-allowed"
                                >
                                    <Play size={16} />
                                    Trailer Unavailable
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">Quick Stats</h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between group">
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-400">IMDb Rating</span>
                            <div className="flex items-center gap-1.5">
                                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-black text-white">{movie.rating}</span>
                                <span className="text-[10px] text-zinc-600 font-bold mt-0.5">/10</span>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full" />

                        <div className="flex items-center justify-between group">
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-400">Runtime</span>
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} className="text-zinc-500" />
                                <span className="text-sm font-black text-white">{movie.runtime}</span>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full" />

                        <div className="flex items-center justify-between group">
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-400">Language</span>
                            <div className="flex items-center gap-1.5">
                                <Globe size={14} className="text-zinc-500" />
                                <span className="text-sm font-black text-white">{movie.language}</span>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full" />

                        <div className="flex items-center justify-between group">
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-400">Release Date</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-zinc-500" />
                                <span className="text-sm font-black text-white">{movie.releaseDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="space-y-12 animate-in fade-in slide-in-from-bottom duration-1000">
                {/* Header Section */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {movie.genre.split(", ").map(g => (
                            <span
                                key={g}
                                className="px-3 py-1 bg-yellow-400/10 text-yellow-500 text-[10px] font-black uppercase tracking-wider rounded-md border border-yellow-400/20"
                            >
                                {g}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-baseline gap-4">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                            {movie.title}
                        </h1>
                        <span className="text-4xl md:text-6xl font-light text-zinc-600 tracking-tighter">
                            {movie.year}
                        </span>
                    </div>

                    {movie.tagline && (
                        <p className="text-xl italic font-medium text-zinc-400 leading-relaxed">
                            &quot;{movie.tagline}&quot;
                        </p>
                    )}
                </div>

                {/* Synopsis Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 border border-white/5 bg-zinc-900 rounded-lg">
                            <AlignLeft size={16} className="text-yellow-400" />
                        </div>
                        <h3 className="text-base font-black text-white tracking-widest uppercase italic">Synopsis</h3>
                    </div>
                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                        {movie.plot}
                    </p>
                </div>

                {/* Cast & Crew Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 border border-white/5 bg-zinc-900 rounded-lg">
                            <Users size={16} className="text-yellow-400" />
                        </div>
                        <h3 className="text-base font-black text-white tracking-widest uppercase italic">Cast & Crew</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {movie.cast.map((person, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-white/5 rounded-2xl hover:bg-zinc-800/60 transition-all hover:scale-[1.02] cursor-default group"
                            >
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10 group-hover:border-yellow-400/50 transition-colors">
                                    {person.image ? (
                                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold text-xs uppercase italic tracking-tighter">
                                            {person.name[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-white tracking-tight">{person.name}</span>
                                    <span className="text-[10px] text-zinc-500 font-bold truncate max-w-[150px]">{person.role}</span>
                                </div>
                            </div>
                        ))}

                        {/* Director Card */}
                        {movie.director && (
                            <div className="flex items-center gap-4 p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl transition-all cursor-default relative overflow-hidden group">
                                <div className="absolute right-[-10px] bottom-[-10px] text-yellow-400 opacity-10 group-hover:scale-110 transition-transform">
                                    <Users size={64} />
                                </div>
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-yellow-400/30 flex items-center justify-center relative z-10">
                                    <UserPlaceholder name={movie.director} />
                                </div>
                                <div className="flex flex-col relative z-10">
                                    <span className="text-sm font-black text-yellow-400 tracking-tight">{movie.director}</span>
                                    <span className="text-[10px] text-yellow-500/60 font-black uppercase tracking-widest">Director</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-2xl shadow-xl shadow-yellow-400/10 transition-all active:scale-[0.98]">
                        <Plus size={20} strokeWidth={3} />
                        <span>Add to Watchlist</span>
                    </button>

                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-white font-black rounded-2xl backdrop-blur-md transition-all active:scale-[0.98]">
                        <Share2 size={20} strokeWidth={2.5} className="text-zinc-400" />
                        <span>Share Details</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

function UserPlaceholder({ name }: { name: string }) {
    return (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-black text-sm uppercase">
            {name[0]}
        </div>
    );
}
