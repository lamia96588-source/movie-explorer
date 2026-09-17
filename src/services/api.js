const BASE_URL = 'https://api.tvmaze.com'

/**
 * Fetch all shows (first page of the TVMaze catalogue = 250 shows).
 * Endpoint: GET /shows
 */
export async function fetchAllShows() {
  const res = await fetch(`${BASE_URL}/shows?page=0`)
  if (!res.ok) {
    throw new Error(`TVMaze responded with status ${res.status}`)
  }
  return res.json()
}

/**
 * Search shows by title.
 * Endpoint: GET /search/shows?q=:query
 * TVMaze wraps each match in { score, show }, so unwrap it here.
 */
export async function searchShows(query) {
  const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)
  if (!res.ok) {
    throw new Error(`TVMaze responded with status ${res.status}`)
  }
  const data = await res.json()
  return data.map((item) => item.show)
}
