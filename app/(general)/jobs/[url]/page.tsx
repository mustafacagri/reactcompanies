import { createClient as CreateServerClient } from '@/utils/supabase/server'
import { JobProfile } from '@/components/jobs'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { useSupabaseService } from '@/services/api/supabaseService'
import { SkeletonProfileHeader } from '@/components/ui'

export default async function Profile({ params }: Readonly<{ params: { url: string } }>) {
  const supabaseService = useSupabaseService()
  const supabaseServer = CreateServerClient()
  const { url } = params

  const job = await supabaseService.fetchJob({ url })

  if (!job) {
    notFound()
  } else {
    const applyLink = job.apply_link
    job.apply_link = '/user/freelancer' // we will redirect to freelancer profile page to create one if there is no freelancer profile

    const res = await supabaseServer.auth.getUser()

    if (res?.data?.user) {
      const { data } = await supabaseServer.from('freelancers').select('id').eq('user_id', res.data.user.id).single() // if there is a freelancer profile, we will display the real apply link, else we will redirect to freelancer profile page to create one

      if (data) {
        job.apply_link = applyLink
      }
    }
  }

  return (
    <Suspense fallback={<SkeletonProfileHeader />}>
      <JobProfile job={job} />
    </Suspense>
  )
}
