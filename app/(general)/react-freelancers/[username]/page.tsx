import { Freelancer } from '@/interfaces'
import { FreelancerProfile } from '@/components/freelancers'
import { useSupabaseService } from '@/services/api/supabaseService'

export default async function Profile({ params }: Readonly<{ params: { username: string } }>) {
  const { username } = params

  const supabaseService = useSupabaseService()
  const freelancer: Freelancer | null = await supabaseService.fetchFreelancer({ username })

  if (!freelancer) {
    throw new Error('Freelancer not found')
  }

  return <FreelancerProfile freelancer={freelancer} />
}
