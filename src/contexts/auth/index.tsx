import { createContext, useCallback, useContext, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/services/api'

import {
  AuthContextData,
  AuthData,
  AuthProviderProps,
  SignInCredentials,
  User,
} from './types'

const initialAuthContextState = {
  user: {
    id: '',
    name: '',
    email: '',
  },
  signed: false,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState<User>(() => {
    const token = localStorage.getItem('@athena:token')
    const userData = localStorage.getItem('@athena:user')

    if (token && userData) {
      return JSON.parse(userData)
    }

    return initialAuthContextState.user
  })

  const [signed, setSigned] = useState(() => {
    const token = localStorage.getItem('@athena:token')

    if (token) {
      return true
    }

    return initialAuthContextState.signed
  })

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      setIsLoading(true)

      const { data } = await api.post<AuthData>('/session', credentials)

      const { token, user } = data

      localStorage.setItem('@athena:token', token)
      localStorage.setItem('@athena:user', JSON.stringify(user))

      api.defaults.headers.authorization = `Bearer ${token}`

      setUser(user)
      setSigned(true)
    } catch (error) {
      toast.error('Não foi possível se autenticar, tente novamente!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@athena:token')
    localStorage.removeItem('@athena:user')

    setUser(initialAuthContextState.user)
    setSigned(initialAuthContextState.signed)
  }, [])

  return (
    <AuthContext.Provider value={{ user, signed, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return authContext
}
