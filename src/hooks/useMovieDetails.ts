import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";
import type { MovieDetails } from "../types/tmdb";

export function useMovieDetails(movieId: number | null) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function run() {
      if (!movieId) {
        setMovie(null);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const details = await getMovieDetails(movieId);
        if (!ignore) setMovie(details);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load movie details");
          setMovie(null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    run();

    return () => {
      ignore = true;
    };
  }, [movieId]);

  return { movie, loading, error };
}