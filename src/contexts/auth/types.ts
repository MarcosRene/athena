export interface AuthProviderProps {
  children: React.ReactNode
}

export interface SignInCredentials {
  email: string
  password: string
}

export type User = {
  id: string
  name: string
  email: string
  avatar: string
}

export interface AuthContextData {
  user: User
  signed: boolean
  isLoading: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  updateUser: (user: User) => void
}

export interface AuthData {
  user: User
  token: string
  signed: boolean
}
