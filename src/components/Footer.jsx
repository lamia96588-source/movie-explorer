import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#07070d]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-bold text-white">
            🎬 Movie<span className="text-indigo-400">Explorer</span>
          </p>
          <p className="mt-1 text-sm text-zinc-500">© 2026 MovieExplorer. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-5 text-sm text-zinc-400">
          <Link to="/movies" className="transition-colors hover:text-white">
            Movies
          </Link>
          <a
            href="https://www.tvmaze.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            Data by TVMaze
          </a>
          <a
            href="https://github.com/Source-Code-007"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
