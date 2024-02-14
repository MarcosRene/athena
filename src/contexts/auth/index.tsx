import { createContext, useCallback, useContext, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/services/api'

import {
  AuthContextData,
  AuthData,
  AuthProviderProps,
  SignInCredentials,
} from './types'
import { composeStorageKey } from '@/utils/compose-storage-key'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const getInitialState = useCallback(() => {
    const tokenStorate = localStorage.getItem(composeStorageKey('token'))
    const userStorage = localStorage.getItem(composeStorageKey('user'))

    if (tokenStorate && userStorage) {
      api.defaults.headers.authorization = `Bearer ${tokenStorate}`

      return {
        token: tokenStorate,
        user: JSON.parse(userStorage),
        signed: true,
      }
    }

    return {} as AuthData
  }, [])

  const [data, setData] = useState<AuthData>(getInitialState())

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      setIsLoading(true)

      const { data } = await api.post<AuthData>('/session', credentials)

      const user = {
        ...data.user,
        avatar: `http://localhost:3333/uploads/${data.user.avatar}`,
      }

      api.defaults.headers.authorization = `Bearer ${data?.token}`

      localStorage.setItem(composeStorageKey('token'), data.token)
      localStorage.setItem(composeStorageKey('user'), JSON.stringify(user))

      setData({ token: data.token, user, signed: true })
    } catch (error) {
      toast.error('Não foi possível se autenticar, tente novamente!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(composeStorageKey('token'))
    localStorage.removeItem(composeStorageKey('user'))

    setData({} as AuthData)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signed: data.signed,
        isLoading,
        signIn,
        signOut,
      }}
    >
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
