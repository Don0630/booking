import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Review {
  quote: string
  name: string
  stay: string
  rating: number
}

// SAMPLE TEXT: replace with real guest reviews before launch
const REVIEWS: Review[] = [
  { quote: 'We came for one night and extended to four.', name: 'Maria S.', stay: 'Hearth Suite', rating: 5 },
  { quote: 'The kind of quiet you forget exists.', name: 'Daniel R.', stay: 'Garden Single', rating: 5 },
  { quote: 'The kids still talk about the loft and the telescope.', name: 'Aiko T.', stay: 'Family Loft', rating: 5 },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-0.5 text-brass">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? 'fill-current' : 'opacity-30'}`} />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-6 pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Guests</p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl">What people say.</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <Card key={r.name}>
            <CardContent className="flex h-full flex-col gap-4">
              <Stars rating={r.rating} />
              <blockquote className="font-display text-lg leading-snug">&ldquo;{r.quote}&rdquo;</blockquote>
              <p className="mt-auto text-sm text-muted-foreground">
                {r.name} &middot; {r.stay}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}