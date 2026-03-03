import { Film, Globe, AtSign } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/5 py-12 px-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Film size={18} className="text-zinc-500" />
                        <span className="text-sm font-bold text-zinc-400">CineSummarize</span>
                    </div>
                    <span className="text-xs text-zinc-600 font-medium">© 2026 Movie Summary Engine</span>
                </div>

                <div className="flex items-center gap-8">
                    <a href="#" className="text-[11px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors uppercase tracking-widest">Privacy Policy</a>
                    <a href="#" className="text-[11px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors uppercase tracking-widest">Terms of Service</a>
                    <a href="#" className="text-[11px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors uppercase tracking-widest">API Docs</a>
                </div>

                <div className="flex items-center gap-4 text-zinc-600">
                    <Globe size={18} className="hover:text-white transition-colors cursor-pointer" />
                    <AtSign size={18} className="hover:text-white transition-colors cursor-pointer" />
                </div>
            </div>
        </footer>
    );
}
