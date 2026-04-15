🎬 Movie Finder App
Project Description

Movie Finder is a single-page web application built with React and TypeScript that allows users to search for movies, view detailed information, and manage personal lists such as favorites and a watchlist.

The app integrates with The Movie Database (TMDb) API to fetch real-time movie data, including titles, ratings, cast, genres, and trailers. Users can explore popular movies, search for specific titles, and save movies locally for later viewing.

Live Application

(Add your deployed link here — Vercel / Netlify / GitHub Pages)

How to Use the App
- Searching for Movies
Use the search bar on the homepage to find movies by title
Results update automatically after submitting your search
- Viewing Movie Details
Click on any movie card to open the details page
View:
Overview
Rating and runtime
Genres
Cast and director
Embedded trailer
- Favorites
Click “Add to favorites” on a movie page
View all favorites by navigating to the Favorites page
Remove movies directly from the list
- Watchlist
Click “Add to watchlist” on a movie page
View all saved movies in the Watchlist page
Remove movies when you’re done with them
- Persistence
Your favorites and watchlist are saved automatically using localStorage
Data will remain even after refreshing or revisiting the app
API Used and Data Handling
API

This project uses the TMDb (The Movie Database) API:

Base URL: https://api.themoviedb.org/3
Authentication: Bearer token stored securely in environment variables
Data Handling
API calls are centralized in src/api/tmdb.ts
Data is transformed into strongly typed TypeScript interfaces:
MovieSummary
MovieDetails
CastMember, Director
Custom hooks manage API interactions:
useMovieSearch
usePopularMovies
useMovieDetails
Loading and error states are handled for all requests
Additional Features Implemented
Custom Hooks for reusable data fetching logic
Debounced Search to reduce unnecessary API calls
URL-based Search State for better navigation and shareable queries
Embedded YouTube Trailers within the movie details page
Persistent Favorites & Watchlist using localStorage
Reusable Components for clean project structure
Responsive Design for mobile and desktop use
Error Handling for API failures
Technologies Used
React (Functional Components + Hooks)
TypeScript
React Router
Vite
TMDb API
CSS (custom global styling)
Future Improvements
Add pagination or infinite scrolling
Filter movies by genre or rating
Improve accessibility (keyboard navigation, ARIA)
Add user authentication
Refactor styling to CSS modules or Tailwind
