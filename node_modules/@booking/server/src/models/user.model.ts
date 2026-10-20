import { prisma } from '../db/index.js'

export const UserModel = {
  findAll: async () => {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } })
  },

  create: async (data: { name: string; email: string; password: string; role?: string }) => {
    return prisma.user.create({ data })
  },

  update: async (id: number, data: { name?: string; email?: string; role?: string; status?: string }) => {
    return prisma.user.update({ where: { id }, data })
  },

  delete: async (id: number) => {
    return prisma.user.delete({ where: { id } })
  },
}