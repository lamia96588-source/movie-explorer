import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchAllShows, searchShows } from '../services/api'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import SearchBar from '../components/SearchBar'
import MovieModal from '../components/MovieModal'

const PAGE_SIZE = 24
const GRID =
  'grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'

export default function MoviesPage() {
  const [query, setQuery] = useState('')
  const [allShows, setAllShows] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selectedShow, setSelectedShow] = useState(null)

  useEffect(() => {
    document.title = 'Browse Movies — MovieExplorer'
  }, [])

  const loadShows = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchAllShows()
      .then(setAllShows)
      .catch(() => setError('Something went wrong while loading shows. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadShows()
  }, [loadShows])

  // debounced live search — waits 450ms after the last keystroke
  useEffect(() => {
    const term = query.trim()
    if (!term) {
      setResults([])
      setSearching(false)
      setVisibleCount(PAGE_SIZE)
      return
    }

    setSearching(true)
    let cancelled = false
    const timer = setTimeout(() => {
      searchShows(term)
        .then((data) => {
          if (!cancelled) setResults(data)
        })
        .catch(() => {
          if (!cancelled) setResults([])
        })
        .finally(() => {
          if (!cancelled) setSearching(false)
        })
    }, 450)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  const sortedShows = useMemo(
    () => [...allShows].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)),
    [allShows],
  )

  const term = query.trim()
  const shows = term ? results : sortedShows
  const shownShows = term ? shows : shows.slice(0, visibleCount)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="text-center">
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
          Browse{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            Movies & Shows
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-zinc-400">
          Search thousands of shows and tap any card for full details.
        </p>
      </header>

      <div className="mt-8">
        <SearchBar query={query} onChange={setQuery} />
      </div>

      <p className="mt-6 text-sm text-zinc-500" aria-live="polite">
        {term
          ? searching
            ? 'Searching…'
            : `${shows.length} result${shows.length === 1 ? '' : 's'} for "${term}"`
          : loading
            ? 'Loading shows…'
            : `${sortedShows.length} shows · sorted by rating`}
      </p>

      {error ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-14 text-center">
          <span className="text-4xl">📡</span>
          <p className="text-zinc-300">{error}</p>
          <button
            onClick={loadShows}
            className="rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Try Again
          </button>
        </div>
      ) : loading || searching ? (
        <div className={`mt-6 ${GRID}`}>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : shows.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-16 text-center">
          <span className="text-4xl">🍿</span>
          <p className="font-medium text-zinc-300">No shows found for "{term}"</p>
          <p className="text-sm text-zinc-500">Try a different title or check the spelling.</p>
        </div>
      ) : (
        <>
          <div className={`mt-6 ${GRID}`}>
            {shownShows.map((show) => (
              <MovieCard key={show.id} show={show} onSeeDetails={setSelectedShow} />
            ))}
          </div>

          {!term && visibleCount < shows.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {selectedShow && <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />}
    </div>
  )
}
