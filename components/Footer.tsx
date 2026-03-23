import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080a0e] border-t border-white/5 py-10 mt-auto">
      <div className="mx-auto w-[80%] container px-4 sm:px-6 lg:px-0 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold font-['Bebas_Neue'] tracking-wide text-[#c9a84c] group-hover:text-[#f0c96a] transition-colors">
              CINEVERSE
            </span>
          </Link>
          <p className="text-[#8892a4] text-sm">
            &copy; {currentYear} Cineverse. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 text-right">
          <p className="text-[#8892a4] text-xs max-w-xs">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
          <a 
            href="https://www.themoviedb.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity block"
          >
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="Powered by TMDB"
              className="h-4 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
