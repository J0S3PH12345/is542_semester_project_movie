import { useNavigate, useParams } from "react-router-dom";
import { MovieDetailsView } from "../components/MovieDetailsView";
import { useLists } from "../context/ListsContext";
import { useMovieDetails } from "../hooks/useMovieDetails";

export function DetailsPage() {
  const { movieId } = useParams();
  const id = movieId ? Number(movieId) : null;
  const movieIdForQuery = Number.isFinite(id) ? id : null;
  const navigate = useNavigate();

  const { movie, loading, error } = useMovieDetails(movieIdForQuery);
  const { isFavorite, isWatchlist, toggleFavorite, toggleWatchlist } = useLists();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <main className="page">
        <p className="empty-state">Loading details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <button className="back-link" onClick={handleBack}>
          ← Back
        </button>
        <p className="error-text">{error}</p>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="page">
        <button className="back-link" onClick={handleBack}>
          ← Back
        </button>
        <p className="empty-state">Movie not found.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <button className="back-link" onClick={handleBack}>
        ← Back
      </button>

      <MovieDetailsView
        movie={movie}
        isFavorite={isFavorite(movie.id)}
        isWatchlist={isWatchlist(movie.id)}
        onToggleFavorite={() => toggleFavorite(movie.id)}
        onToggleWatchlist={() => toggleWatchlist(movie.id)}
      />
    </main>
  );
}