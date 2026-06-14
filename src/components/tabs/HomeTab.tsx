import {
  ChevronDown,
  Heart,
  ListMusic,
  MonitorSpeaker,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Repeat,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
} from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'
import { MiniQueueMonitor } from '../player/MiniQueueMonitor'
import { TouchButton } from '../ui/TouchButton'

export function HomeTab() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    skipNext,
    skipPrevious,
    openPlaylistToast,
    openGridMenu,
    toggleQueue,
    isQueueOpen,
    toggleLike,
    likedTrackIds,
    addToast,
  } = useSpotify()

  const isLiked = likedTrackIds.has(currentTrack.id)

  return (
    // overflow-hidden: 화면에 딱 맞춰 스크롤 없이 표시
    <div className="flex flex-1 flex-col overflow-hidden pb-4 pt-12">
      <div className="flex items-center justify-between px-5 py-2">
        <TouchButton className="text-spotify-subtext" scale={0.9}>
          <ChevronDown size={28} />
        </TouchButton>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-spotify-subtext">
            Now Playing
          </p>
          <p className="text-xs font-semibold text-white">{currentTrack.album}</p>
        </div>
        <TouchButton
          onClick={() => openGridMenu()}
          className="text-spotify-subtext transition-colors hover:text-white"
          scale={0.9}
        >
          <MoreHorizontal size={28} />
        </TouchButton>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-6">
        {/* 앨범 아트: 남는 세로 공간에 맞춰 가능한 크게, 항상 정사각형 (스크롤 방지) */}
        <div className="relative mb-6 flex min-h-0 w-full flex-1 items-center justify-center">
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.album}
            className="aspect-square max-h-full max-w-full rounded-lg object-cover shadow-2xl shadow-black/60"
          />
        </div>

        <div className="mb-6 flex w-full items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold text-white">
              {currentTrack.title}
            </h1>
            <p className="truncate text-sm text-spotify-subtext">
              {currentTrack.artist}
            </p>
          </div>
          <div className="mt-1 flex shrink-0 items-center gap-2">
            {/* 하트: 한 번 탭으로 Liked Songs에 즉시 추가/제거 (불필요한 단계 제거) */}
            <TouchButton
              onClick={() => toggleLike(currentTrack)}
              className={`rounded-full p-2 transition-all duration-200 ${
                isLiked
                  ? 'text-spotify-green'
                  : 'text-spotify-subtext hover:text-white'
              }`}
              scale={0.85}
              aria-label={isLiked ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
            >
              <Heart
                size={24}
                strokeWidth={2.5}
                fill={isLiked ? 'currentColor' : 'none'}
                className={isLiked ? 'animate-like-pop' : ''}
              />
            </TouchButton>
            {/* + : 여러 플레이리스트에 한 번에 담는 멀티 선택 시트 */}
            <TouchButton
              onClick={() => openPlaylistToast()}
              className="rounded-full border-2 border-spotify-subtext/50 p-2 text-spotify-subtext transition-all duration-200 hover:border-white hover:bg-white/10 hover:text-white"
              scale={0.88}
            >
              <Plus size={22} strokeWidth={2.5} />
            </TouchButton>
          </div>
        </div>

        <div className="mb-2 w-full">
          <div className="h-1 w-full rounded-full bg-white/20">
            <div className="h-1 w-[35%] rounded-full bg-white transition-all duration-500" />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-spotify-subtext">
            <span>2:12</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        <div className="mb-5 flex w-full items-center justify-between px-2">
          <TouchButton className="text-spotify-subtext" scale={0.88}>
            <Shuffle size={20} />
          </TouchButton>
          <TouchButton
            onClick={skipPrevious}
            className="text-white"
            scale={0.88}
            aria-label="Previous track"
          >
            <SkipBack size={28} fill="white" />
          </TouchButton>
          <TouchButton
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:scale-105"
            scale={0.92}
            ripple={false}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={32} fill="black" />
            ) : (
              <Play size={32} fill="black" className="ml-0.5" />
            )}
          </TouchButton>
          <TouchButton
            onClick={skipNext}
            className="text-white"
            scale={0.88}
            aria-label="Next track"
          >
            <SkipForward size={28} fill="white" />
          </TouchButton>
          <TouchButton className="text-spotify-subtext" scale={0.88}>
            <Repeat size={20} />
          </TouchButton>
        </div>

        {/* 하단 유틸 바: 큐 모니터는 토글로 열어 재생화면 위에 오버레이 */}
        <div className="flex w-full items-center justify-between px-1">
          <TouchButton
            onClick={() =>
              addToast('This feature is not implemented in the prototype', 'info')
            }
            className="text-spotify-subtext transition-colors hover:text-white"
            scale={0.88}
          >
            <MonitorSpeaker size={18} />
          </TouchButton>
          <div className="flex items-center gap-5">
            <TouchButton
              onClick={() =>
                addToast('This feature is not implemented in the prototype', 'info')
              }
              className="text-spotify-subtext transition-colors hover:text-white"
              scale={0.88}
            >
              <Share2 size={18} />
            </TouchButton>
            <TouchButton
              onClick={toggleQueue}
              className={`transition-colors ${
                isQueueOpen
                  ? 'text-spotify-green'
                  : 'text-spotify-subtext hover:text-white'
              }`}
              scale={0.88}
            >
              <ListMusic size={20} strokeWidth={isQueueOpen ? 2.5 : 2} />
            </TouchButton>
          </div>
        </div>
      </div>

      <MiniQueueMonitor />
    </div>
  )
}
