import { useEffect, useState } from "react";
import { searchMovies } from "../api/tmdb";
import type { MovieSummary } from "../types/tmdb";

export function useMovieSearch(query: string) {
    const [results, setResults] = useState<MovieSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let ignore = false;

        async function run() {
            const cleaned = query.trim();

            if (!cleaned) {
                setResults([]);
                setError("");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            try {
                const movies = await searchMovies(cleaned);
                if (!ignore) setResults(movies);
            } catch (err) {
                if (!ignore) {
                    setError(err instanceof Error ? err.message : "Search failed");
                    setResults([]);
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        const timer = window.setTimeout(run, 300);

        return () => {
            ignore = true;
            window.clearTimeout(timer);
        };
    }, [query]);

    return { results, loading, error };
}