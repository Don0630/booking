import { UserModel } from '../models/user.model.js'

export const UserService = {
  getAllUsers: async () => {
    return UserModel.findAll()
  },

  getUserById: async (id: number) => {
    const user = await UserModel.findById(id)
    if (!user) throw new Error('User not found')
    return user
  },
}