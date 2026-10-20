import { Button } from '@/components/ui/button'

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-6 pt-20">
      <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground">
        <h2 className="font-display mx-auto max-w-[16ch] text-3xl font-bold tracking-tight md:text-4xl">
          Your room is waiting.
        </h2>
        <p className="mx-auto mt-3 max-w-[40ch] opacity-90">
          Pick your dates and see exactly which nights are open.
        </p>
        <Button asChild variant="secondary" size="lg" className="mt-6">
          <a href="#search">Check availability</a>
        </Button>
      </div>
    </section>
  )
}