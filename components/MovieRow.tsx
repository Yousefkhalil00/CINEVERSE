import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
  return (
    <section className="mx-auto lg:w-[80%] container px-4 sm:px-6 lg:px-0 py-8">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-0.5 h-5 bg-[#c9a84c] rounded" />
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-widest font-normal text-[#e8eaf0]">
          {title}
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-10 movie-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
