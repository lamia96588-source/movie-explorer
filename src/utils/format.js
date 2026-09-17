/** "2014-10-08" → "2014" */
export function getYear(dateString) {
  return dateString ? dateString.slice(0, 4) : null
}

/** TVMaze summaries contain raw HTML like <p>, <b>, <i> — strip it down to plain text. */
export function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim()
}
