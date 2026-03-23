import axios from "axios";

const tmdb = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
  },
});

export default tmdb;
