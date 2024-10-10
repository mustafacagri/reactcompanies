import Jobs from '@/components/user/job/Jobs'

import { Company, Job } from '@/interfaces'
import { createClient as CreateServerClient } from '@/utils/supabase/server'
import { isEmpty } from 'lodash'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function JobsPage() {
  const supabaseServer = CreateServerClient()

  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  const { data: company, error: errorCompanies }: PostgrestSingleResponse<Company> = await supabase
    .from('companies')
    .select('id')
    .eq('user_id', user?.id)
    .single()

  if (!isEmpty(errorCompanies) || isEmpty(company)) {
    redirect('/user/company')
  }

  const { data: jobs }: PostgrestSingleResponse<Job[]> = await supabase.from('jobs').select('*').eq('user_id', user?.id)

  return <Jobs jobs={jobs || []} />
}
