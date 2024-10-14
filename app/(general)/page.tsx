import { useSupabaseService } from '@/services/api/supabaseService'

import { Banner, Bottom } from '@/components/home'
import { CompanyContainer } from '@/components/companies'
import { FreelancerContainer } from '@/components/freelancers'
import { JobContainer } from '@/components/jobs'

export default async function Home() {
  const supabaseService = useSupabaseService()
  const companies = await supabaseService.fetchCompanies({ limit: 6, isFeatured: true })
  const freelancers = await supabaseService.fetchFreelancers({ limit: 6, isFeatured: true })
  const jobs = await supabaseService.fetchJobs({ limit: 6, isFeatured: true })

  return (
    <>
      <Banner />
      <CompanyContainer
        isFeatured
        isHomepage
        companies={companies}
      />

      <FreelancerContainer
        isFeatured
        isHomepage
        freelancers={freelancers}
      />

      <JobContainer
        isFeatured
        isHomepage
        jobs={jobs}
      />
      <Bottom />
    </>
  )
}
