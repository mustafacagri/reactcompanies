'use client'

import { capitalize } from 'lodash'
import { COUNTRY_LIST, CURRENCY_LIST, EMPLOYMENT_TYPES_LIST, SENIORITY_LEVELS_LIST } from '@/utils/constants'
import { Company, Job } from '@/interfaces'
import { FormCheckbox, FormInput, FormSelect, FormTextarea, Spinner } from '@/components/ui'
import { saveJob } from '@/lib/actions/user/job'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { $t } from '@/utils/translationHelper'

const booleanOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
]

export default function PostJob({
  company,
  job,
}: Readonly<{
  company: Company
  job: Job | null
}>) {
  const router = useRouter()
  const initialFormData = {
    url: '',
    title: '',
    apply_link: '',
    description: '',
    country: '',
    per_hour_price: null,
    currency: '',
    employment_type: [],
    seniority_level: [],
    is_hybrid: true,
    is_remote: true,
  }

  const [formData, setFormData] = useState<Job>(job || { ...initialFormData })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState('')

  useEffect(() => {
    if (job) {
      setFormData(job)
    }
  }, [job])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string[] | number[] | boolean[]) => {
    setFormData(prev => {
      const newValue = value

      return { ...prev, [name]: newValue }
    })
  }

  const saveJobHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsError('')
    setIsSuccess(false)

    try {
      const mandatoryFields = ['title', 'apply_link', 'country', 'description']

      for (const field of mandatoryFields) {
        if (!formData?.[field as keyof Job]) {
          setIsError($t('user.company.form.errorField', [capitalize(field.replaceAll('_', ' '))]))

          return
        }
      }

      await saveJob(formData)
      setIsSuccess(true)
      setFormData({ ...initialFormData })
      router.push('/user/jobs') // Redirect to the job list page
    } catch (error) {
      console.error(error)
      setIsError($t('user.job.form.error'))
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl text-primary-700 font-semibold mb-6'>
        {$t(job?.id ? 'user.menu.editTheJob' : 'user.menu.postAJob')}
      </h1>

      {isLoading && <Spinner />}
      {!isLoading && (
        <form onSubmit={saveJobHandler}>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FormInput
              name='company'
              title='Company Name'
              value={company.name}
              onChange={handleInputChange}
              isDisabled
            />
            <FormInput
              name='title'
              title='Job Title'
              value={formData.title}
              onChange={handleInputChange}
              isRequired
            />
            <FormInput
              name='apply_link'
              title='Apply Link'
              value={formData.apply_link}
              onChange={handleInputChange}
              isRequired
            />
            <FormSelect
              name='country'
              title='Country'
              value={formData.country}
              options={COUNTRY_LIST()}
              onChange={handleInputChange}
            />
            <FormCheckbox
              name='seniority_level'
              title='Seniority Level'
              value={formData.seniority_level}
              options={SENIORITY_LEVELS_LIST()}
              onChange={handleCheckboxChange}
            />
            <FormCheckbox
              name='employment_type'
              title='Employment Type'
              value={formData.employment_type}
              options={EMPLOYMENT_TYPES_LIST()}
              onChange={handleCheckboxChange}
            />
            <div className='flex gap-2'>
              <div className='w-1/2'>
                <FormSelect
                  name='is_remote'
                  title='Remote?'
                  value={formData.is_remote?.toString()}
                  options={booleanOptions}
                  onChange={handleInputChange}
                />
              </div>
              <div className='w-1/2'>
                <FormSelect
                  name='is_hybrid'
                  title='Hybrid?'
                  value={formData.is_hybrid?.toString()}
                  options={booleanOptions}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <FormInput
                name='per_hour_price'
                title='Per Hour Price'
                type='number'
                value={formData.per_hour_price}
                onChange={handleInputChange}
              />
              <FormSelect
                name='currency'
                title='Currency'
                value={formData.currency}
                options={CURRENCY_LIST()}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='mt-6'>
            <FormTextarea
              name='description'
              title='Job Description'
              rows={8}
              value={formData.description}
              onChange={handleInputChange}
              isRequired
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4'
          >
            {isLoading ? '...' : $t('user.job.form.save')}
          </button>

          {isSuccess && <p className='text-green-500'>{$t('user.job.form.success')}</p>}
          {isError && <p className='text-red-500'>{isError}</p>}
        </form>
      )}
    </div>
  )
}
