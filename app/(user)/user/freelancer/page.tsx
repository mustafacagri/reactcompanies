import FreelancerForm from '@/components/user/freelancer/Form'
import { supabase } from '@/lib/supabase'
import { createClient as CreateServerClient } from '@/utils/supabase/server'
import { isEmpty } from 'lodash'
import { notFound } from 'next/navigation'

export default async function FreelancerPage() {
  const supabaseServer = CreateServerClient()

  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  if (isEmpty(user)) {
    return notFound()
  }

  const { data, error } = await supabase.from('freelancers').select('*').eq('user_id', user?.id).single()

  let freelancerData = {
    name: user?.user_metadata?.full_name || '',
    email: user?.email ?? '',
    img: user?.user_metadata?.avatar_url || '',
    username: user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || '',
  }

  if (!error) {
    freelancerData = data
  }

  return (
    <FreelancerForm
      freelancer={freelancerData}
      user={user}
    />
  )
}
