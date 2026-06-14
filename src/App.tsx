import { BottomNav } from './components/BottomNav'
import { FeatureScreen } from './components/FeatureScreen'
import { MobileFrame } from './components/MobileFrame'
import { GridMenu } from './components/player/GridMenu'
import { PlaylistToast } from './components/player/PlaylistToast'
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
        {/* 어느 탭에서든 곡 옵션/플레이리스트 시트를 띄울 수 있도록 전역 배치 */}
        <PlaylistToast />
        <GridMenu />
        <ToastContainer />
        <BottomNav />
        <FeatureScreen />
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
