import type { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex h-[100dvh] w-full justify-center bg-[#0a0a0a] sm:items-center sm:p-6">
      {/*
        모바일(기본): 실제 기기 뷰포트를 100dvh로 꽉 채워 바깥 스크롤 제거.
        데스크톱(sm 이상): 기존 폰 목업(둥근 모서리/테두리/노치)으로 미리보기.
      */}
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-spotify-black sm:h-[min(844px,calc(100dvh-3rem))] sm:w-[390px] sm:rounded-[44px] sm:border sm:border-white/10 sm:shadow-2xl sm:shadow-black/80">
        <div className="pointer-events-none absolute left-1/2 top-2 z-50 hidden h-[28px] w-[120px] -translate-x-1/2 rounded-full bg-black sm:block" />
        {children}
      </div>
    </div>
  )
}
