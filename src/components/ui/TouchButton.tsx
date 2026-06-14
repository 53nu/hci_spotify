import {
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react'

interface TouchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  scale?: number
  className?: string
  /** 리플 효과 끄기 (배경이 밝은 버튼 등) */
  ripple?: boolean
}

interface Ripple {
  x: number
  y: number
  size: number
  key: number
}

export function TouchButton({
  children,
  scale = 0.92,
  className = '',
  ripple = true,
  onClick,
  style,
  ...props
}: TouchButtonProps) {
  const [pressed, setPressed] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const counter = useRef(0)

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    setPressed(true)

    // 모바일 햅틱 피드백 (지원 기기에서만)
    navigator.vibrate?.(8)

    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const key = counter.current++
      setRipples((prev) => [
        ...prev,
        {
          x: e.clientX - rect.left - size / 2,
          y: e.clientY - rect.top - size / 2,
          size,
          key,
        },
      ])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== key))
      }, 500)
    }
  }

  return (
    <button
      type="button"
      className={`relative overflow-hidden transition-all duration-150 ease-out active:opacity-90 ${className}`}
      style={{ ...style, transform: pressed ? `scale(${scale})` : 'scale(1)' }}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={onClick}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.key}
          className="pointer-events-none absolute z-0 animate-ripple rounded-full bg-white/30"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </button>
  )
}
