import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service.js'

export const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password, rememberMe } = req.body
      const { user, token, refreshToken } = await AuthService.login(email, password, rememberMe)

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      })

      if (refreshToken) {
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
      }

      res.json({ success: true, data: user, message: 'Login successful' })
    } catch (error) {
      const message = (error as Error).message
      const status = message === 'Your account is inactive' ? 403 : 401
      res.status(status).json({ success: false, message })
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies?.refreshToken
      await AuthService.logout(refreshToken)

      res.clearCookie('token')
      res.clearCookie('refreshToken')

      res.json({ success: true, message: 'Logged out successfully' })
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message })
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies?.refreshToken
      if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'No refresh token' })
      }

      const { user, token } = await AuthService.refresh(refreshToken)

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      })

      res.json({ success: true, data: user, message: 'Token refreshed' })
    } catch (error) {
      res.status(401).json({ success: false, message: (error as Error).message })
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      const token = req.cookies?.token
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' })
      }

      const user = await AuthService.getMe(token)
      res.json({ success: true, data: user, message: 'Authenticated' })
    } catch (error) {
      res.status(401).json({ success: false, message: (error as Error).message })
    }
  },
}