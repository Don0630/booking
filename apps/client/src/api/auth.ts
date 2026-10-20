import api from '../lib/axios'
import type { ApiResponse } from '@my-template/shared'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: string
  status: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export const login = async (credentials: LoginCredentials): Promise<AuthUser> => {
  const { data } = await api.post<ApiResponse<AuthUser>>('/api/auth/login', credentials)
  return data.data
}

export const logout = async (): Promise<void> => {
  await api.post('/api/auth/logout')
}

export const getMe = async (): Promise<AuthUser> => {
  const { data } = await api.get<ApiResponse<AuthUser>>('/api/auth/me')
  return data.data
}

export const refreshToken = async (): Promise<AuthUser> => {
  const { data } = await api.post<ApiResponse<AuthUser>>('/api/auth/refresh')
  return data.data
}
