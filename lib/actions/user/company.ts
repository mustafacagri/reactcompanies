import { capitalize } from 'lodash'
import { Company } from '@/interfaces'
import { supabase } from '@/lib/supabase'
import { $t } from '@/utils/translationHelper'

export async function updateCompany({ formData }: { formData: Company }) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user?.id) {
      const {
        name,
        headquarters,
        logo,
        github,
        linkedin,
        medium,
        website,
        description,
        country,
        founded_year,
        is_remote,
        is_hybrid,
        is_hiring,
        user_id,
      } = formData

      const payload: { [key: string]: string | number | boolean | null | undefined } = {
        name,
        headquarters,
        logo,
        github,
        linkedin,
        medium,
        website,
        description,
        country,
        founded_year,
        is_remote,
        is_hybrid,
        is_hiring,
        user_id,
      }

      const mandatoryFields = ['name', 'description', 'logo', 'website', 'description', 'country']

      for (const field of mandatoryFields) {
        if (!payload?.[field]) {
          throw new Error($t('user.company.form.errorField', [capitalize(field)]))
        }
      }

      const { data, error } = await supabase
        .from('companies')
        .upsert({ ...payload }, { onConflict: 'user_id' })
        .select()

      if (error || !data) {
        throw new Error('user.company.form.error')
      }

      return data
    }
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
