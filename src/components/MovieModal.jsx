import { useEffect } from 'react'
import { getYear, stripHtml } from '../utils/format'

export default function MovieModal({ show, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const backdrop = show.image?.original ?? show.image?.medium
  const rating = show.rating?.average
  const network = show.network?.name ?? show.webChannel?.name

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${show.name} details`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl animate-pop-in overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0d0d16] shadow-2xl sm:rounded-3xl">
        <div className="relative">
          {backdrop ? (
            <>
              <img
                src={backdrop}
                alt=""
                className="h-52 w-full object-cover object-top sm:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent" />
            </>
          ) : (
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-indigo-900/60 to-fuchsia-900/40 text-5xl">
              🎬
            </div>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/60 text-zinc-300 backdrop-blur transition hover:bg-black/80 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="relative z-10 -mt-10 px-6 pb-6 sm:px-8 sm:pb-8">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{show.name}</h2>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-zinc-400">
            <span className="font-semibold text-amber-300">
              ⭐ {rating != null ? `${rating.toFixed(1)}/10` : 'NR'}
            </span>
            {show.premiered && <span>📅 {getYear(show.premiered)}</span>}
            {show.status && (
              <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs">{show.status}</span>
            )}
          </div>

          {show.genres?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-400/20"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {(network || show.language || show.runtime || show.premiered) && (
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {network && <Meta label="Network" value={network} />}
              {show.language && <Meta label="Language" value={show.language} />}
              {show.runtime && <Meta label="Runtime" value={`${show.runtime} min`} />}
              {show.premiered && <Meta label="Premiered" value={show.premiered} />}
            </dl>
          )}

          {show.summary && (
            <div className="mt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Overview
              </h3>
              <p className="mt-2 leading-relaxed text-zinc-300">{stripHtml(show.summary)}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-white/5 py-3 text-sm font-semibold text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white sm:w-auto sm:px-8"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="mt-0.5 font-medium text-zinc-200">{value}</dd>
    </div>
  )
}
