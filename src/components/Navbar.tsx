"use client";

import Link from "next/link";
import { Film } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-yellow-400 text-black p-1.5 rounded-lg">
                    <Film size={20} fill="currentColor" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">CineSummarize</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-sm font-medium text-yellow-400 border-b-2 border-yellow-400 pb-1">Home</Link>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Movie Engine</span>
            </div>
        </nav>
    );
}

