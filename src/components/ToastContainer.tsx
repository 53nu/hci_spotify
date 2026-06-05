import { CheckCircle, Info, X } from 'lucide-react'
import { useSpotify } from '../context/SpotifyContext'
import { TouchButton } from './ui/TouchButton'

export function ToastContainer() {
  const { toasts, dismissToast } = useSpotify()

  if (toasts.length === 0) return null

  return (
    <div className="absolute bottom-[88px] left-3 right-3 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-up flex items-center gap-3 rounded-lg bg-spotify-green px-4 py-3 shadow-lg"
        >
          {toast.type === 'success' ? (
            <CheckCircle size={20} className="shrink-0 text-black" />
          ) : (
            <Info size={20} className="shrink-0 text-black" />
          )}
          <span className="flex-1 text-sm font-semibold text-black">
            {toast.text}
          </span>
          <TouchButton
            onClick={() => dismissToast(toast.id)}
            className="text-black/70 transition-colors hover:text-black"
            scale={0.85}
          >
            <X size={18} />
          </TouchButton>
        </div>
      ))}
    </div>
  )
}
