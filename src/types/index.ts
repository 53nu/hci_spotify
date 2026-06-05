export interface Track {
  id: string
  title: string
  artist: string
  album: string
  albumArt: string
  duration: string
}

export interface Playlist {
  id: string
  name: string
  trackIds: string[]
  color: string
}

export type TabId = 'home' | 'search' | 'library'

export interface ToastMessage {
  id: string
  text: string
  type: 'success' | 'info'
}
