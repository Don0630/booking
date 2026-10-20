import { Request, Response } from 'express'
import { UserService } from '../services/user.service.js'

export const UserController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers()
      res.json({ success: true, data: users, message: 'Users fetched successfully' })
    } catch (error) {
      res.status(500).json({ success: false, data: null, message: (error as Error).message })
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const user = await UserService.getUserById(Number(req.params.id))
      res.json({ success: true, data: user, message: 'User fetched successfully' })
    } catch (error) {
      res.status(404).json({ success: false, data: null, message: (error as Error).message })
    }
  },
}