import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b bg-background/90 text-foreground backdrop-blur' : 'text-white',
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <span className="font-display text-xl font-bold tracking-tight">Amity Hotel</span>

        <nav className="flex items-center gap-3 text-sm">
          <a
            href="#rooms"
            className={cn(
              'hidden sm:inline',
              scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white',
            )}
          >
            Rooms
          </a>
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              'hidden sm:inline-flex',
              !scrolled && 'border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white',
            )}
          >
            <Link to="/login">Staff login</Link>
          </Button>
          <Button asChild size="sm">
            <a href="#search">Book now</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}