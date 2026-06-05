import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react'

interface TouchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  scale?: number
  className?: string
}

export function TouchButton({
  children,
  scale = 0.92,
  className = '',
  onClick,
  ...props
}: TouchButtonProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      type="button"
      className={`transition-all duration-150 ease-out active:opacity-80 ${className}`}
      style={{
        transform: pressed ? `scale(${scale})` : 'scale(1)',
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
