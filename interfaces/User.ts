export type AppMetadata = {
  provider?: string
  providers?: string[]
}

export type UserMetadata = {
  name?: string
  avatar_url?: string
  full_name?: string
  user_name?: string
  preferred_username?: string
}

export type Identity = {
  provider: string
  id: string
}

export interface User {
  name?: string
  app_metadata: AppMetadata
  aud: string
  confirmed_at?: string
  created_at: string
  email?: string
  email_confirmed_at?: string
  id: string
  identities?: Identity[]
  is_anonymous?: boolean
  last_sign_in_at?: string
  phone?: string
  role?: string
  updated_at?: string
  user_metadata: UserMetadata
}
