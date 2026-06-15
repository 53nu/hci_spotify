import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { INITIAL_PLAYLISTS, MOCK_TRACKS } from '../data/mockData'
import type { FeatureId, Playlist, TabId, ToastMessage, Track } from '../types'

interface SpotifyContextValue {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  collapsePlayer: () => void
  currentTrack: Track
  isPlaying: boolean
  queue: Track[]
  playlists: Playlist[]
  recentSearches: string[]
  recentPlayed: Track[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  isPlaylistToastOpen: boolean
  isGridMenuOpen: boolean
  isQueueOpen: boolean
  activeFeature: FeatureId | null
  actionTrack: Track | null
  selectedPlaylistIds: Set<string>
  likedTrackIds: Set<string>
  toasts: ToastMessage[]
  playTrack: (track: Track) => void
  playNext: (track: Track) => void
  togglePlay: () => void
  skipNext: () => void
  skipPrevious: () => void
  toggleLike: (track: Track) => void
  openPlaylistToast: (track?: Track) => void
  closePlaylistToast: () => void
  togglePlaylistSelection: (playlistId: string) => void
  saveToSelectedPlaylists: () => void
  openGridMenu: (track?: Track) => void
  closeGridMenu: () => void
  toggleQueue: () => void
  closeQueue: () => void
  openFeature: (feature: FeatureId) => void
  closeFeature: () => void
  submitSearch: (query: string) => void
  removeRecentSearch: (query: string) => void
  addToast: (text: string, type?: ToastMessage['type']) => void
  dismissToast: (id: string) => void
}

const SpotifyContext = createContext<SpotifyContextValue | null>(null)

export function SpotifyProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabId>('home')
  // 'home'(전체 재생창)에 들어오기 직전의 탭을 기억 → 'v'로 그 화면으로 복귀
  const prevTabRef = useRef<TabId>('search')
  const setActiveTab = useCallback((tab: TabId) => {
    setActiveTabState((prev) => {
      if (prev !== 'home' && tab === 'home') prevTabRef.current = prev
      return tab
    })
  }, [])
  // 재생창 축소: 직전 화면(검색/라이브러리)으로 돌아가 하단 미니바로 전환
  const collapsePlayer = useCallback(() => {
    setActiveTabState(prevTabRef.current)
  }, [])
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [queue, setQueue] = useState<Track[]>([...MOCK_TRACKS])
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS)
  // 검색창 초기 기록 없음 (검색어/최근 재생 모두 빈 상태로 시작)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [recentPlayed, setRecentPlayed] = useState<Track[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaylistToastOpen, setIsPlaylistToastOpen] = useState(false)
  const [isGridMenuOpen, setIsGridMenuOpen] = useState(false)
  const [isQueueOpen, setIsQueueOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>(null)
  // 시트/메뉴(그리드·플레이리스트)가 대상으로 삼는 곡 (없으면 현재 재생곡)
  const [actionTrack, setActionTrack] = useState<Track | null>(null)
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
      setIsPlaying(true)
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

  // 재생/정지 토글
  const togglePlay = useCallback(() => setIsPlaying((v) => !v), [])

  // 큐 안에서 현재 곡 기준 다음/이전 곡으로 이동 (끝에서 순환)
  const skipNext = useCallback(() => {
    if (queue.length === 0) return
    const idx = queue.findIndex((t) => t.id === currentTrack.id)
    setCurrentTrack(queue[(idx + 1) % queue.length])
    setIsPlaying(true)
  }, [queue, currentTrack.id])

  const skipPrevious = useCallback(() => {
    if (queue.length === 0) return
    const idx = queue.findIndex((t) => t.id === currentTrack.id)
    setCurrentTrack(queue[(idx - 1 + queue.length) % queue.length])
    setIsPlaying(true)
  }, [queue, currentTrack.id])

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

  const openPlaylistToast = useCallback(
    (track?: Track) => {
      const target = track ?? currentTrack
      setActionTrack(track ?? null)
      const currentInPlaylists = playlists
        .filter((p) => p.trackIds.includes(target.id))
        .map((p) => p.id)
      setSelectedPlaylistIds(new Set(currentInPlaylists))
      setIsPlaylistToastOpen(true)
    },
    [playlists, currentTrack],
  )

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
    const trackId = (actionTrack ?? currentTrack).id
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
  }, [actionTrack, currentTrack, selectedPlaylistIds, playlists, addToast])

  const openGridMenu = useCallback((track?: Track) => {
    setActionTrack(track ?? null)
    setIsGridMenuOpen(true)
  }, [])
  const closeGridMenu = useCallback(() => setIsGridMenuOpen(false), [])

  // "Liked Songs"는 별도 플레이리스트(id: 'liked')로 관리 → 하트 한 번으로 토글
  const likedTrackIds = useMemo(() => {
    const liked = playlists.find((p) => p.id === 'liked')
    return new Set(liked ? liked.trackIds : [])
  }, [playlists])

  const toggleLike = useCallback(
    (track: Track) => {
      const wasLiked = likedTrackIds.has(track.id)
      setPlaylists((prev) =>
        prev.map((p) => {
          if (p.id !== 'liked') return p
          return {
            ...p,
            trackIds: wasLiked
              ? p.trackIds.filter((id) => id !== track.id)
              : [...p.trackIds, track.id],
          }
        }),
      )
      addToast(
        wasLiked ? 'Removed from Liked Songs' : 'Added to Liked Songs',
        wasLiked ? 'info' : 'success',
      )
    },
    [likedTrackIds, addToast],
  )

  const toggleQueue = useCallback(() => setIsQueueOpen((v) => !v), [])
  const closeQueue = useCallback(() => setIsQueueOpen(false), [])

  // 기능 화면으로 전환: 열려있던 메뉴/시트는 닫고 풀스크린 표시
  const openFeature = useCallback((feature: FeatureId) => {
    setIsGridMenuOpen(false)
    setIsQueueOpen(false)
    setActiveFeature(feature)
  }, [])
  const closeFeature = useCallback(() => setActiveFeature(null), [])

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      collapsePlayer,
      currentTrack,
      isPlaying,
      queue,
      playlists,
      recentSearches,
      recentPlayed,
      searchQuery,
      setSearchQuery,
      isPlaylistToastOpen,
      isGridMenuOpen,
      isQueueOpen,
      activeFeature,
      actionTrack,
      selectedPlaylistIds,
      likedTrackIds,
      toasts,
      playTrack,
      playNext,
      togglePlay,
      skipNext,
      skipPrevious,
      toggleLike,
      openPlaylistToast,
      closePlaylistToast,
      togglePlaylistSelection,
      saveToSelectedPlaylists,
      openGridMenu,
      closeGridMenu,
      toggleQueue,
      closeQueue,
      openFeature,
      closeFeature,
      submitSearch,
      removeRecentSearch,
      addToast,
      dismissToast,
    }),
    [
      activeTab,
      setActiveTab,
      collapsePlayer,
      currentTrack,
      isPlaying,
      queue,
      playlists,
      recentSearches,
      recentPlayed,
      searchQuery,
      isPlaylistToastOpen,
      isGridMenuOpen,
      isQueueOpen,
      activeFeature,
      actionTrack,
      selectedPlaylistIds,
      likedTrackIds,
      toasts,
      playTrack,
      playNext,
      togglePlay,
      skipNext,
      skipPrevious,
      toggleLike,
      openPlaylistToast,
      closePlaylistToast,
      togglePlaylistSelection,
      saveToSelectedPlaylists,
      openGridMenu,
      closeGridMenu,
      toggleQueue,
      closeQueue,
      openFeature,
      closeFeature,
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
