import { getTrending, getTopRated, getNowPlaying, getPopular } from "@/lib/api";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";

export default async function Home() {
  const [
    { data: popular },
    { data: trending },
    { data: topRated },
    { data: nowPlaying },
  ] = await Promise.all([
    getPopular(),
    getTrending("day"),
    getTopRated(),
    getNowPlaying(),
  ]);

  return (
    <>
      <Hero movies={popular.results.slice(0, 5)} />
      <MovieRow title="Popular Movies" movies={popular.results} />
      <MovieRow title="Trending Today" movies={trending.results} />
      <MovieRow title="Top Rated" movies={topRated.results} />
      <MovieRow title="Now Playing" movies={nowPlaying.results} />
    </>
  );
}
