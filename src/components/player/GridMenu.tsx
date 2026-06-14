import {
  Disc3,
  Heart,
  Info,
  ListEnd,
  ListPlus,
  ListStart,
  Mic2,
  Moon,
  Radio,
  Share2,
  User,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'
import { TouchButton } from '../ui/TouchButton'

interface GridItem {
  id: string
  label: string
  icon: LucideIcon
}

// 원본 스포티파이 트랙 메뉴의 순서/아이콘/기능명을 따른 N×3 아이콘 그리드.
// "Play Next"는 "Add to Queue" 바로 뒤에 배치.
const GRID_ITEMS: GridItem[] = [
  { id: 'like', label: 'Like', icon: Heart },
  { id: 'add-playlist', label: 'Add to Playlist', icon: ListPlus },
  { id: 'add-queue', label: 'Add to Queue', icon: ListEnd },
  { id: 'play-next', label: 'Play Next', icon: ListStart },
  { id: 'radio', label: 'Go to Radio', icon: Radio },
  { id: 'jam', label: 'Start a Jam', icon: Users },
  { id: 'artist', label: 'View Artist', icon: User },
  { id: 'album', label: 'Go to Album', icon: Disc3 },
  { id: 'share', label: 'Share', icon: Share2 },
  { id: 'lyrics', label: 'Lyrics', icon: Mic2 },
  { id: 'sleep', label: 'Sleep Timer', icon: Moon },
  { id: 'credits', label: 'Song Credits', icon: Info },
]

export function GridMenu() {
  const {
    isGridMenuOpen,
    closeGridMenu,
    currentTrack,
    actionTrack,
    playNext,
    toggleLike,
    likedTrackIds,
    openPlaylistToast,
    openFeature,
    addToast,
  } = useSpotify()

  if (!isGridMenuOpen) return null

  // 홈에서 열면 현재곡, 검색 결과에서 열면 해당 곡을 대상으로 동작
  const track = actionTrack ?? currentTrack
  const isLiked = likedTrackIds.has(track.id)

  const handleGridAction = (id: string) => {
    switch (id) {
      case 'like':
        toggleLike(track)
        closeGridMenu()
        return
      case 'add-playlist':
        closeGridMenu()
        openPlaylistToast(track)
        return
      case 'play-next':
        playNext(track) // 토스트 + 메뉴 닫힘 처리 포함
        return
      case 'radio':
        openFeature('radio') // 풀스크린 라디오 기능 화면으로 전환
        return
      case 'jam':
        openFeature('jam') // 풀스크린 잼 기능 화면으로 전환
        return
      default:
        addToast('This feature is not implemented in the prototype', 'info')
        closeGridMenu()
    }
  }

  return (
    <>
      <div
        className="absolute inset-0 z-40 animate-fade-in bg-black/60"
        onClick={closeGridMenu}
      />
      <div className="absolute bottom-0 left-0 right-0 z-50 max-h-[85%] animate-slide-up overflow-y-auto rounded-t-2xl bg-spotify-elevated">
        <div className="sticky top-0 flex items-center gap-3 border-b border-white/10 bg-spotify-elevated px-5 py-4">
          <img
            src={track.albumArt}
            alt=""
            className="h-10 w-10 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-white">
              {track.title}
            </h3>
            <p className="truncate text-xs text-spotify-subtext">
              {track.artist}
            </p>
          </div>
          <TouchButton
            onClick={closeGridMenu}
            className="rounded-full p-2 text-spotify-subtext transition-colors hover:bg-white/10 hover:text-white"
            scale={0.85}
          >
            <X size={20} />
          </TouchButton>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {GRID_ITEMS.map(({ id, label, icon: Icon }) => {
              const liked = id === 'like' && isLiked
              // Play Next는 주요 동작, Like는 좋아요 상태일 때 강조
              const highlight = id === 'play-next' || liked
              return (
                <TouchButton
                  key={id}
                  onClick={() => handleGridAction(id)}
                  className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-colors duration-200 ${
                    highlight
                      ? 'bg-spotify-green/15 hover:bg-spotify-green/25'
                      : 'bg-spotify-card hover:bg-spotify-card/80'
                  }`}
                  scale={0.93}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      highlight ? 'bg-spotify-green' : 'bg-spotify-elevated'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={highlight ? 'text-black' : 'text-white'}
                      fill={liked ? 'currentColor' : 'none'}
                    />
                  </div>
                  <span
                    className={`text-center text-[10px] font-semibold leading-tight ${
                      highlight ? 'text-spotify-green' : 'text-spotify-subtext'
                    }`}
                  >
                    {liked ? 'Liked' : label}
                  </span>
                </TouchButton>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
