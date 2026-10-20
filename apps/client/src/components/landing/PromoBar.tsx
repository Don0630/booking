import { useState } from 'react'
import { X } from 'lucide-react'

// Set to null to hide the bar. Only list an offer you will really honor.
const PROMO: string | null = 'Stay 3+ nights and get free late check-out.'
const KEY = 'promo-dismissed'

function wasDismissed() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export default function PromoBar() {
  const [hidden, setHidden] = useState(wasDismissed)
  if (!PROMO || hidden) return null

  const dismiss = () => {
    setHidden(true)
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      // storage unavailable: the bar just returns on the next visit
    }
  }

  return (
    <div className="relative bg-primary px-10 py-2 text-center text-sm text-primary-foreground">
      <a href="#offers" className="hover:underline">
        {PROMO} <span className="font-semibold underline">See offers &rarr;</span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss offer"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-white/15"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}