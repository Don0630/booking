const FEATURES = [
  { title: 'Book direct', text: 'Best rate guaranteed, free changes up to 48 hours before arrival.' },
  { title: 'Hearth & garden', text: 'Wood stove lounge, herb garden, and a long breakfast table.' },
  { title: 'Dark skies', text: 'Roof terrace with a telescope on clear nights.' },
  { title: 'Slow mornings', text: 'Breakfast served until 11, always with fresh bread.' },
]

export default function Features() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-6 pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Why stay here</p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl">Small on purpose.</h2>
      <p className="mt-3 max-w-[52ch] text-muted-foreground">
        With only six rooms we know every guest by name and every sunrise by heart.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="border-t-2 border-brass pt-3">
            <h3 className="font-display text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}