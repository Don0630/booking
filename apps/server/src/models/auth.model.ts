import { prisma } from '../db/index.js'

export const AuthModel = {
  createRefreshToken: async (data: { token: string; userId: number; expiresAt: Date }) => {
    return prisma.refreshToken.create({ data })
  },

  findRefreshToken: async (token: string) => {
    return prisma.refreshToken.findUnique({ where: { token } })
  },

  deleteRefreshToken: async (token: string) => {
    return prisma.refreshToken.deleteMany({ where: { token } })
  },

  deleteAllUserRefreshTokens: async (userId: number) => {
    return prisma.refreshToken.deleteMany({ where: { userId } })
  },
}