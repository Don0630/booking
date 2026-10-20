import { Bell, Sun, Moon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './theme-provider'

interface NavbarProps {
  onMenuClick: () => void
}

function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger - only on mobile */}
        <Button
          variant="ghost"
          size="icon" 
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </Button>
        <div>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-xs text-muted-foreground hidden sm:block">Welcome back, Admin!</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
          A
        </div>
      </div>
    </header>
  )
}

export default Navbar