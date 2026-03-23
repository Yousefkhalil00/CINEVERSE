"use client";

import Link from "next/link";
import { getPoster } from "@/lib/api";
import Image from "next/image";
import { Movie } from "@/lib/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = getPoster(movie.poster_path);
  const year = (movie.release_date || "").slice(0, 4);
  const rating = movie.vote_average?.toFixed(1);

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="flex-none w-40 group cursor-pointer">
        <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-[#161b24]">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:-translate-y-1 transition-transform duration-200"
              width={100}
              height={150}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-[#8892a4]">
              No Image
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-black/80 rounded px-2 py-0.5 text-xs font-semibold text-[#c9a84c]">
            ★ {rating}
          </div>
        </div>

        <div className="mt-2 px-0.5">
          <p className="text-sm font-medium text-[#e8eaf0] truncate leading-snug">
            {movie.title}
          </p>
          <p className="text-xs text-[#8892a4] mt-0.5">{year}</p>
        </div>
      </div>
    </Link>
  );
}
