import { useNavigate } from "react-router-dom";
import { MovieListView } from "../components/MovieListView";
import { useLists } from "../context/ListsContext";
import { useSavedMovies } from "../hooks/useSavedMovies";

export function WatchlistPage() {
  const { watchlist, removeWatchlist } = useLists();
  const navigate = useNavigate();
  const { movies, loading, error } = useSavedMovies(watchlist);

  return (
    <main className="page">
      {loading && <p className="empty-state">Loading watchlist...</p>}
      {error && <p className="error-text">{error}</p>}

      <MovieListView
        title="Watchlist"
        movies={movies}
        emptyMessage="Your watchlist is empty."
        onMovieSelect={(movieId) => navigate(`/movie/${movieId}`)}
        onRemoveMovie={removeWatchlist}
      />
    </main>
  );
}