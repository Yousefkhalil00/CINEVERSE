import tmdb from "./tmdb";

const IMG = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;

export const getPoster = (path, size = "w500") =>
  path ? `${IMG}/${size}${path}` : null;

export const getBackdrop = (path, size = "original") =>
  path ? `${IMG}/${size}${path}` : null;

export const getTrending = (timeWindow = "day") =>
  tmdb.get(`/trending/movie/${timeWindow}`);

export const getPopular = () => tmdb.get("/movie/popular");

export const getTopRated = () => tmdb.get("/movie/top_rated");

export const getNowPlaying = () => tmdb.get("/movie/now_playing");

export const getMovieDetails = (id) => tmdb.get(`/movie/${id}`);

export const getMovieCredits = (id) => tmdb.get(`/movie/${id}/credits`);

export const getMovieVideos = (id) => tmdb.get(`/movie/${id}/videos`);

export const getGenres = () => tmdb.get("/genre/movie/list");

export const searchMovies = (query) =>
  tmdb.get("/search/movie", { params: { query } });

export const discoverByGenre = (genreId) =>
  tmdb.get("/discover/movie", {
    params: { with_genres: genreId, sort_by: "popularity.desc" },
  });
