import type { MovieSummary } from "../types/tmdb";
import { MovieGrid } from "./MovieGrid";

type MovieListViewProps = {
  title: string;
  movies: MovieSummary[];
  emptyMessage: string;
  onMovieSelect: (movieId: number) => void
  onRemoveMovie?: (movieId: number) => void;
};

export function MovieListView({
  title,
  movies,
  emptyMessage,
  onMovieSelect,
  onRemoveMovie,
}: MovieListViewProps) {
  return (
    <section className="page">
      <div className="hero">
        <h1>{title}</h1>
        <p>{movies.length} movies</p>
      </div>

      <MovieGrid
        movies={movies}
        onSelect={onMovieSelect}
        emptyMessage={emptyMessage}
        onRemoveMovie={onRemoveMovie}
      />
    </section>
  );
}