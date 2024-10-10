export type { User } from './User'

export type Company = {
  id?: string
  name?: string
  description?: string
  founded_year?: number | null
  github?: string | null
  linkedin?: string | null
  medium?: string | null
  logo?: string
  website?: string | null
  headquarters?: string | null
  contact?: string | null
  country?: string
  is_active?: boolean
  is_featured?: boolean
  is_hiring?: boolean
  is_hybrid?: boolean
  is_remote?: boolean
  slug?: string
  user_id?: string
  created_at?: string
  updated_at?: string
}

export interface Freelancer {
  user_id?: string
  id?: string
  email?: string
  name: string
  title?: string
  username: string
  img: string
  github?: string
  linkedin?: string
  medium?: string
  website?: string
  description?: string
  country?: string
  per_hour_price?: string | null
  currency?: string
  is_active?: boolean
  is_featured?: boolean
}

export interface Job {
  apply_link?: string
  company_id?: string
  created_at?: string
  currency?: string
  companies?: Company[] | Company
  country?: string
  description?: string
  employment_type?: string[]
  id?: string
  is_active?: boolean
  is_featured?: boolean
  is_hybrid?: boolean | null
  is_remote?: boolean | null
  per_hour_price?: number | null
  seniority_level?: string[]
  title?: string
  updated_at?: string
  url?: string
  user_id?: string
}
