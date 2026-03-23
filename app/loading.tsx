export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-[#080a0e]">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#c9a84c]/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#c9a84c] border-r-[#c9a84c] animate-spin" />
        <div className="absolute inset-[35%] bg-[#c9a84c] rounded-full" />
      </div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-[0.2em] text-[#e8eaf0] animate-pulse">
        LOADING CINEVERSE...
      </h2>
    </div>
  );
}
