import { getYear } from '../utils/format'

export default function MovieCard({ show, onSeeDetails }) {
  const year = getYear(show.premiered) ?? '—'
  const rating = show.rating?.average
  const poster = show.image?.original ?? show.image?.medium

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition duration-300 hover:-translate-y-1.5 hover:border-indigo-400/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
        {poster ? (
          <img
            src={poster}
            alt={`${show.name} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-zinc-600">
            <span className="text-4xl">🎞️</span>
            <span className="text-center text-xs leading-snug">{show.name}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold leading-snug text-white" title={show.name}>
          {show.name}
        </h3>
        <p className="text-sm text-zinc-400">
          <span className="font-medium text-amber-300">⭐ {rating ?? 'NR'}</span>
          <span className="mx-1.5 text-zinc-600">•</span>📅 {year}
        </p>
        <button
          onClick={() => onSeeDetails(show)}
          className="mt-auto w-full rounded-xl bg-indigo-500/10 px-4 py-2.5 text-sm font-semibold text-indigo-300 ring-1 ring-indigo-400/30 transition hover:bg-indigo-500 hover:text-white active:scale-95"
        >
          See Details
        </button>
      </div>
    </article>
  )
}
