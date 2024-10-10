'use client'

import { capitalize } from 'lodash'
import { COUNTRY_LIST as countries } from '@/utils/constants.js'
import { FormInput, FormSelect, FormTextarea } from '@/components/ui'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCompany } from '@/lib/actions/user/company'
import { $t } from '@/utils/translationHelper'
import { Company, User } from '@/interfaces'

export default function CompanyForm({ company, user }: Readonly<{ company: Company; user: User }>) {
  const booleanOptions = [
    { label: $t('generic.Yes'), value: 'true' },
    { label: $t('generic.No'), value: 'false' },
  ] as { label: string; value: string }[]

  const router = useRouter()

  const [formData, setFormData] = useState<Company>({
    user_id: company?.user_id ?? user?.id ?? '',
    name: company?.name ?? '',
    headquarters: company?.headquarters ?? '',
    founded_year: company?.founded_year,
    logo: company?.logo ?? '',
    github: company?.github ?? '',
    medium: company?.medium ?? '',
    linkedin: company?.linkedin ?? '',
    website: company?.website ?? '',
    description: company?.description ?? '',
    country: company?.country ?? '',
    is_remote: company?.is_remote,
    is_hybrid: company?.is_hybrid,
    is_hiring: company?.is_hiring,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)
    setIsError('')

    try {
      const mandatoryFields = ['name', 'description', 'logo', 'website', 'description', 'country']

      for (const field of mandatoryFields) {
        if (!formData?.[field as keyof Company]) {
          setIsError($t('user.company.form.errorField', [capitalize(field)]))

          return
        }
      }

      await updateCompany({ formData })
      setIsSuccess(true)
      router.refresh() // Re-fetch the page data to update
    } catch (error) {
      console.error(error)
      setIsError($t('user.company.form.error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='container mx-auto py-8'
    >
      <h1 className='text-2xl text-primary-700 font-semibold mb-6'>{$t('user.menu.myCompany')}</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormInput
          name='name'
          title='user.company.form.name'
          value={formData.name}
          onChange={handleInputChange}
          isRequired
        />

        <FormInput
          name='headquarters'
          title='user.company.form.headquarters'
          value={formData.headquarters}
          onChange={handleInputChange}
        />

        <FormInput
          name='logo'
          title='user.company.form.logo'
          value={formData.logo}
          onChange={handleInputChange}
          isRequired
        />

        <FormInput
          name='founded_year'
          title='user.company.form.foundedYear'
          type='number'
          value={formData.founded_year}
          onChange={handleInputChange}
        />

        <div className='flex justify-between gap-2'>
          <div className='w-full'>
            <FormInput
              name='github'
              title='user.freelancer.form.github'
              value={formData.github}
              onChange={handleInputChange}
              placeholder={$t('user.freelancer.form.githubPlaceholder')}
            />
          </div>
          <div className='w-full'>
            <FormInput
              name='medium'
              title='user.freelancer.form.medium'
              value={formData.medium}
              onChange={handleInputChange}
              placeholder={$t('user.freelancer.form.mediumPlaceholder')}
            />
          </div>
        </div>

        <FormInput
          name='linkedin'
          title='user.freelancer.form.linkedin'
          value={formData.linkedin}
          onChange={handleInputChange}
          placeholder={$t('user.freelancer.form.linkedinPlaceholder')}
        />

        <FormInput
          name='website'
          title='user.freelancer.form.website'
          value={formData.website}
          onChange={handleInputChange}
          isRequired
        />

        <FormSelect
          name='country'
          title='user.freelancer.form.country'
          value={formData.country}
          options={countries()}
          onChange={handleInputChange}
        />

        <div className='flex gap-2 justify-between'>
          <div className='w-full'>
            <FormSelect
              name='is_remote'
              title='generic.remote'
              value={formData?.is_remote?.toString()}
              options={booleanOptions}
              onChange={handleInputChange}
            />
          </div>

          <div className='w-full'>
            <FormSelect
              name='is_hybrid'
              title='generic.hybrid'
              value={formData.is_hybrid?.toString()}
              options={booleanOptions}
              onChange={handleInputChange}
            />
          </div>

          <div className='w-full'>
            <FormSelect
              name='is_hiring'
              title='generic.hiring'
              value={formData.is_hiring?.toString()}
              options={booleanOptions}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <FormTextarea
          rows={10}
          name='description'
          title='user.freelancer.form.description'
          value={formData.description}
          onChange={handleInputChange}
          isRequired
        />
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='inline-flex justify-center rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 my-4'
      >
        {isLoading ? $t('user.freelancer.form.saving') : $t('user.freelancer.form.save')}
      </button>

      {isSuccess && <p className='text-green-500'>{$t('user.company.form.success')}</p>}
      {isError && <p className='text-red-500'>{isError}</p>}
    </form>
  )
}
