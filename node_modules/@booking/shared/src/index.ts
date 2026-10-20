export const APP_NAME = 'My Template App'

// Shared types that both client and server will use
export interface User {
  id: number
  name: string
  email: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
