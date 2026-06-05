import { Check } from 'lucide-react'
import { useState } from 'react'

interface TouchCheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
  color?: string
}

export function TouchCheckbox({
  checked,
  onChange,
  label,
  color = '#535353',
}: TouchCheckboxProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-spotify-elevated/60"
      style={{ transform: pressed ? 'scale(0.98)' : 'scale(1)' }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={onChange}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-all duration-200"
        style={{ backgroundColor: color }}
      >
        <span className="text-xs font-bold text-white">
          {label.charAt(0).toUpperCase()}
        </span>
      </div>
      <span className="flex-1 text-left text-sm font-medium text-white">
        {label}
      </span>
      <div
        className={`flex h-6 w-6 items-center justify-center rounded border-2 transition-all duration-200 ${
          checked
            ? 'border-spotify-green bg-spotify-green'
            : 'border-spotify-subtext bg-transparent'
        }`}
      >
        {checked && <Check size={14} className="text-black" strokeWidth={3} />}
      </div>
    </button>
  )
}
