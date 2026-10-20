import { CalendarDays, Gift, Percent } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Offer {
  icon: LucideIcon
  tag: string
  title: string
  text: string
}

// SAMPLE OFFERS: only list what you will really honor
const OFFERS: Offer[] = [
  {
    icon: Gift,
    tag: 'Stay 3+ nights',
    title: 'Third night, a little extra',
    text: 'Stay three nights or more and we add a late check-out and a bottle of local wine.',
  },
  {
    icon: CalendarDays,
    tag: 'Midweek',
    title: 'Slow weekdays',
    text: 'Book Sunday to Thursday and get a welcome basket in your room on arrival.',
  },
  {
    icon: Percent,
    tag: 'Book direct',
    title: 'Direct guests first',
    text: 'Book on this site and get free room upgrades when we have a better room available.',
  },
]

export default function Offers() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-6 pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Offers</p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl">Good reasons to book direct.</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {OFFERS.map(({ icon: Icon, tag, title, text }) => (
          <Card key={title} className="border-brass/40">
            <CardContent className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <Badge variant="secondary">{tag}</Badge>
              </div>
              <h3 className="font-display text-xl font-bold leading-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
              <a href="#search" className="mt-auto pt-2 text-sm font-semibold text-primary hover:underline">
                Check dates
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}