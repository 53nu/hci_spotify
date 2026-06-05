import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { INITIAL_PLAYLISTS, MOCK_TRACKS } from '../data/mockData'
import type { Playlist, TabId, ToastMessage, Track } from '../types'

interface SpotifyContextValue {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  currentTrack: Track
  queue: Track[]
  playlists: Playlist[]
  recentSearches: string[]
  recentPlayed: Track[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  isPlaylistToastOpen: boolean
  isGridMenuOpen: boolean
  selectedPlaylistIds: Set<string>
  toasts: ToastMessage[]
  playTrack: (track: Track) => void
  playNext: (track: Track) => void
  openPlaylistToast: () => void
  closePlaylistToast: () => void
  togglePlaylistSelection: (playlistId: string) => void
  saveToSelectedPlaylists: () => void
  openGridMenu: () => void
  closeGridMenu: () => void
  submitSearch: (query: string) => void
  removeRecentSearch: (query: string) => void
  addToast: (text: string, type?: ToastMessage['type']) => void
  dismissToast: (id: string) => void
}

const SpotifyContext = createContext<SpotifyContextValue | null>(null)

export function SpotifyProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0])
  const [queue, setQueue] = useState<Track[]>([...MOCK_TRACKS])
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'bohemian rhapsody',
    'despacito',
  ])
  const [recentPlayed, setRecentPlayed] = useState<Track[]>([
    MOCK_TRACKS[3],
    MOCK_TRACKS[4],
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaylistToastOpen, setIsPlaylistToastOpen] = useState(false)
  const [isGridMenuOpen, setIsGridMenuOpen] = useState(false)
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<Set<string>>(
    new Set(),
  )
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    (text: string, type: ToastMessage['type'] = 'success') => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, text, type }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    },
    [],
  )

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToRecentSearches = useCallback((query: string) => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== trimmed)
      return [trimmed, ...filtered].slice(0, 10)
    })
  }, [])

  const submitSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim()
      if (!trimmed) return
      addToRecentSearches(trimmed)
      setSearchQuery(trimmed)
    },
    [addToRecentSearches],
  )

  const removeRecentSearch = useCallback((query: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== query))
  }, [])

  const playTrack = useCallback(
    (track: Track) => {
      setCurrentTrack(track)
      setQueue((prev) => {
        const without = prev.filter((t) => t.id !== track.id)
        return [track, ...without]
      })
      setRecentPlayed((prev) => {
        const filtered = prev.filter((t) => t.id !== track.id)
        return [track, ...filtered].slice(0, 8)
      })
      setActiveTab('home')
    },
    [],
  )

  const playNext = useCallback(
    (track: Track) => {
      setQueue((prev) => {
        const without = prev.filter((t) => t.id !== track.id)
        const reordered = [
          currentTrack,
          ...without.filter((t) => t.id !== currentTrack.id),
        ]
        const next = [...reordered]
        next.splice(1, 0, track)
        return next
      })
      addToast(`"${track.title}" will play next`, 'info')
      setIsGridMenuOpen(false)
    },
    [currentTrack, addToast],
  )

  const openPlaylistToast = useCallback(() => {
    const currentInPlaylists = playlists
      .filter((p) => p.trackIds.includes(currentTrack.id))
      .map((p) => p.id)
    setSelectedPlaylistIds(new Set(currentInPlaylists))
    setIsPlaylistToastOpen(true)
  }, [playlists, currentTrack.id])

  const closePlaylistToast = useCallback(() => {
    setIsPlaylistToastOpen(false)
  }, [])

  const togglePlaylistSelection = useCallback((playlistId: string) => {
    setSelectedPlaylistIds((prev) => {
      const next = new Set(prev)
      if (next.has(playlistId)) {
        next.delete(playlistId)
      } else {
        next.add(playlistId)
      }
      return next
    })
  }, [])

  const saveToSelectedPlaylists = useCallback(() => {
    const trackId = currentTrack.id
    setPlaylists((prev) =>
      prev.map((playlist) => {
        const shouldHave = selectedPlaylistIds.has(playlist.id)
        const has = playlist.trackIds.includes(trackId)
        if (shouldHave && !has) {
          return { ...playlist, trackIds: [...playlist.trackIds, trackId] }
        }
        if (!shouldHave && has) {
          return {
            ...playlist,
            trackIds: playlist.trackIds.filter((id) => id !== trackId),
          }
        }
        return playlist
      }),
    )
    const names = playlists
      .filter((p) => selectedPlaylistIds.has(p.id))
      .map((p) => p.name)
    if (names.length > 0) {
      addToast(`Saved to ${names.join(', ')}`)
    } else {
      addToast('Removed from playlists', 'info')
    }
    setIsPlaylistToastOpen(false)
  }, [currentTrack.id, selectedPlaylistIds, playlists, addToast])

  const openGridMenu = useCallback(() => setIsGridMenuOpen(true), [])
  const closeGridMenu = useCallback(() => setIsGridMenuOpen(false), [])

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      currentTrack,
      queue,
      playlists,
      recentSearches,
      recentPlayed,
      searchQuery,
      setSearchQuery,
      isPlaylistToastOpen,
      isGridMenuOpen,
      selectedPlaylistIds,
      toasts,
      playTrack,
      playNext,
      openPlaylistToast,
      closePlaylistToast,
      togglePlaylistSelection,
      saveToSelectedPlaylists,
      openGridMenu,
      closeGridMenu,
      submitSearch,
      removeRecentSearch,
      addToast,
      dismissToast,
    }),
    [
      activeTab,
      currentTrack,
      queue,
      playlists,
      recentSearches,
      recentPlayed,
      searchQuery,
      isPlaylistToastOpen,
      isGridMenuOpen,
      selectedPlaylistIds,
      toasts,
      playTrack,
      playNext,
      openPlaylistToast,
      closePlaylistToast,
      togglePlaylistSelection,
      saveToSelectedPlaylists,
      openGridMenu,
      closeGridMenu,
      submitSearch,
      removeRecentSearch,
      addToast,
      dismissToast,
    ],
  )

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  )
}

export function useSpotify() {
  const ctx = useContext(SpotifyContext)
  if (!ctx) throw new Error('useSpotify must be used within SpotifyProvider')
  return ctx
}
