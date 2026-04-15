import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb";
import type { MovieSummary } from "../types/tmdb";

export function usePopularMovies() {
  const [results, setResults] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;

    async function run() {
      setLoading(true);
      setError("");

      try {
        const movies = await getPopularMovies();
        if (!ignore) setResults(movies);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load popular movies");
          setResults([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    run();

    return () => {
      ignore = true;
    };
  }, []);

  return { results, loading, error };
}