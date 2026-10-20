import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  toggleSidebarCollapsed,
  toggleSidebarOpen,
  setSidebarOpen,
} from '../store/slices/uiSlice'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch()
  const { sidebarCollapsed, sidebarOpen } = useAppSelector((state) => state.ui)

  const handleMenuClick = () => {
    if (window.innerWidth >= 1024) {
      dispatch(toggleSidebarCollapsed())
    } else {
      dispatch(toggleSidebarOpen())
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={(open) => dispatch(setSidebarOpen(open))}
        collapsed={sidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout