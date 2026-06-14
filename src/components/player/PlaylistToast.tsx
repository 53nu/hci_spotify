import { Check, X } from 'lucide-react'
import { useSpotify } from '../../context/SpotifyContext'
import { TouchButton } from '../ui/TouchButton'
import { TouchCheckbox } from '../ui/TouchCheckbox'

export function PlaylistToast() {
  const {
    isPlaylistToastOpen,
    closePlaylistToast,
    playlists,
    currentTrack,
    actionTrack,
    selectedPlaylistIds,
    togglePlaylistSelection,
    saveToSelectedPlaylists,
  } = useSpotify()

  if (!isPlaylistToastOpen) return null

  const track = actionTrack ?? currentTrack

  return (
    <>
      <div
        className="absolute inset-0 z-40 animate-fade-in bg-black/60"
        onClick={closePlaylistToast}
      />
      <div className="absolute bottom-0 left-0 right-0 z-50 animate-slide-up rounded-t-2xl bg-spotify-elevated">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="text-base font-bold text-white">Add to Playlist</h3>
            <p className="mt-0.5 text-xs text-spotify-subtext">
              {track.title} · Select multiple and save instantly
            </p>
          </div>
          <TouchButton
            onClick={closePlaylistToast}
            className="rounded-full p-2 text-spotify-subtext transition-colors hover:bg-white/10 hover:text-white"
            scale={0.85}
          >
            <X size={20} />
          </TouchButton>
        </div>

        <div className="max-h-[280px] overflow-y-auto px-2 py-2">
          {playlists.map((playlist) => (
            <TouchCheckbox
              key={playlist.id}
              checked={selectedPlaylistIds.has(playlist.id)}
              onChange={() => togglePlaylistSelection(playlist.id)}
              label={playlist.name}
              color={playlist.color}
            />
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <TouchButton
            onClick={saveToSelectedPlaylists}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-spotify-green py-3.5 text-sm font-bold text-black transition-colors duration-200 hover:bg-spotify-green-hover"
            scale={0.96}
          >
            <Check size={18} />
            Save
          </TouchButton>
        </div>
      </div>
    </>
  )
}
