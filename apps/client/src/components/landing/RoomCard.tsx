import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { formatMoney } from '@/lib/hotel'

export interface RoomCardData {
  id: number
  name: string
  description: string
  maxGuests: number
  priceCents: number
  image?: string
}

// fallback tile, shown when a room has no photo or the photo fails to load
const TONES = [
  ['#8fb3a3', '#4f8470'],
  ['#b8913f', '#7a5f2a'],
  ['#7fa3b8', '#3f6b8a'],
  ['#c98a6b', '#8a4f3a'],
  ['#9bb38f', '#5a7d4a'],
  ['#8a8fb8', '#4a4f8a'],
]

export default function RoomCard({ room }: { room: RoomCardData }) {
  const [failed, setFailed] = useState(false)
  const [sky, hill] = TONES[room.id % TONES.length]

  return (
    <Card className="group gap-0 overflow-hidden py-0">
      <div className="h-48 overflow-hidden">
        {room.image && !failed ? (
          <img
            src={room.image}
            alt={room.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <svg viewBox="0 0 300 130" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
            <rect width="300" height="130" fill={sky} />
            <circle cx={60 + (room.id % 6) * 30} cy="34" r="12" fill="#fff" opacity=".7" />
            <path d="M0 100 L70 50 L130 85 L200 35 L300 90 L300 130 L0 130Z" fill={hill} opacity=".85" />
          </svg>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-1.5 px-5 pb-5 pt-4">
        <h3 className="font-display text-xl font-bold">{room.name}</h3>
        <p className="text-xs text-muted-foreground">
          Up to {room.maxGuests} guest{room.maxGuests > 1 ? 's' : ''}
        </p>
        <p className="text-sm">{room.description}</p>

        <div className="mt-auto flex items-baseline justify-between pt-3">
          <span className="font-display text-2xl font-bold">
            {formatMoney(room.priceCents)}{' '}
            <small className="font-sans text-xs font-normal text-muted-foreground">/ night</small>
          </span>
          <a href="#search" className="text-sm font-semibold text-primary hover:underline">
            Check dates
          </a>
        </div>
      </CardContent>
    </Card>
  )
}