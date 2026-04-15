import type { CastMember, Director, MovieDetails, MovieSummary } from "../types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

if (!TOKEN) {
    throw new Error("Missing VITE_TMDB_TOKEN in .env");
}

function hasUsefulSummaryData(movie: {
  title: string;
  posterPath: string | null;
  overview: string;
  releaseYear: string;
  voteAverage: number | null;
}) {
  return Boolean(
    movie.posterPath ||
      movie.overview.trim() ||
      movie.voteAverage !== null ||
      movie.releaseYear !== "N/A"
  );
}

async function tmdbFetch(path: string) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`TMDb request failed: ${res.status}`);
    }

    return res.json();
}

export async function searchMovies(query: string): Promise<MovieSummary[]> {
    const cleaned = query.trim();
    if (!cleaned) return [];

    const data = await tmdbFetch(
        `/search/movie?query=${encodeURIComponent(cleaned)}&include_adult=false&language=en-US&page=1`
    );

    return (data.results ?? []).map((movie: any) => ({
        id: movie.id,
        title: movie.title ?? "Untitled",
        posterPath: movie.poster_path ?? null,
        releaseYear: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
        voteAverage: typeof movie.vote_average === "number" ? movie.vote_average : null,
        overview: movie.overview ?? "",
    })).filter(hasUsefulSummaryData);
}

export async function getPopularMovies(): Promise<MovieSummary[]> {
    const data = await tmdbFetch(`/movie/popular?language=en-US&page=1`);

    return (data.results ?? []).map((movie: any) => ({
        id: movie.id,
        title: movie.title ?? "Untitled",
        posterPath: movie.poster_path ?? null,
        releaseYear: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
        voteAverage: typeof movie.vote_average === "number" ? movie.vote_average : null,
        overview: movie.overview ?? "",
    })).filter(hasUsefulSummaryData);
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
    const data = await tmdbFetch(
        `/movie/${movieId}?append_to_response=credits,videos,release_dates&language=en-US`
    );

    const cast: CastMember[] = (data.credits?.cast ?? [])
        .slice(0, 10)
        .map((person: any) => ({
            id: person.id,
            name: person.name,
            character: person.character ?? "",
            profilePath: person.profile_path ?? null,
            order: person.order ?? 0,
        }));

    const directorPerson = (data.credits?.crew ?? []).find(
        (person: any) => person.job === "Director"
    );

    const director: Director | null = directorPerson
        ? {
            id: directorPerson.id,
            name: directorPerson.name,
            profilePath: directorPerson.profile_path ?? null,
        }
        : null;

    const trailer = (data.videos?.results ?? []).find(
        (video: any) => video.site === "YouTube" && video.type === "Trailer"
);

    const usRelease = (data.release_dates?.results ?? []).find(
        (region: any) => region.iso_3166_1 === "US"
    );

    const rating =
        usRelease?.release_dates?.find((entry: any) => entry.certification)?.certification ?? null;

    return {
        id: data.id,
        title: data.title,
        overview: data.overview ?? "",
        posterPath: data.poster_path ?? null,
        backdropPath: data.backdrop_path ?? null,
        genres: data.genres ?? [],
        releaseYear: data.release_date ? data.release_date.slice(0, 4) : "N/A",
        runtime: typeof data.runtime === "number" ? data.runtime : null,
        voteAverage: typeof data.vote_average === "number" ? data.vote_average : null,
        cast,
        director,
        trailerEmbedUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
        rating,
    };
}

