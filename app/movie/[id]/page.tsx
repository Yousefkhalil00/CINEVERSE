import {
  getMovieDetails,
  getMovieVideos,
  getBackdrop,
  getPoster,
} from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const [{ data: movie }, { data: videosData }] = await Promise.all([
      getMovieDetails(id),
      getMovieVideos(id),
    ]);

    if (!movie) {
      return notFound();
    }

    const backdrop = getBackdrop(movie.backdrop_path);
    const poster = getPoster(movie.poster_path);
    const year = (movie.release_date || "").slice(0, 4);
    const rating = movie.vote_average?.toFixed(1);

    const trailer = videosData.results.find(
      (vid: { site: string; type: string; key: string }) => vid.site === "YouTube" && vid.type === "Trailer",
    );

    return (
      <main className="w-full min-h-screen bg-[#080a0e] pb-20">
        <div className="relative h-[400px] md:h-[600px] w-full">
          {backdrop && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backdrop})` }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#080a0e] via-[#080a0e]/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#080a0e]/90 via-[#080a0e]/50 to-transparent" />

          <div className="absolute inset-0 mx-auto w-full lg:w-[80%] container px-4 sm:px-6 lg:px-0 flex items-end pb-12">
            <div className="flex flex-col md:flex-row gap-8 items-end w-full">
              {poster && (
                <div className="hidden md:block shrink-0 w-48 rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl">
                  <Image
                    src={poster}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="flex-1 max-w-3xl">
                <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl leading-none tracking-wide text-[#e8eaf0] mb-3">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#8892a4] font-medium mb-6">
                  <span className="flex items-center gap-1.5 text-[#c9a84c] bg-[#c9a84c]/10 px-2.5 py-1 rounded">
                    ★ <span className="text-[#e8eaf0]">{rating}</span>
                  </span>
                  <span>{year}</span>
                  <span>{movie.runtime} min</span>
                  <span className="uppercase border border-white/20 px-1.5 py-0.5 rounded text-xs">
                    {movie.original_language}
                  </span>

                  {movie.genres && (
                    <div className="flex gap-2 ml-auto md:ml-4">
                      {movie.genres.slice(0, 3).map((g: { id: number; name: string }) => (
                        <span key={g.id} className="text-xs text-[#b0b8c8]">
                          {g.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full lg:w-[80%] container px-4 sm:px-6 lg:px-0 mt-8 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-1">
              <div className="mb-8">
                <h2 className="text-[#c9a84c] font-['Barlow_Condensed'] uppercase tracking-widest text-lg font-bold mb-4">
                  Storyline
                </h2>
                <p className="text-[#b0b8c8] text-base leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <h3 className="text-[#8892a4] text-xs uppercase tracking-wider mb-1">
                    Release Date
                  </h3>
                  <p className="text-[#e8eaf0] text-sm font-medium">
                    {movie.release_date}
                  </p>
                </div>
                <div>
                  <h3 className="text-[#8892a4] text-xs uppercase tracking-wider mb-1">
                    Status
                  </h3>
                  <p className="text-[#e8eaf0] text-sm font-medium">
                    {movie.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-[#c9a84c] font-['Barlow_Condensed'] uppercase tracking-widest text-lg font-bold mb-4">
                Official Trailer
              </h2>
              {trailer ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/5 shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <p className="text-[#8892a4]">
                    No official trailer available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
