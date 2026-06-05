import { BottomNav } from './components/BottomNav'
import { MobileFrame } from './components/MobileFrame'
import { ToastContainer } from './components/ToastContainer'
import { HomeTab } from './components/tabs/HomeTab'
import { LibraryTab } from './components/tabs/LibraryTab'
import { SearchTab } from './components/tabs/SearchTab'
import { SpotifyProvider, useSpotify } from './context/SpotifyContext'

function AppContent() {
  const { activeTab } = useSpotify()

  return (
    <MobileFrame>
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'library' && <LibraryTab />}
        <ToastContainer />
        <BottomNav />
      </div>
    </MobileFrame>
  )
}

export default function App() {
  return (
    <SpotifyProvider>
      <AppContent />
    </SpotifyProvider>
  )
}
