import { ListMusic } from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'

export function MiniQueueMonitor() {
  const { queue, currentTrack } = useSpotify()
  const upcoming = queue.slice(0, 5)

  return (
    <div className="mx-4 rounded-xl bg-spotify-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <ListMusic size={16} className="text-spotify-green" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-spotify-subtext">
          Mini Queue Monitor
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {upcoming.map((track, index) => {
          const isCurrent = track.id === currentTrack.id
          const isNext = index === 1 && queue[0]?.id === currentTrack.id

          return (
            <div
              key={`${track.id}-${index}`}
              className={`flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-300 ${
                isCurrent
                  ? 'bg-spotify-green/20 ring-1 ring-spotify-green'
                  : isNext
                    ? 'bg-white/10 ring-1 ring-spotify-green/50'
                    : 'bg-transparent'
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
