import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'
import { AuthModel } from '../models/auth.model.js'

const JWT_SECRET = process.env.JWT_SECRET!
const REFRESH_EXPIRES_DAYS = 30

export const AuthService = {
  login: async (email: string, password: string, rememberMe: boolean) => {
    // Find user
    const user = await UserModel.findByEmail(email)
    if (!user) throw new Error('Invalid email or password')

    // Check password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid email or password')

    // Check status
    if (user.status !== 'Active') throw new Error('Your account is inactive')

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: 15 * 60 }
    )

    // Handle Remember Me
    let refreshToken: string | null = null
    if (rememberMe) {
      refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: REFRESH_EXPIRES_DAYS * 24 * 60 * 60,
      })
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS)

      await AuthModel.createRefreshToken({
        token: refreshToken,
        userId: user.id,
        expiresAt,
      })
    }

    // Return without password
    const { password: _password, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token, refreshToken }
  },

  logout: async (refreshToken?: string) => {
    if (refreshToken) {
      await AuthModel.deleteRefreshToken(refreshToken)
    }
  },

  refresh: async (refreshToken: string) => {
    // Verify token
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: number }

    // Check DB
    const storedToken = await AuthModel.findRefreshToken(refreshToken)
    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new Error('Invalid refresh token')
    }

    // Get user
    const user = await UserModel.findByEmail('')
    if (!user) throw new Error('User not found')

    // New JWT
    const newToken = jwt.sign(
      { id: decoded.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: 15 * 60 }
    )

    const { password: _password, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token: newToken }
  },

  getMe: async (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
    const user = await UserModel.findById(decoded.id)
    if (!user) throw new Error('User not found')
    return user
  },
}