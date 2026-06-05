import {
  Download,
  Heart,
  ListPlus,
  ListStart,
  Mic2,
  Radio,
  Share2,
  Shuffle,
  User,
  X,
} from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'
import { TouchButton } from '../ui/TouchButton'

const GRID_ITEMS = [
  { id: 'play-next', label: 'Play Next', icon: ListStart, highlight: true },
  { id: 'add-queue', label: 'Add to Queue', icon: ListPlus, highlight: false },
  { id: 'like', label: 'Like', icon: Heart, highlight: false },
  { id: 'share', label: 'Share', icon: Share2, highlight: false },
  { id: 'download', label: 'Download', icon: Download, highlight: false },
  { id: 'radio', label: 'Radio', icon: Radio, highlight: false },
  { id: 'artist', label: 'Artist', icon: User, highlight: false },
  { id: 'lyrics', label: 'Lyrics', icon: Mic2, highlight: false },
  { id: 'shuffle', label: 'Shuffle Play', icon: Shuffle, highlight: false },
] as const

const SECONDARY_ITEMS = [
  'Go to Album',
  'Go to Artist',
  'Playback Speed',
  'Sleep Timer',
  'View Credits',
]

export function GridMenu() {
  const { isGridMenuOpen, closeGridMenu, currentTrack, playNext, addToast } =
    useSpotify()

  if (!isGridMenuOpen) return null

  const handleGridAction = (id: string) => {
    if (id === 'play-next') {
      playNext(currentTrack)
      return
    }
    addToast('This feature is not implemented in the prototype', 'info')
    closeGridMenu()
  }

  return (
    <>
      <div
        className="absolute inset-0 z-40 animate-fade-in bg-black/60"
        onClick={closeGridMenu}
      />
      <div className="absolute bottom-0 left-0 right-0 z-50 max-h-[85%] animate-slide-up overflow-y-auto rounded-t-2xl bg-spotify-elevated">
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-spotify-elevated px-5 py-4">
          <h3 className="text-base font-bold text-white">{currentTrack.title}</h3>
          <TouchButton
            onClick={closeGridMenu}
            className="rounded-full p-2 text-spotify-subtext transition-colors hover:bg-white/10 hover:text-white"
            scale={0.85}
          >
            <X size={20} />
          </TouchButton>
        </div>

        <div className="p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-spotify-subtext">
            Quick Actions
          </p>
          <div className="grid grid-cols-3 gap-2">
            {GRID_ITEMS.map(({ id, label, icon: Icon, highlight }) => (
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
                  />
                </div>
                <span
                  className={`text-center text-[10px] font-semibold leading-tight ${
                    highlight ? 'text-spotify-green' : 'text-spotify-subtext'
                  }`}
                >
                  {label}
                </span>
              </TouchButton>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-2">
          <p className="mb-1 px-1 py-2 text-xs font-bold uppercase tracking-wider text-spotify-subtext">
            More
          </p>
          {SECONDARY_ITEMS.map((item) => (
            <TouchButton
              key={item}
              onClick={() => {
                addToast('This feature is not implemented in the prototype', 'info')
                closeGridMenu()
              }}
              className="w-full rounded-lg px-3 py-3 text-left text-sm text-spotify-subtext transition-colors duration-200 hover:bg-white/5 hover:text-white"
              scale={0.98}
            >
              {item}
            </TouchButton>
          ))}
        </div>
      </div>
    </>
  )
}
