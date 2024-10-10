import { useSupabaseService } from '@/services/api/supabaseService'
import { FreelancerContainer } from '@/components/freelancers'

export default async function Freelancers() {
  const supabaseService = useSupabaseService()
  const featuredFreelancers = await supabaseService.fetchFreelancers({ isFeatured: true })
  const freelancers = await supabaseService.fetchFreelancers({ isFeatured: false })

  return (
    <>
      <FreelancerContainer
        isFeatured
        freelancers={featuredFreelancers}
      />

      <FreelancerContainer freelancers={freelancers} />
    </>
  )
}
