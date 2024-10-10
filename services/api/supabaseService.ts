import type { Company, Freelancer, Job } from '@/interfaces'

import { handlerApiError } from '@/utils/errors/handlerApi'
import { supabase } from '@/lib/supabase'

export const useSupabaseService = () => {
  const jobDefaultSelectFields =
    'id, title, description, employment_type, seniority_level, is_remote, is_hybrid, created_at, updated_at, per_hour_price, currency, url, apply_link, country, companies(id, github, linkedin, logo, medium, name, slug, website)'
  const freelancerDefaultSelectFields =
    'id, name, title, username, img, github, linkedin, website, description, country, per_hour_price, currency, is_featured'

  const companyDefaultSelectFields =
    'id, name, logo, website, github, linkedin, medium, description, country, contact, is_featured, is_hiring, is_hybrid, is_remote, founded_year, headquarters, slug, created_at, updated_at'

  const fetchCompanies = async ({
    limit,
    isFeatured,
  }: {
    limit?: number
    isFeatured?: boolean
  }): Promise<Company[]> => {
    try {
      limit ??= 1000

      // Build the query
      let query = supabase.from('companies').select(companyDefaultSelectFields).eq('is_active', true)

      // Apply filter for isFeatured only if it's defined
      if (typeof isFeatured === 'boolean') {
        query = query.eq('is_featured', isFeatured)
      }

      const { data, error } = await query.limit(limit)

      if (error) throw error

      return data
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
      return []
    }
  }

  const fetchCompany = async ({ slug }: { slug: string }): Promise<Company | null> => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select(companyDefaultSelectFields)
        .eq('slug', slug)
        .single()

      if (error) throw error

      return data
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
      return null
    }
  }

  const fetchFreelancers = async ({
    limit = 1000,
    isFeatured,
  }: {
    limit?: number
    isFeatured?: boolean
  }): Promise<Freelancer[]> => {
    try {
      limit ??= 1000

      let query = supabase.from('freelancers').select(freelancerDefaultSelectFields).eq('is_active', true)

      // Apply filter for isFeatured only if it's defined
      if (typeof isFeatured === 'boolean') {
        query = query.eq('is_featured', isFeatured)
      }

      const { data, error } = await query.limit(limit)

      if (error) throw error

      // Return the mapped freelancer data
      return data.map((item: Freelancer) => ({
        id: item.id,
        username: item.username,
        name: item.name,
        title: item.title,
        img: item.img,
        github: item.github,
        linkedin: item.linkedin,
        website: item.website,
        description: item.description,
        country: item.country,
        per_hour_price: item.per_hour_price,
        currency: item.currency,
        is_active: item.is_active,
        is_featured: item.is_featured,
      }))
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
      return [] // Return an empty array on error
    }
  }

  const fetchFreelancer = async ({ username }: { username: string }): Promise<Freelancer | null> => {
    try {
      const { data, error } = await supabase
        .from('freelancers')
        .select(freelancerDefaultSelectFields)
        .eq('username', username)
        .single()

      if (error) throw error

      return data
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
      return null
    }
  }

  const fetchJobs = async ({
    company_id,
    isFeatured,
    limit = 1000,
  }: {
    company_id?: string
    isFeatured?: boolean
    limit?: number
  }): Promise<Job[] | []> => {
    try {
      limit ??= 1000
      let query = supabase.from('jobs').select(jobDefaultSelectFields).eq('is_active', true)

      query = company_id ? query.eq('company_id', company_id) : query

      // Apply filter for isFeatured only if it's defined
      if (typeof isFeatured === 'boolean') {
        query = query.eq('is_featured', isFeatured)
      }

      const { data, error } = await query.limit(limit)
      if (error) throw error

      return data
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
      return []
    }
  }

  const fetchJob = async ({ url }: { url: string }): Promise<Job | null> => {
    try {
      const { data, error } = await supabase.from('jobs').select(jobDefaultSelectFields).eq('url', url).single()

      if (error) throw error

      return data
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
      return null
    }
  }

  const loginWithLinkedIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${process.env.NEXT_SITE_URL}auth/callback`,
        },
      })
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
    }
  }

  const loginWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `auth/callback`,
        },
      })
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      return { error }
    } catch (error: unknown) {
      // Specify error as unknown here
      handlerApiError(error)
    }
  }

  return {
    fetchCompanies,
    fetchCompany,
    fetchFreelancers,
    fetchFreelancer,
    fetchJob,
    fetchJobs,

    loginWithGithub,
    loginWithLinkedIn,
    logout,
  }
}
