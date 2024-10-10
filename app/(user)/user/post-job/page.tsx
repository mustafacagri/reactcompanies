import PostJob from '@/components/user/job/PostJob'
import { Company, Job } from '@/interfaces'
import { createClient as CreateServerClient } from '@/utils/supabase/server'
import { isEmpty } from 'lodash'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function PostJobPage({ searchParams }: Readonly<{ searchParams: { url: string } }>) {
  let job: Job | null = null
  const { url } = searchParams
  const supabaseServer = CreateServerClient()

  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  const { data: company }: PostgrestSingleResponse<Company> = await supabase
    .from('companies')
    .select('name')
    .eq('user_id', user?.id)
    .single()

  if (isEmpty(company)) {
    redirect('/user/company')
  }

  if (isEmpty(company)) {
    redirect('/user/company')
  }

  if (url) {
    const { data }: PostgrestSingleResponse<Job> = await supabase.from('jobs').select('*').eq('url', url).single()
    job = { ...data }
  }

  return (
    <PostJob
      company={company}
      job={job}
    />
  )
}
