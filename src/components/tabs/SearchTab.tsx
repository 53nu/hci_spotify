import { Clock, Search, X } from 'lucide-react'
import { useState } from 'react'
import { MOCK_TRACKS, SEARCH_SUGGESTIONS } from '../../data/mockData'
import { useSpotify } from '../../context/SpotifyContext'
import { TouchButton } from '../ui/TouchButton'

export function SearchTab() {
  const {
    searchQuery,
    setSearchQuery,
    submitSearch,
    recentSearches,
    recentPlayed,
    removeRecentSearch,
    playTrack,
  } = useSpotify()

  const [isFocused, setIsFocused] = useState(false)

  const filteredTracks = searchQuery
    ? MOCK_TRACKS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      submitSearch(searchQuery)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (searchQuery.trim()) {
      submitSearch(searchQuery)
    }
  }

  const handleSuggestionClick = (term: string) => {
    setSearchQuery(term)
    submitSearch(term)
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-4 pt-14">
      <h1 className="mb-4 text-2xl font-bold text-white">Search</h1>

      <div
        className={`mb-6 flex items-center gap-3 rounded-lg bg-white px-4 py-3 transition-all duration-200 ${
          isFocused ? 'ring-2 ring-spotify-green' : ''
        }`}
      >
        <Search size={20} className="shrink-0 text-black" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          placeholder="What do you want to listen to?"
          className="flex-1 bg-transparent text-sm text-black outline-none placeholder:text-black/50"
        />
        {searchQuery && (
          <TouchButton
            onClick={() => setSearchQuery('')}
            className="text-black/50 transition-colors hover:text-black"
            scale={0.85}
          >
            <X size={18} />
          </TouchButton>
        )}
      </div>

      {searchQuery && filteredTracks.length > 0 ? (
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-bold text-white">Search Results</h2>
          {filteredTracks.map((track) => (
            <TouchButton
              key={track.id}
              onClick={() => playTrack(track)}
              className="mb-2 flex w-full items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-spotify-card"
              scale={0.98}
            >
              <img
                src={track.albumArt}
                alt=""
                className="h-12 w-12 rounded object-cover"
              />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold text-white">
                  {track.title}
                </p>
                <p className="truncate text-xs text-spotify-subtext">
                  {track.artist}
                </p>
              </div>
            </TouchButton>
          ))}
        </div>
      ) : (
        <>
          <section className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <Clock size={16} className="text-spotify-subtext" />
              <h2 className="text-sm font-bold text-white">Recent Searches</h2>
            </div>
            {recentSearches.length === 0 ? (
              <p className="text-xs text-spotify-subtext">
                Search terms are saved here even if you don&apos;t play a song
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <TouchButton
                    key={term}
                    onClick={() => handleSuggestionClick(term)}
                    className="flex items-center gap-1.5 rounded-full bg-spotify-card px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-spotify-elevated"
                    scale={0.95}
                  >
                    <Search size={12} className="text-spotify-subtext" />
                    {term}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation()
                        removeRecentSearch(term)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.stopPropagation()
                          removeRecentSearch(term)
                        }
                      }}
                      className="ml-1 text-spotify-subtext transition-colors hover:text-white"
                    >
                      <X size={12} />
                    </span>
                  </TouchButton>
                ))}
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.filter(
                (s) => !recentSearches.includes(s),
              ).slice(0, 3).map((term) => (
                <TouchButton
                  key={term}
                  onClick={() => handleSuggestionClick(term)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-spotify-subtext transition-colors duration-200 hover:border-white/30 hover:text-white"
                  scale={0.95}
                >
                  {term}
                </TouchButton>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold text-white">Recently Played</h2>
            {recentPlayed.length === 0 ? (
              <p className="text-xs text-spotify-subtext">
                Only songs you&apos;ve played appear in this section
              </p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recentPlayed.map((track) => (
                  <TouchButton
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="flex w-[100px] shrink-0 flex-col gap-2 transition-transform duration-200"
                    scale={0.95}
                  >
                    <img
                      src={track.albumArt}
                      alt={track.title}
                      className="aspect-square w-full rounded-md object-cover shadow-lg"
                    />
                    <div className="text-left">
                      <p className="truncate text-xs font-semibold text-white">
                        {track.title}
                      </p>
                      <p className="truncate text-[10px] text-spotify-subtext">
                        {track.artist}
                      </p>
                    </div>
                  </TouchButton>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
