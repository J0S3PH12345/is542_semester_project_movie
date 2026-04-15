import type { MovieSummary } from "../types/tmdb";
import { MovieCard } from "./MovieCard";

type Props = {
  movies: MovieSummary[];
  onSelect: (movieId: number) => void;
  emptyMessage?: string;
  onRemoveMovie?: (movieId: number) => void;
};

export function MovieGrid({
  movies,
  onSelect,
  emptyMessage = "No movies found.",
  onRemoveMovie,
}: Props) {
  if (!movies.length) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onSelect(movie.id)}
          onRemove={onRemoveMovie}
        />
      ))}
    </div>
  );
}