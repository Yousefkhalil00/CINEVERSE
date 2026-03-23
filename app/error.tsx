"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-[#080a0e] px-4 text-center">
      <div className="w-24 h-24 mb-8 text-[#f0c96a] opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest text-[#e8eaf0] mb-4">
        SOMETHING WENT WRONG
      </h1>

      <p className="text-[#8892a4] text-lg mb-8 max-w-md">
        We encountered an unexpected error while trying to generate this page.
      </p>

      <button
        onClick={() => reset()}
        className="bg-[#c9a84c] hover:bg-[#f0c96a] text-[#080a0e] font-['Barlow_Condensed'] font-bold text-sm tracking-widest uppercase px-8 py-3 rounded transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  );
}
