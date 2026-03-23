"use client";

import { getBackdrop } from "@/lib/api";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Movie } from "@/lib/types";

export default function Hero({ movies }: { movies: Movie[] }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mx-auto w-full px-4 sm:px-6 lg:px-0 mt-6 overflow-hidden rounded-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-[520px] hero-swiper"
      >
        {movies.map((movie: Movie) => {
          const backdrop = getBackdrop(movie.backdrop_path);
          const year = (movie.release_date || "").slice(0, 4);
          const rating = movie.vote_average?.toFixed(1);

          return (
            <SwiperSlide key={movie.id}>
              <div className="relative h-full overflow-hidden flex items-end">
                {backdrop && (
                  <div
                    className="absolute inset-0 bg-cover bg-top"
                    style={{ backgroundImage: `url(${backdrop})` }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-[#080a0e]/95 via-[#080a0e]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e] via-transparent to-transparent" />

                <div className="relative z-10 p-10 max-w-xl items-start justify-between flex ml-10 flex-col">
                  <div className="inline-flex items-center gap-1.5 bg-[#c9a84c]/15 border  border-[#c9a84c]/35 rounded-full px-3.5 py-1 text-[11px] tracking-widest uppercase text-[#c9a84c] mb-4">
                    ★ Featured
                  </div>

                  <h1 className="font-['Bebas_Neue'] text-6xl leading-none tracking-wide mb-3 text-[#e8eaf0]">
                    {movie.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-[#8892a4] mb-4">
                    <span className="text-[#c9a84c] font-semibold">
                      ★ {rating}
                    </span>
                    <span>{year}</span>
                    <span>{movie.original_language?.toUpperCase()}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-[#b0b8c8] mb-6 line-clamp-3">
                    {movie.overview}
                  </p>

                  <Link href={`/movie/${movie.id}`}>
                    <button className="bg-[#c9a84c] hover:bg-[#f0c96a] text-[#080a0e] font-['Barlow_Condensed'] font-bold text-sm tracking-widest uppercase px-8 py-3 rounded transition-colors duration-200">
                      More Info
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
