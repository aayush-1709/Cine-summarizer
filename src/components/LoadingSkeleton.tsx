export default function LoadingSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 animate-pulse mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
                {/* Sidebar Skeleton */}
                <div className="space-y-8">
                    <div className="aspect-[2/3] w-full bg-zinc-900 rounded-[2rem]" />
                    <div className="h-64 bg-zinc-900/40 rounded-[2rem]" />
                </div>

                {/* Main Content Skeleton */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="h-6 w-16 bg-zinc-900 rounded-md" />
                            <div className="h-6 w-16 bg-zinc-900 rounded-md" />
                        </div>
                        <div className="h-16 w-3/4 bg-zinc-900 rounded-2xl" />
                        <div className="h-6 w-1/2 bg-zinc-900 rounded-lg" />
                    </div>

                    <div className="space-y-6">
                        <div className="h-8 w-32 bg-zinc-900 rounded-lg" />
                        <div className="h-32 w-full bg-zinc-900 rounded-3xl" />
                    </div>

                    <div className="space-y-6">
                        <div className="h-8 w-40 bg-zinc-900 rounded-lg" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="h-20 bg-zinc-900 rounded-2xl" />
                            <div className="h-20 bg-zinc-900 rounded-2xl" />
                            <div className="h-20 bg-zinc-900 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
