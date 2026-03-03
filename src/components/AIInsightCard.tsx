import { AISentiment } from "@/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AIInsightCardProps {
    sentiment: AISentiment;
}

export default function AIInsightCard({ sentiment }: AIInsightCardProps) {
    const isPositive = sentiment.classification === "Positive";
    const isNegative = sentiment.classification === "Negative";
    const isMixed = sentiment.classification === "Mixed";

    const BadgeIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

    const colorClasses = isPositive
        ? {
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            text: "text-emerald-400",
            badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            glow: "from-emerald-500/10 to-transparent"
        }
        : isNegative
            ? {
                bg: "bg-rose-500/10",
                border: "border-rose-500/20",
                text: "text-rose-400",
                badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
                glow: "from-rose-500/10 to-transparent"
            }
            : {
                bg: "bg-yellow-500/5",
                border: "border-yellow-500/20",
                text: "text-yellow-400",
                badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                glow: "from-yellow-500/10 to-transparent"
            };

    return (
        <div className={`relative overflow-hidden rounded-[2.5rem] p-1 border border-white/5 bg-zinc-900/40 backdrop-blur-3xl shadow-2xl transition-all duration-700 group cursor-default`}>
            <div className={`absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br ${colorClasses.glow} blur-[120px] rounded-full transition-all duration-700 opacity-30`} />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-12 p-10 md:p-16">
                <div className={`flex items-center justify-center p-10 rounded-full border-2 border-white/5 bg-black shadow-2xl transition-all duration-500 group-hover:scale-105`}>
                    <BadgeIcon size={72} className={colorClasses.text} strokeWidth={1.5} />
                </div>

                <div className="flex-1 space-y-8">
                    <div className="flex flex-wrap items-center gap-6">
                        <h2 className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.4em]">Intelligence Report</h2>
                        <span className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${colorClasses.badge} shadow-2xl`}>
                            {sentiment.classification}
                        </span>
                    </div>

                    <div className="relative">
                        <p className="text-zinc-100 text-3xl md:text-5xl font-bold leading-[1.15] tracking-tighter italic">
                            &quot;{sentiment.summary}&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
