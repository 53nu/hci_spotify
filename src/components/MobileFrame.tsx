import type { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex min-h-full items-center justify-center bg-[#0a0a0a] p-6">
      <div
        className="relative flex flex-col overflow-hidden rounded-[44px] border border-white/10 bg-spotify-black shadow-2xl shadow-black/80"
        style={{ width: 390, height: 844 }}
      >
        <div className="pointer-events-none absolute left-1/2 top-2 z-50 h-[28px] w-[120px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  )
}
