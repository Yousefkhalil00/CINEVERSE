"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { searchMovies, getPoster } from "@/lib/api";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      setIsSearching(false);
      return;
    }

    setShowDropdown(true);
    setIsSearching(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data } = await searchMovies(query);
        setResults(data.results.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#080a0e]/95 backdrop-blur-md border-b border-white/10">
      <div className="w-[80%] mx-auto h-16 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold font-['Bebas_Neue'] tracking-wide text-[#c9a84c] group-hover:text-[#f0c96a] transition-colors">
            CINEVERSE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink
            href="/movies/popular"
            active={pathname === "/movies/popular"}
          >
            Popular
          </NavLink>
          <NavLink
            href="/movies/top-rated"
            active={pathname === "/movies/top-rated"}
          >
            Top Rated
          </NavLink>
          <NavLink
            href="/movies/now-playing"
            active={pathname === "/movies/now-playing"}
          >
            Now Playing
          </NavLink>
        </nav>

        <div className="hidden md:block relative" ref={searchRef}>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  if (query.trim()) setShowDropdown(true);
                }}
                placeholder="Search movies..."
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm text-[#e8eaf0] w-64 focus:outline-none focus:border-[#c9a84c] focus:bg-white/10 transition-all placeholder-[#8892a4]"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892a4] hover:text-[#c9a84c] transition-colors"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-[#12161f] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {isSearching ? (
                <div className="p-4 text-center text-sm text-[#8892a4]">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div>
                  <div className="py-2">
                    {results.map((movie) => {
                      const poster = getPoster(movie.poster_path, "w92");
                      const year = (movie.release_date || "").slice(0, 4);

                      return (
                        <Link
                          key={movie.id}
                          href={`/movie/${movie.id}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setQuery("");
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-8 h-12 bg-[#1b212c] rounded overflow-hidden shrink-0 flex items-center justify-center">
                            {poster ? (
                              <Image
                                src={poster}
                                alt={movie.title}
                                width={32}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <svg className="w-4 h-4 text-[#8892a4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#e8eaf0] truncate group-hover:text-[#c9a84c] transition-colors">
                              {movie.title}
                            </p>
                            <p className="text-xs text-[#8892a4] flex items-center gap-1.5">
                              {year}
                              {movie.vote_average > 0 && (
                                <span className="text-[#c9a84c]">
                                  ★ {movie.vote_average.toFixed(1)}
                                </span>
                              )}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="border-t border-white/5 bg-[#0a0c10]">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
                    >
                      View all results
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-[#8892a4]">
                  No movies found.
                </div>
              )}
            </div>
          )}
        </div>

        <button className="md:hidden text-[#8892a4] hover:text-[#c9a84c] transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold tracking-widest uppercase transition-colors ${
        active ? "text-[#c9a84c]" : "text-[#8892a4] hover:text-[#e8eaf0]"
      }`}
    >
      {children}
    </Link>
  );
}
