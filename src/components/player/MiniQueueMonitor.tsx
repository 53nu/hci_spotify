import { ListMusic, X } from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'
import { TouchButton } from '../ui/TouchButton'

export function MiniQueueMonitor() {
  const { queue, currentTrack, isQueueOpen, closeQueue, playTrack } = useSpotify()

  if (!isQueueOpen) return null

  const selectTrack = (track: (typeof queue)[number]) => {
    playTrack(track)
    closeQueue()
  }

  const upcoming = queue.slice(0, 5)

  return (
    <>
      {/* 재생화면 위로 띄우는 오버레이 (배경 클릭 시 닫힘) */}
      <div
        className="absolute inset-0 z-40 animate-fade-in bg-black/60"
        onClick={closeQueue}
      />
      <div className="absolute bottom-0 left-0 right-0 z-50 max-h-[80%] animate-slide-up overflow-y-auto rounded-t-2xl bg-spotify-elevated">
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-spotify-elevated px-5 py-4">
          <div className="flex items-center gap-2">
            <ListMusic size={18} className="text-spotify-green" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Mini Queue Monitor
            </h3>
          </div>
          <TouchButton
            onClick={closeQueue}
            className="rounded-full p-2 text-spotify-subtext transition-colors hover:bg-white/10 hover:text-white"
            scale={0.85}
          >
            <X size={20} />
          </TouchButton>
        </div>
        <div className="flex flex-col gap-2 p-4">
        {upcoming.map((track, index) => {
          const isCurrent = track.id === currentTrack.id
          const isNext = index === 1 && queue[0]?.id === currentTrack.id

          return (
            <TouchButton
              key={`${track.id}-${index}`}
              onClick={() => selectTrack(track)}
              scale={0.98}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-all duration-300 ${
                isCurrent
                  ? 'bg-spotify-green/20 ring-1 ring-spotify-green'
                  : isNext
                    ? 'animate-next-glow bg-white/10 ring-1 ring-spotify-green/50 hover:bg-white/15'
                    : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <span
                className={`w-5 text-center text-xs font-bold ${
                  isCurrent || isNext
                    ? 'text-spotify-green'
                    : 'text-spotify-subtext'
                }`}
              >
                {index}
              </span>
              <img
                src={track.albumArt}
                alt=""
                className="h-8 w-8 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-xs font-semibold ${
                    isCurrent ? 'text-spotify-green' : 'text-white'
                  }`}
                >
                  {track.title}
                </p>
                <p className="truncate text-[10px] text-spotify-subtext">
                  {track.artist}
                </p>
              </div>
              {isCurrent && (
                <span className="shrink-0 rounded bg-spotify-green px-1.5 py-0.5 text-[9px] font-bold text-black">
                  Playing
                </span>
              )}
              {isNext && (
                <span className="shrink-0 rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-bold text-spotify-green">
                  Next
                </span>
              )}
            </TouchButton>
          )
        })}
        </div>
      </div>
    </>
  )
}
