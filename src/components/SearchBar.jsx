export default function SearchBar({ query, onChange }) {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-zinc-500">
        🔍
      </span>
      <input
        type="text"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a movie or show..."
        aria-label="Search for a movie or show"
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-14 pr-12 text-white outline-none backdrop-blur transition placeholder:text-zinc-500 focus:border-indigo-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/10"
      />
      {query && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  )
}
