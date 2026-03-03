import { Review } from "@/types";
import { Quote, MessageSquare } from "lucide-react";

interface ReviewListProps {
    reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-12 text-center text-zinc-500 font-bold italic shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                    <MessageSquare size={48} className="text-zinc-800" />
                    <p>No detailed audience reviews available for this title across TMDb.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in transition-all duration-700">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em]">Audience Voices</h3>
                <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-zinc-900 rounded-full border border-white/5">
                    {reviews.length} Verified Reviews
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {reviews.map((review, i) => (
                    <div
                        key={i}
                        className="group bg-zinc-900/30 border border-white/5 hover:border-yellow-400/20 p-10 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl relative"
                    >
                        <header className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center font-black text-yellow-400 text-xl shadow-inner group-hover:border-yellow-400/20 transition-all">
                                {review.author[0].toUpperCase()}
                            </div>
                            <div>
                                <h4 className="text-white font-black text-lg tracking-tight mb-0.5">{review.author}</h4>
                                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Audience Critic</p>
                            </div>
                            <div className="ml-auto text-zinc-900 group-hover:text-yellow-400/10 transition-colors duration-700">
                                <Quote size={48} strokeWidth={4} />
                            </div>
                        </header>

                        <div className="relative">
                            <p className="text-zinc-400 text-base leading-relaxed font-medium group-hover:text-zinc-300 transition-colors duration-500">
                                {review.content}
                            </p>
                        </div>

                        {review.url && (
                            <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                                <a
                                    href={review.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-yellow-400 transition-colors flex items-center gap-2"
                                >
                                    Source Review <div className="w-1 h-1 rounded-full bg-zinc-700" />
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
