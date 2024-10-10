import { Freelancer } from '@/interfaces'
import { supabase } from '@/lib/supabase'

export async function updateFreelancer({ formData }: { formData: Freelancer }) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user?.id) {
      const {
        country,
        currency,
        description,
        github,
        linkedin,
        medium,
        name,
        per_hour_price,
        title,
        username,
        website,
      } = formData

      const payload = {
        country,
        currency,
        description,
        github,
        linkedin,
        medium,
        name,
        per_hour_price,
        title,
        username,
        website,
      }

      const { data, error } = await supabase
        .from('freelancers')
        .upsert({ ...payload }, { onConflict: 'user_id' })
        .select()

      if (error || !data) {
        throw new Error('user.freelancer.form.error')
      }

      return data
    }
  } catch (error) {
    console.log(error)
  }
}
