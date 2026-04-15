import { useEffect, useMemo, useState, type SubmitEventHandler } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { SearchBar } from "../components/SearchBar";
import { MovieGrid } from "../components/MovieGrid";

export function HomePage() {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const submittedQuery = searchParams.get("q") ?? "";

  const { results: searchedMovies, loading: searchLoading, error: searchError } =
    useMovieSearch(submittedQuery);

  const {
    results: popularMovies,
    loading: popularLoading,
    error: popularError,
  } = usePopularMovies();

  const showingSearch = submittedQuery.trim().length > 0;

  const visibleMovies = useMemo(
    () => (showingSearch ? searchedMovies : popularMovies),
    [showingSearch, searchedMovies, popularMovies]
  );

  const loading = showingSearch ? searchLoading : popularLoading;
  const error = showingSearch ? searchError : popularError;

  useEffect(() => {
    setInput(submittedQuery);
  }, [submittedQuery]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    setSearchParams(trimmed ? { q: trimmed } : {});
  };

  return (
    <main className="page">
      <header className="hero">
        <h1>Movie Finder</h1>
        <p>Find your next watch and new favorite movie!</p>

        <SearchBar
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          placeholder="Search by title..."
        />
      </header>

      {error && <p className="error-text">{error}</p>}
      {loading && <p className="empty-state">Loading...</p>}

      <section>
        <h2>{showingSearch ? "Search results" : "Popular movies"}</h2>
        <MovieGrid
          movies={visibleMovies}
          onSelect={(movieId) => navigate(`/movie/${movieId}`)}
          emptyMessage={
            showingSearch ? "No results yet." : "No popular movies loaded."
          }
        />
      </section>
    </main>
  );
}