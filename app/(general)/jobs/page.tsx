import { JobContainer } from '@/components/jobs'
import { Suspense } from 'react'
import { useSupabaseService } from '@/services/api/supabaseService'

export default async function Jobs() {
  const supabaseService = useSupabaseService()
  const featuredJobs = await supabaseService.fetchJobs({ isFeatured: true })
  const jobs = await supabaseService.fetchJobs({ isFeatured: false })

  return (
    <>
      <Suspense fallback={<p>Loading ...</p>}>
        <JobContainer
          isFeatured
          jobs={featuredJobs}
          className='bg-white'
        />
      </Suspense>

      <Suspense fallback={<p>Loading ...</p>}>
        <JobContainer jobs={jobs} />
      </Suspense>
    </>
  )
}
