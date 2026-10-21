import { createContext, useContext, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setUser, clearUser, setLoading } from '../store/slices/authSlice'
import { getMe, login, logout, LoginCredentials } from '../api/auth'
import type { AuthUser } from '../store/slices/authSlice'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  handleLogin: (credentials: LoginCredentials) => Promise<void>
  handleLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  // Check if user is already logged in on app load
  useEffect(() => {
    dispatch(setLoading(true))
    getMe()
      .then((user) => dispatch(setUser(user)))
      .catch(() => dispatch(clearUser()))
  }, [dispatch])

  const handleLogin = async (credentials: LoginCredentials) => {
    const user = await login(credentials)
    dispatch(setUser(user))
  }

  const handleLogout = async () => {
    await logout()
    dispatch(clearUser())
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}