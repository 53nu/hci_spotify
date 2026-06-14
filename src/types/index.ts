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

// 풀스크린으로 전환되는 기능 화면 (잼/라디오 등)
export type FeatureId = 'jam' | 'radio'

export interface ToastMessage {
  id: string
  text: string
  type: 'success' | 'info'
}
