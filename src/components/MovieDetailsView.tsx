import type { MovieDetails } from "../types/tmdb";

type Props = {
  movie: MovieDetails;
  isFavorite: boolean;
  isWatchlist: boolean;
  onToggleFavorite: () => void;
  onToggleWatchlist: () => void;
};

export function MovieDetailsView({
  movie,
  isFavorite,
  isWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
}: Props) {
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null;

  const backdropUrl = movie.backdropPath
    ? `https://image.tmdb.org/t/p/w1280${movie.backdropPath}`
    : null;

  const score =
    typeof movie.voteAverage === "number" ? movie.voteAverage.toFixed(1) : "N/A";

  return (
    <article className="cinematic-details">
      <section
        className="cinematic-hero"
        style={
          backdropUrl
            ? { backgroundImage: `url(${backdropUrl})` }
            : undefined
        }
      >
        <div className="cinematic-hero-overlay" />

        <div className="cinematic-hero-content">
          <div className="cinematic-poster-card">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} />
            ) : (
              <div className="poster placeholder large">No poster</div>
            )}
          </div>

          <div className="cinematic-hero-text">
            <p className="cinematic-eyebrow">Movie Details</p>
            <h2>{movie.title}</h2>

            <div className="cinematic-meta-row">
              <span>{movie.releaseYear}</span>
              <span>{movie.rating ?? "Not rated"}</span>
              <span>⭐ {score}</span>
              <span>{movie.runtime ?? "N/A"} min</span>
            </div>

            {movie.director && (
              <p className="cinematic-director">
                <strong>Director:</strong> {movie.director.name}
              </p>
            )}

            <p className="cinematic-overview">{movie.overview}</p>

            <div className="action-row">
              <button className="secondary-button" onClick={onToggleFavorite}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </button>
              <button className="secondary-button" onClick={onToggleWatchlist}>
                {isWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {movie.trailerEmbedUrl && (
        <section className="cinematic-panel trailer-section">
          <div className="cinematic-section">
            <h3>Trailer</h3>
            <div className="trailer-embed">
              <iframe
                src={movie.trailerEmbedUrl}
                title={`${movie.title} trailer`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      <section className="cinematic-panel">
        <div className="cinematic-section">
          <h3>Genres</h3>
          <div className="genre-row">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-pill">
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <div className="cinematic-section">
          <h3>Cast</h3>
          <div className="cast-grid">
            {movie.cast.map((person) => (
              <div key={person.id} className="cast-card">
                <strong>{person.name}</strong>
                <span>{person.character}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}