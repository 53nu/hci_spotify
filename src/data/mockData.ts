import type { Playlist, Track } from '../types'

// 외부 이미지 서비스(picsum)는 배포 환경/실기기에서 느리거나 불안정해 사진이 안 뜸.
// → 네트워크 의존 없이 항상 표시되는 그라데이션 앨범 커버를 SVG data URI로 내장.
function cover(c1: string, c2: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'>
<defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
<stop offset='0%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/>
</linearGradient></defs>
<rect width='600' height='600' fill='url(#g)'/>
<circle cx='300' cy='300' r='190' fill='#ffffff' opacity='0.12'/>
<g fill='#ffffff' opacity='0.92'>
<rect x='338' y='190' width='20' height='190' rx='10'/>
<path d='M338 190 q70 8 78 70 q-44 -40 -78 -22 z'/>
<ellipse cx='300' cy='372' rx='56' ry='40'/>
</g>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across the Water',
    albumArt: cover('#ff9966', '#ff5e62'),
    duration: '6:16',
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    albumArt: cover('#f7b733', '#c0392b'),
    duration: '6:30',
  },
  {
    id: '3',
    title: 'La Bamba',
    artist: 'Los Lobos',
    album: 'La Bamba Original Soundtrack',
    albumArt: cover('#ee0979', '#ff6a00'),
    duration: '3:06',
  },
  {
    id: '4',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    albumArt: cover('#7f53ac', '#2b0a3d'),
    duration: '5:55',
  },
  {
    id: '5',
    title: 'Despacito',
    artist: 'Luis Fonsi',
    album: 'Vida',
    albumArt: cover('#11998e', '#38ef7d'),
    duration: '3:48',
  },
  {
    id: '6',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷',
    albumArt: cover('#2193b0', '#6dd5ed'),
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
