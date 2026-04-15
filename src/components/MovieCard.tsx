import type { MovieSummary } from "../types/tmdb";

type Props = {
  movie: MovieSummary;
  onClick: () => void;
  onRemove?: (movieId: number) => void;
};

export function MovieCard({ movie, onClick, onRemove }: Props) {
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w342${movie.posterPath}`
    : null;

  const score =
    typeof movie.voteAverage === "number" ? movie.voteAverage.toFixed(1) : "N/A";

  return (
    <div className="movie-card-shell">
      <button className="movie-card" type="button" onClick={onClick}>
        <div className="movie-card-poster">
          {posterUrl ? (
            <img
              className="movie-card-image"
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
            />
          ) : (
            <div className="movie-card-placeholder">
              <span>No poster</span>
            </div>
          )}
          <div className="movie-card-badge">⭐ {score}</div>
        </div>

        <div className="movie-card-body">
          <h3 className="movie-card-title">{movie.title}</h3>
          <p className="movie-card-year">{movie.releaseYear}</p>
        </div>
      </button>

      {onRemove && (
        <button
          type="button"
          className="remove-list-button"
          onClick={() => onRemove(movie.id)}
        >
          Remove from list
        </button>
      )}
    </div>
  );
}