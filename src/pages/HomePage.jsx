import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllShows } from '../services/api'

export default function HomePage() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    document.title = 'MovieExplorer — Discover Movies & TV Shows'

    let cancelled = false
    fetchAllShows()
      .then((shows) => {
        if (cancelled) return
        const topRated = [...shows]
          .filter((show) => show.image?.medium)
          .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
          .slice(0, 14)
        setFeatured(topRated)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* ambient background: glows + dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[26rem] w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[130px]" />
        <div className="absolute -left-32 top-48 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[110px]" />
        <div className="absolute -right-28 top-32 h-72 w-72 rounded-full bg-cyan-500/15 blur-[110px]" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live data from the TVMaze API
        </span>

        <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
          DISCOVER{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
            MOVIES
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Explore and discover your favorite movies and TV shows from around the world — search by
          title, browse top rated hits and dive into the details.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/movies"
            className="group rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/30 transition hover:shadow-indigo-500/50 hover:brightness-110 active:scale-95"
          >
            Explore Now{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a
            href="#highlights"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-zinc-200 backdrop-blur transition hover:bg-white/10"
          >
            How it works
          </a>
        </div>

        <div id="highlights" className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-4">
          <Stat value="250+" label="Shows to browse" />
          <Stat value="⭐ Live" label="Real ratings" />
          <Stat value="⚡ Instant" label="Title search" />
        </div>
      </div>

      {featured.length > 0 && (
        <div className="relative mt-4 pb-20">
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee gap-4">
              {[...featured, ...featured].map((show, index) => (
                <img
                  key={`${show.id}-${index}`}
                  src={show.image.medium}
                  alt={show.name}
                  loading="lazy"
                  className="h-40 w-[6.7rem] rounded-xl object-cover ring-1 ring-white/10 sm:h-48 sm:w-32"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-2 py-4 backdrop-blur">
      <p className="font-display text-lg font-bold text-white sm:text-2xl">{value}</p>
      <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{label}</p>
    </div>
  )
}
