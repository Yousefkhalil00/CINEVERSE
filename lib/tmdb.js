import axios from "axios";

const tmdb = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
});

export default tmdb;
