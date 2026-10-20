import { Car, Coffee, Flame, KeyRound, PawPrint, Wifi, MapPin, Bath } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Amenity {
  icon: LucideIcon
  title: string
  text: string
}

const AMENITIES: Amenity[] = [
  { icon: Wifi, title: 'Fast Wi-Fi', text: 'Free in every room' },
  { icon: Coffee, title: 'Breakfast', text: 'Included, until 11 am' },
  { icon: Car, title: 'Free parking', text: 'On site, no booking needed' },
  { icon: PawPrint, title: 'Pet-friendly', text: 'Selected rooms' },
  { icon: MapPin, title: 'Location', text: 'Close to local attractions' },
  { icon: KeyRound, title: 'Self check-in', text: 'Any time, 24 hours' },
  { icon: Flame, title: 'Wood stove', text: 'In the lounge' },
  { icon: Bath, title: 'Deep baths', text: 'In the suites' },
]

export default function Amenities() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-6 pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Good to know</p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl">
        Everything you need, nothing you don&apos;t.
      </h2>

      <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-4">
        {AMENITIES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium leading-tight">{title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}