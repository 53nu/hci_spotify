import type { Playlist, Track } from '../types'
// 원곡 앨범 커버를 저장소에 직접 포함 (외부 서비스 의존 없음).
// Vite가 import 시 base 경로/해시를 적용해 정적 자산으로 번들링.
import tinyDancerCover from '../assets/albums/tinydancer.jpg'
import hotelCaliforniaCover from '../assets/albums/hotelcalifornia.jpg'
import laBambaCover from '../assets/albums/labamba.jpg'
import bohemianCover from '../assets/albums/bohemian.jpg'
import despacitoCover from '../assets/albums/despacito.jpg'
import shapeOfYouCover from '../assets/albums/shapeofyou.jpg'

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across the Water',
    albumArt: tinyDancerCover,
    duration: '6:16',
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    albumArt: hotelCaliforniaCover,
    duration: '6:30',
  },
  {
    id: '3',
    title: 'La Bamba',
    artist: 'Los Lobos',
    album: 'La Bamba Original Soundtrack',
    albumArt: laBambaCover,
    duration: '3:06',
  },
  {
    id: '4',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    albumArt: bohemianCover,
    duration: '5:55',
  },
  {
    id: '5',
    title: 'Despacito',
    artist: 'Luis Fonsi',
    album: 'Vida',
    albumArt: despacitoCover,
    duration: '3:48',
  },
  {
    id: '6',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷',
    albumArt: shapeOfYouCover,
    duration: '3:53',
  },
]

// 플레이리스트는 생성돼 있지만 초기에는 담긴 곡이 없음 (모두 빈 상태)
export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'liked',
    name: 'Liked Songs',
    trackIds: [],
    color: '#450af5',
  },
  {
    id: 'spanish-rock',
    name: 'Spanish Rock',
    trackIds: [],
    color: '#e13300',
  },
  {
    id: 'english',
    name: 'English Songs',
    trackIds: [],
    color: '#1e3264',
  },
  {
    id: 'chill',
    name: 'Chill Vibes',
    trackIds: [],
    color: '#477d95',
  },
  {
    id: 'workout',
    name: 'Workout Mix',
    trackIds: [],
    color: '#ba5d07',
  },
]

export const SEARCH_SUGGESTIONS = [
  'tiny dancer',
  'hotel california',
  'bohemian rhapsody',
  'despacito',
  'shape of you',
  'la bamba',
]
