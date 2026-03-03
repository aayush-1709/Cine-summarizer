import { Review } from "@/types";

export async function getMovieDetailsByImdbId(imdbId: string) {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) throw new Error("TMDB_API_KEY is not defined");

    // 1. Get TMDb ID from IMDb ID
    const findRes = await fetch(`https://api.themoviedb.org/3/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`);
    if (!findRes.ok) return null;
    const findData = await findRes.json();

    const movie = findData.movie_results?.[0];
    if (!movie) return null;

    const tmdbId = movie.id;

    // 2. Get Credits and Videos
    const detailsRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&append_to_response=credits,videos`);
    if (!detailsRes.ok) return null;
    const details = await detailsRes.json();

    const cast = (details.credits?.cast || []).slice(0, 5).map((member: any) => ({
        name: member.name,
        role: member.character,
        image: member.profile_path ? `https://image.tmdb.org/t/p/w185${member.profile_path}` : "",
    }));

    const director = details.credits?.crew?.find((c: any) => c.job === "Director")?.name || "";

    // Add director to cast list if space or as a separate entity as requested by UI
    const trailer = details.videos?.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
    const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "";

    return {
        cast,
        director,
        tagline: details.tagline,
        trailerUrl,
    };
}

export async function fetchReviewsByTitle(title: string, year?: string): Promise<Review[]> {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) throw new Error("TMDB_API_KEY is not defined");

    // Step 1: Search movie
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
    if (year) {
        const y = year.split("–")[0].trim(); // Handle year ranges like 1999–2003
        searchUrl += `&year=${y}`;
    }

    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) {
        console.error(`TMDb Search API error: ${searchRes.statusText}`);
        return [];
    }
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) return [];

    const tmdbId = searchData.results[0].id;

    // Step 2: Get reviews
    const reviewsRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/reviews?api_key=${apiKey}`);
    if (!reviewsRes.ok) {
        console.error(`TMDb Reviews API error: ${reviewsRes.statusText}`);
        return [];
    }
    const reviewsData = await reviewsRes.json();

    return (reviewsData.results || []).map((r: any) => ({
        author: r.author,
        content: r.content,
        url: r.url,
    }));
}
