import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
  }`

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#07070d]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg shadow-lg shadow-indigo-500/30">
            🎬
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Movie<span className="text-indigo-400">Explorer</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => `${navLinkClass({ isActive })} hidden sm:block`}>
            Movies
          </NavLink>
          <Link
            to="/movies"
            className="ml-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 hover:brightness-110 active:scale-95 sm:ml-2"
          >
            <span className="sm:hidden">Movies</span>
            <span className="hidden sm:inline">Browse Movies</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
