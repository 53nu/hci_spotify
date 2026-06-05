import type { Playlist, Track } from '../types'

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across the Water',
    albumArt: 'https://picsum.photos/seed/tinydancer/300/300',
    duration: '6:16',
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    albumArt: 'https://picsum.photos/seed/hotelcalifornia/300/300',
    duration: '6:30',
  },
  {
    id: '3',
    title: 'La Bamba',
    artist: 'Los Lobos',
    album: 'La Bamba Original Soundtrack',
    albumArt: 'https://picsum.photos/seed/labamba/300/300',
    duration: '3:06',
  },
  {
    id: '4',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    albumArt: 'https://picsum.photos/seed/bohemian/300/300',
    duration: '5:55',
  },
  {
    id: '5',
    title: 'Despacito',
    artist: 'Luis Fonsi',
    album: 'Vida',
    albumArt: 'https://picsum.photos/seed/despacito/300/300',
    duration: '3:48',
  },
  {
    id: '6',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷',
    albumArt: 'https://picsum.photos/seed/shapeofyou/300/300',
    duration: '3:53',
  },
]

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'liked',
    name: 'Liked Songs',
    trackIds: ['1', '4'],
    color: '#450af5',
  },
  {
    id: 'spanish-rock',
    name: 'Spanish Rock',
    trackIds: ['3', '5'],
    color: '#e13300',
  },
  {
    id: 'english',
    name: 'English Songs',
    trackIds: ['1', '2', '6'],
    color: '#1e3264',
  },
  {
    id: 'chill',
    name: 'Chill Vibes',
    trackIds: ['2'],
    color: '#477d95',
  },
  {
    id: 'workout',
    name: 'Workout Mix',
    trackIds: ['4', '6'],
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
