import api from '../lib/axios'
import type { ApiResponse } from '@my-template/shared'

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<ApiResponse<User[]>>('/api/users')
  return data.data
}

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>(`/api/users/${id}`)
  return data.data
}
