import { MovieMetadata } from "@/types";

export async function fetchMovieById(id: string): Promise<MovieMetadata | null> {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) throw new Error("TMDB_API_KEY is not defined in .env.local");

    try {
        let tmdbId: number | null = null;

        if (id.startsWith("tt")) {
            // Find TMDb ID using IMDb ID
            const findRes = await fetch(
                `https://api.themoviedb.org/3/find/${id}?api_key=${apiKey}&external_source=imdb_id`
            );
            if (!findRes.ok) throw new Error(`TMDb Find Error: ${findRes.status}`);
            const findData = await findRes.json();
            tmdbId = findData.movie_results?.[0]?.id || null;
        } else {
            // Search by Title
            const searchRes = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(id)}&language=en-US&page=1`
            );
            if (!searchRes.ok) throw new Error(`TMDb Search Error: ${searchRes.status}`);
            const searchData = await searchRes.json();
            tmdbId = searchData.results?.[0]?.id || null;
        }

        if (!tmdbId) {
            console.warn(`[DATA FETCH] No TMDb movie found for input: ${id}`);
            return null;
        }

        const movieRes = await fetch(
            `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`
        );

        if (!movieRes.ok) {
            throw new Error(`TMDb Movie Details Error: ${movieRes.status}`);
        }

        const data = await movieRes.json();

        // Extract trailer URL
        const trailer = data.videos?.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
        const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "";

        return {
            title: data.title,
            year: data.release_date?.split("-")[0] || "N/A",
            poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "",
            rating: data.vote_average?.toFixed(1) || "0.0",
            genre: data.genres?.map((g: any) => g.name).join(", ") || "N/A",
            actors: data.credits?.cast?.slice(0, 5).map((c: any) => c.name).join(", ") || "",
            plot: data.overview,
            imdbID: data.imdb_id || id,
            runtime: `${data.runtime} min`,
            releaseDate: data.release_date,
            language: data.spoken_languages?.[0]?.english_name || data.original_language,
            tagline: data.tagline || "",
            director: data.credits?.crew?.find((c: any) => c.job === "Director")?.name || "N/A",
            cast: data.credits?.cast?.slice(0, 6).map((c: any) => ({
                name: c.name,
                role: c.character,
                image: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null
            })) || [],
            trailerUrl,
        };
    } catch (error: any) {
        console.error("[DATA FETCH ERROR]:", error.message);
        throw new Error(`Movie data fetch failed: ${error.message}`);
    }
}
