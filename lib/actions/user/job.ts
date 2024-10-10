import { COUNTRIES, CURRENCIES, EMPLOYMENT_TYPES, SENIORITY_LEVELS } from '@/utils/constants'
import { Job } from '@/interfaces'
import { isEmpty } from 'lodash'
import { supabase } from '@/lib/supabase'

export const saveJob = async (job: Job) => {
  try {
    const mandatoryFields = ['title', 'apply_link', 'description']

    for (const field of mandatoryFields) {
      if (isEmpty(job?.[field as keyof Job])) {
        throw new Error(`Field ${field} is mandatory`)
      }
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    job.country =
      job?.country && COUNTRIES?.[job.country.replace(' ', '_') as keyof typeof COUNTRIES] ? job.country : ''
    job.currency = CURRENCIES?.[job.currency as keyof typeof CURRENCIES] ? job.currency : ''
    job.employment_type = job?.employment_type?.filter(type => EMPLOYMENT_TYPES.includes(type)) || []
    job.seniority_level = job?.seniority_level?.filter(level => SENIORITY_LEVELS.includes(level)) || []

    const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('*').eq('user_id', user?.id)

    if (jobsError) {
      console.error(jobsError)
      throw new Error('Error fetching user jobs')
    }

    if (jobsData && jobsData.length >= 5) {
      throw new Error('You cannot post more than 5 jobs.')
    }

    // Step 3: Proceed with the upsert operation
    const { data: dataJob, error: errorUpsert } = await supabase
      .from('jobs')
      .upsert({ ...job }, { onConflict: 'id' }) // Using upsert to handle both insert and update
      .single()

    if (errorUpsert) {
      console.error(errorUpsert)
      throw new Error(errorUpsert.message)
    }

    return dataJob
  } catch (error) {
    console.error(error)
  }
}
