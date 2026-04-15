import { useNavigate } from "react-router-dom";
import { MovieListView } from "../components/MovieListView";
import { useLists } from "../context/ListsContext";
import { useSavedMovies } from "../hooks/useSavedMovies";

export function FavoritesPage() {
  const { favorites, removeFavorite } = useLists();
  const navigate = useNavigate();
  const { movies, loading, error } = useSavedMovies(favorites);

  return (
    <main className="page">
      {loading && <p className="empty-state">Loading favorites...</p>}
      {error && <p className="error-text">{error}</p>}

      <MovieListView
        title="Favorites"
        movies={movies}
        emptyMessage="You have no favorites yet."
        onMovieSelect={(id) => navigate(`/movie/${id}`)}
        onRemoveMovie={removeFavorite}
      />
    </main>
  );
}