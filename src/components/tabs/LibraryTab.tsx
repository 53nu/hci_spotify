import { ListMusic, Music2 } from 'lucide-react'
import { MOCK_TRACKS } from '../../data/mockData'
import { useSpotify } from '../../context/SpotifyContext'
import { TouchButton } from '../ui/TouchButton'

export function LibraryTab() {
  const { playlists, playTrack } = useSpotify()

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-4 pt-14">
      <h1 className="mb-1 text-2xl font-bold text-white">Your Library</h1>
      <p className="mb-6 text-xs text-spotify-subtext">
        View songs added to your playlists
      </p>

      <div className="flex flex-col gap-3">
        {playlists.map((playlist) => {
          const tracks = playlist.trackIds
            .map((id) => MOCK_TRACKS.find((t) => t.id === id))
            .filter(Boolean)

          return (
            <div
              key={playlist.id}
              className="rounded-xl bg-spotify-card p-4 transition-colors duration-200"
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-md"
                  style={{ backgroundColor: playlist.color }}
                >
                  <ListMusic size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {playlist.name}
                  </h3>
                  <p className="text-xs text-spotify-subtext">
                    {tracks.length} songs
                  </p>
                </div>
              </div>

              {tracks.length === 0 ? (
                <p className="text-xs text-spotify-subtext">
                  No songs yet
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {tracks.map((track) => (
                    <TouchButton
                      key={track!.id}
                      onClick={() => playTrack(track!)}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-spotify-elevated"
                      scale={0.98}
                    >
                      <img
                        src={track!.albumArt}
                        alt=""
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-xs font-semibold text-white">
                          {track!.title}
                        </p>
                        <p className="truncate text-[10px] text-spotify-subtext">
                          {track!.artist}
                        </p>
                      </div>
                      <Music2 size={14} className="text-spotify-subtext" />
                    </TouchButton>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
