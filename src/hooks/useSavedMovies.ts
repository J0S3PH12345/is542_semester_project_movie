import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";
import type { MovieSummary } from "../types/tmdb";

export function useSavedMovies(ids: number[]) {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      if (!ids.length) {
        setMovies([]);
        setError("");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const results = await Promise.allSettled(ids.map((id) => getMovieDetails(id)));

        const summaries: MovieSummary[] = results
          .filter((result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof getMovieDetails>>> =>
            result.status === "fulfilled"
          )
          .map(({ value }) => ({
            id: value.id,
            title: value.title,
            posterPath: value.posterPath,
            releaseYear: value.releaseYear,
            voteAverage: value.voteAverage,
            overview: value.overview,
          }));

        if (!ignore) {
          setMovies(summaries);
          if (summaries.length === 0) {
            setError("Could not load your saved movies.");
          }
        }
      } catch (err) {
        if (!ignore) {
          setMovies([]);
          setError(err instanceof Error ? err.message : "Failed to load saved movies.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [ids]);

  return { movies, loading, error };
}