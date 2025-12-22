import { ref } from 'vue'
import { http } from '@/api/http'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

const isAuthenticated = ref<boolean>(localStorage.getItem('authToken') !== null)

export function useAuth() {
  async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await http<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })

    localStorage.setItem('authToken', `Bearer ${response.token}`)
    isAuthenticated.value = true
    return response
  }

  function logout(): void {
    localStorage.removeItem('authToken')
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}

export function checkAuth(): boolean {
  return isAuthenticated.value
}
