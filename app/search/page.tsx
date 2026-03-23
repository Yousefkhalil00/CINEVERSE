import { searchMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  const { data } = await searchMovies(query);
  const movies: Movie[] = data.results;

  return (
    <main className="mx-auto lg:w-[80%] container px-4 sm:px-6 lg:px-0 py-10">
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-0.5 h-5 bg-[#c9a84c] rounded" />
        <h1 className="font-['Bebas_Neue'] text-3xl tracking-widest font-normal text-[#e8eaf0]">
          Search Results for: <span className="text-[#c9a84c]">{query}</span>
        </h1>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#8892a4] text-lg">No movies found for your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}
