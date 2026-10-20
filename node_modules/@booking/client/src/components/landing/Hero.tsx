export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <img src="/wallpaper.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src="/wallpaper.mp4"
        poster="/wallpaper.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* dark overlay so the white text stays readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-40 pt-32 text-white md:pb-48 md:pt-40">
        <h1 className="font-display max-w-[14ch] text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Redefining Comfort, Creating Memories.
        </h1>
        <p className="mt-5 max-w-[44ch] text-lg text-white/85">
          Six rooms, a wood stove, and the best sunrise in the city. Book direct for the best rate.
        </p>
      </div>
    </section>
  )
}