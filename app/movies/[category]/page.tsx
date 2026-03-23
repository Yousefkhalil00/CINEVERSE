import { getPopular, getTopRated, getNowPlaying } from "@/lib/api";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { notFound } from "next/navigation";
import { Movie } from "@/lib/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  let fetcher;
  let title;

  switch (category) {
    case "popular":
      fetcher = getPopular;
      title = "Popular Movies";
      break;
    case "top-rated":
      fetcher = getTopRated;
      title = "Top Rated Movies";
      break;
    case "now-playing":
      fetcher = getNowPlaying;
      title = "Now Playing";
      break;
    default:
      notFound();
  }

  const { data: categoryData } = await fetcher();
  const { data: popularData } = await getPopular();

  const movies: Movie[] = categoryData.results;
  const popularMovies: Movie[] = popularData.results;

  return (
    <main className="pb-20">
      <Hero movies={movies.slice(0, 5)} />

      {category !== "popular" && (
        <MovieRow title="Popular Movies" movies={popularMovies} />
      )}

      <MovieRow title={title} movies={movies} />
    </main>
  );
}
