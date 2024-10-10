import CompanyForm from '@/components/user/company/Form'
import { supabase } from '@/lib/supabase'
import { createClient as CreateServerClient } from '@/utils/supabase/server'
import { isEmpty } from 'lodash'
import { notFound } from 'next/navigation'

export default async function CompanyPage() {
  const supabaseServer = CreateServerClient()

  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  if (isEmpty(user)) {
    return notFound()
  }

  const { data } = await supabase.from('companies').select('*').eq('user_id', user?.id).single()
  const company = data ?? {}

  return (
    <CompanyForm
      company={company}
      user={user}
    />
  )
}
