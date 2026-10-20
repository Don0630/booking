import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
}

// PLACEHOLDER: these reuse the room photos. For property photos, put files in
// public/gallery/ and change each src to '/gallery/1.jpg', and so on.
const IMAGES: GalleryImage[] = [
  { src: '/rooms/1.jpg', alt: 'Garden-facing room' },
  { src: '/rooms/2.jpg', alt: 'Pine double room' },
  { src: '/rooms/3.jpg', alt: 'Twin room at sunrise' },
  { src: '/rooms/4.jpg', alt: 'Lounge with wood stove' },
  { src: '/rooms/5.jpg', alt: 'Family loft' },
  { src: '/rooms/6.jpg', alt: 'Roof terrace suite' },
]

export default function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = (dir: number) => setIndex((i) => (i + dir + IMAGES.length) % IMAGES.length)

  return (
    <section className="mx-auto max-w-5xl px-5 pb-6 pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Gallery</p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl">A look around.</h2>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => open(i)}
            aria-label={`Enlarge photo: ${img.alt}`}
            className="group aspect-[4/3] overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') step(-1)
          if (e.key === 'ArrowRight') step(1)
        }}
        className="max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        <div className="relative">
          <img
            src={IMAGES[index].src}
            alt={IMAGES[index].alt}
            className="max-h-[80vh] max-w-[92vw] rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute -top-11 right-0 rounded-full p-2 text-white hover:bg-white/15"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          >
            <ChevronRight className="size-5" />
          </button>
          <p className="absolute -bottom-9 left-0 right-0 text-center text-sm text-white/80">
            {index + 1} / {IMAGES.length} &middot; {IMAGES[index].alt}
          </p>
        </div>
      </dialog>
    </section>
  )
}