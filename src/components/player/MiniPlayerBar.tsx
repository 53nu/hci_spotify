import { Pause, Play } from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'
import { TouchButton } from '../ui/TouchButton'

// 재생창을 'v'로 축소했을 때 하단 탭 위에 뜨는 미니 재생 막대.
// 막대 본문을 누르면 전체 재생창으로 다시 확장된다 (전환 애니메이션 없음).
export function MiniPlayerBar() {
  const { currentTrack, isPlaying, togglePlay, setActiveTab } = useSpotify()

  return (
    <div className="shrink-0 px-2 pb-1">
      <div className="flex items-center gap-2 rounded-lg bg-spotify-card px-2 py-2 shadow-lg">
        <TouchButton
          onClick={() => setActiveTab('home')}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-left"
          scale={0.99}
          aria-label="Open now playing"
        >
          <img
            src={currentTrack.albumArt}
            alt=""
            className="h-10 w-10 shrink-0 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              {currentTrack.title}
            </p>
            <p className="truncate text-[10px] text-spotify-subtext">
              {currentTrack.artist}
            </p>
          </div>
        </TouchButton>
        <TouchButton
          onClick={togglePlay}
          className="shrink-0 p-2 text-white"
          scale={0.85}
          ripple={false}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={24} fill="white" />
          ) : (
            <Play size={24} fill="white" />
          )}
        </TouchButton>
      </div>
    </div>
  )
}
