import { Home, Library, Search } from 'lucide-react'
import { useSpotify } from '../context/SpotifyContext'
import type { TabId } from '../types'
import { TouchButton } from './ui/TouchButton'

const TABS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'library', label: 'Your Library', icon: Library },
]

export function BottomNav() {
  const { activeTab, setActiveTab } = useSpotify()

  return (
    <nav className="flex min-h-[72px] shrink-0 items-center justify-around border-t border-white/10 bg-spotify-dark px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id
        return (
          <TouchButton
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-spotify-subtext'
            }`}
            scale={0.9}
          >
            <Icon
              size={24}
              strokeWidth={isActive ? 2.5 : 2}
              className="transition-colors duration-200"
            />
            <span className="text-[10px] font-semibold">{label}</span>
          </TouchButton>
        )
      })}
    </nav>
  )
}
