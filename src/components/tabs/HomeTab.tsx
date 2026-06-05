import {
  ChevronDown,
  MoreHorizontal,
  Pause,
  Plus,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'
import { GridMenu } from '../player/GridMenu'
import { MiniQueueMonitor } from '../player/MiniQueueMonitor'
import { PlaylistToast } from '../player/PlaylistToast'
import { TouchButton } from '../ui/TouchButton'

export function HomeTab() {
  const { currentTrack, openPlaylistToast, openGridMenu } = useSpotify()

  return (
    <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-12">
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
          onClick={openGridMenu}
          className="text-spotify-subtext transition-colors hover:text-white"
          scale={0.9}
        >
          <MoreHorizontal size={28} />
        </TouchButton>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="relative mb-8 w-full max-w-[300px]">
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.album}
            className="aspect-square w-full rounded-lg object-cover shadow-2xl shadow-black/60"
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
          <TouchButton
            onClick={openPlaylistToast}
            className="mt-1 shrink-0 rounded-full border-2 border-spotify-subtext/50 p-2 text-spotify-subtext transition-all duration-200 hover:border-white hover:bg-white/10 hover:text-white"
            scale={0.88}
          >
            <Plus size={22} strokeWidth={2.5} />
          </TouchButton>
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

        <div className="mb-6 flex w-full items-center justify-between px-2">
          <TouchButton className="text-spotify-subtext" scale={0.88}>
            <Shuffle size={20} />
          </TouchButton>
          <TouchButton className="text-white" scale={0.88}>
            <SkipBack size={28} fill="white" />
          </TouchButton>
          <TouchButton
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:scale-105"
            scale={0.92}
          >
            <Pause size={32} fill="black" />
          </TouchButton>
          <TouchButton className="text-white" scale={0.88}>
            <SkipForward size={28} fill="white" />
          </TouchButton>
          <TouchButton className="text-spotify-subtext" scale={0.88}>
            <Repeat size={20} />
          </TouchButton>
        </div>
      </div>

      <MiniQueueMonitor />

      <PlaylistToast />
      <GridMenu />
    </div>
  )
}
