import { Clock, MoreVertical, Plus, Search, X } from 'lucide-react'
import { useState } from 'react'
import { MOCK_TRACKS } from '../../data/mockData'
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
    openGridMenu,
    openPlaylistToast,
  } = useSpotify()

  const [isFocused, setIsFocused] = useState(false)

  const query = searchQuery.trim().toLowerCase()

  const filteredTracks = query
    ? MOCK_TRACKS.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.artist.toLowerCase().includes(query),
      )
    : []

  // 검색어 자동완성: 곡 제목·아티스트에서 입력값을 포함하는 후보 (최대 4개)
  const suggestions = query
    ? Array.from(
        new Set(MOCK_TRACKS.flatMap((t) => [t.title, t.artist])),
      )
        .filter(
          (s) => s.toLowerCase().includes(query) && s.toLowerCase() !== query,
        )
        .slice(0, 4)
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

      {searchQuery ? (
        <>
          {/* 자동완성 제안 */}
          {suggestions.length > 0 && (
            <div className="mb-4">
              {suggestions.map((term) => (
                <TouchButton
                  key={term}
                  onClick={() => handleSuggestionClick(term)}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors duration-200 hover:bg-spotify-card"
                  scale={0.98}
                >
                  <Search size={16} className="shrink-0 text-spotify-subtext" />
                  <span className="truncate text-sm text-white">{term}</span>
                </TouchButton>
              ))}
            </div>
          )}

          {/* 검색 결과 (관련 곡) */}
          {filteredTracks.length > 0 ? (
            <div className="mb-6">
              <h2 className="mb-3 text-sm font-bold text-white">
                Songs · {filteredTracks.length}
              </h2>
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  className="mb-2 flex w-full items-center gap-1 rounded-lg pr-1 transition-colors duration-200 hover:bg-spotify-card"
                >
                  <TouchButton
                    onClick={() => playTrack(track)}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-2 text-left"
                    scale={0.98}
                  >
                    <img
                      src={track.albumArt}
                      alt=""
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {track.title}
                      </p>
                      <p className="truncate text-xs text-spotify-subtext">
                        {track.artist}
                      </p>
                    </div>
                  </TouchButton>
                  {/* 담기(+): 플레이리스트 추가 시트 */}
                  <TouchButton
                    onClick={() => openPlaylistToast(track)}
                    className="shrink-0 rounded-full p-2 text-spotify-subtext transition-colors hover:text-white"
                    scale={0.85}
                    aria-label={`Add ${track.title} to playlist`}
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </TouchButton>
                  {/* 더보기(⋮): 곡 옵션 메뉴 */}
                  <TouchButton
                    onClick={() => openGridMenu(track)}
                    className="shrink-0 rounded-full p-2 text-spotify-subtext transition-colors hover:text-white"
                    scale={0.85}
                    aria-label={`More options for ${track.title}`}
                  >
                    <MoreVertical size={20} />
                  </TouchButton>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-sm font-semibold text-white">
                No results found
              </p>
              <p className="mt-1 text-xs text-spotify-subtext">
                Nothing matched &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <section className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <Clock size={16} className="text-spotify-subtext" />
              <h2 className="text-sm font-bold text-white">Recent Searches</h2>
              {recentSearches.length > 0 && (
                <span className="ml-auto flex items-center gap-1 rounded-full bg-spotify-green/15 px-2 py-0.5 text-[10px] font-semibold text-spotify-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-spotify-green" />
                  Saved
                </span>
              )}
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
                    className="animate-fade-in flex items-center gap-1.5 rounded-full bg-spotify-card px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-spotify-elevated"
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
