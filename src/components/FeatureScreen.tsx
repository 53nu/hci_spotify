import { Check, ChevronLeft, Radio, Users, type LucideIcon } from 'lucide-react'
import { useSpotify } from '../context/SpotifyContext'
import type { FeatureId } from '../types'
import { TouchButton } from './ui/TouchButton'

interface FeatureConfig {
  title: string
  tagline: string
  description: string
  icon: LucideIcon
  accent: string
  cta: string
  toast: string
}

const FEATURES: Record<FeatureId, FeatureConfig> = {
  jam: {
    title: 'Jam',
    tagline: 'Jam feature',
    description:
      'Listen together in real time. Friends can join your session and add songs to a shared queue.',
    icon: Users,
    accent: '#1db954',
    cta: 'Invite friends to Jam',
    toast: 'Jam session is ready — share the link to invite friends',
  },
  radio: {
    title: 'Radio',
    tagline: 'Radio feature',
    description:
      'An endless mix of songs picked for you, based on what you are listening to right now.',
    icon: Radio,
    accent: '#8b5cf6',
    cta: 'Start Radio',
    toast: 'Radio started — playing an endless personalized mix',
  },
}

export function FeatureScreen() {
  const { activeFeature, closeFeature, currentTrack, actionTrack, addToast } =
    useSpotify()

  if (!activeFeature) return null

  const config = FEATURES[activeFeature]
  const Icon = config.icon
  const track = actionTrack ?? currentTrack

  return (
    <div
      className="animate-slide-in absolute inset-0 z-[70] flex flex-col bg-spotify-black"
      style={{
        // 불투명한 검정 배경 위에 액센트 그래디언트를 얹음 (뒤 화면 비침 방지)
        backgroundImage: `linear-gradient(180deg, ${config.accent}40 0%, transparent 55%)`,
      }}
    >
      {/* 상단: 뒤로가기 (이전 화면으로 전환) */}
      <div className="flex items-center gap-3 px-4 pb-2 pt-12">
        <TouchButton
          onClick={closeFeature}
          className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
          scale={0.85}
          aria-label="Go back"
        >
          <ChevronLeft size={26} />
        </TouchButton>
        <span className="text-sm font-semibold text-white">{config.title}</span>
      </div>

      {/* 본문: "기능에 도달했음"을 명확히 알리는 영역 */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div
          className="mb-6 flex h-28 w-28 items-center justify-center rounded-full shadow-2xl"
          style={{ backgroundColor: config.accent }}
        >
          <Icon size={56} className="text-black" />
        </div>

        <div
          className="mb-5 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${config.accent}26`, color: config.accent }}
        >
          <Check size={14} strokeWidth={3} />
          {config.tagline}
        </div>

        <h1 className="mb-3 text-3xl font-extrabold text-white">
          {config.title}
        </h1>
        <p className="mb-6 max-w-[280px] text-sm leading-relaxed text-spotify-subtext">
          {config.description}
        </p>

        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <img
            src={track.albumArt}
            alt=""
            className="h-11 w-11 rounded object-cover"
          />
          <div className="min-w-0 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-spotify-subtext">
              Based on
            </p>
            <p className="truncate text-sm font-semibold text-white">
              {track.title}
            </p>
          </div>
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="px-6 pb-10">
        <TouchButton
          onClick={() => {
            addToast(config.toast, 'success')
            closeFeature()
          }}
          className="w-full rounded-full py-3.5 text-sm font-bold text-black transition-transform"
          style={{ backgroundColor: config.accent }}
          scale={0.96}
          ripple={false}
        >
          {config.cta}
        </TouchButton>
      </div>
    </div>
  )
}
