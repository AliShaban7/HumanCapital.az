import { create } from 'zustand'

export type UserRole = 'CANDIDATE' | 'COMPANY'

interface User {
  id: string
  email: string
  role: UserRole
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

const getStoredAuth = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('auth-storage')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return { user: parsed.user, token: parsed.token }
      } catch {
        return { user: null, token: null }
      }
    }
  }
  return { user: null, token: null }
}

const stored = getStoredAuth()

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: stored.user,
  token: stored.token,
  setAuth: (user, token) => {
    localStorage.setItem('auth-storage', JSON.stringify({ user, token }))
    set({ user, token })
  },
  logout: () => {
    localStorage.removeItem('auth-storage')
    set({ user: null, token: null })
  },
  isAuthenticated: () => !!get().token && !!get().user,
}))

