import { useAuth } from '../context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
  X,
} from 'lucide-react'
import { APP_NAME } from '@booking/shared'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  collapsed: boolean
}

function Sidebar({ isOpen, setIsOpen, collapsed }: SidebarProps) {
  const { handleLogout } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    await handleLogout()
    navigate('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-card text-card-foreground border-r flex flex-col z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className={`h-16 border-b flex items-center px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && <h1 className="text-lg font-bold truncate">{APP_NAME}</h1>}
          {/* Mobile close button */}
          {!collapsed && (
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setIsOpen(false)}
              title={collapsed ? item.label : ''}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t">
          <button
            onClick={onLogout}
            title={collapsed ? 'Logout' : ''}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors
              ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar