'use client'

import { COUNTRY_LIST as countries, CURRENCY_LIST as currencies } from '@/utils/constants.js'
import { FormInput, FormSelect, FormTextarea } from '@/components/ui'
import { Freelancer, User } from '@/interfaces'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateFreelancer } from '@/lib/actions/user/freelancer'
import { $t } from '@/utils/translationHelper'

export default function CompanyForm({ freelancer, user }: Readonly<{ freelancer: Freelancer; user: User }>) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    user_id: freelancer?.user_id || user?.id || '',
    name: freelancer?.name || user?.user_metadata?.full_name || '',
    title: freelancer?.title || '',
    username: freelancer?.username || '',
    img: freelancer?.img || '',
    github: freelancer?.github || '',
    medium: freelancer?.medium || '',
    linkedin: freelancer?.linkedin || '',
    email: user?.email || '',
    website: freelancer?.website || '',
    description: freelancer?.description || '',
    country: freelancer?.country || '',
    per_hour_price: freelancer?.per_hour_price || null,
    currency: freelancer?.currency || '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)

    try {
      await updateFreelancer({ formData })
      setIsSuccess(true)
      router.refresh() // Re-fetch the page data to update
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='container mx-auto py-8'
    >
      <h1 className='text-2xl text-primary-700 font-semibold mb-6'>{$t('user.menu.myFreelancerAccount')}</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <FormInput
            name='name'
            title='user.freelancer.form.name'
            value={formData.name}
            onChange={handleInputChange}
            isRequired
          />
        </div>

        <div>
          <FormInput
            name='title'
            title='user.freelancer.form.title'
            value={formData.title}
            onChange={handleInputChange}
            isRequired
          />
        </div>

        <div>
          <FormInput
            name='username'
            title='user.freelancer.form.username'
            value={formData.username}
            onChange={handleInputChange}
            isRequired
          />
        </div>

        <div>
          <FormInput
            name='email'
            title='user.freelancer.form.email'
            value={formData.email}
            onChange={handleInputChange}
            isDisabled
          />
        </div>

        <div>
          <FormInput
            name='img'
            title='user.freelancer.form.img'
            value={formData.img}
            onChange={handleInputChange}
            isRequired
            isDisabled
          />
        </div>

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

        <div>
          <FormInput
            name='linkedin'
            title='user.freelancer.form.linkedin'
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder={$t('user.freelancer.form.linkedinPlaceholder')}
          />
        </div>

        <div>
          <FormInput
            name='website'
            title='user.freelancer.form.website'
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <FormSelect
            name='country'
            title='user.freelancer.form.country'
            value={formData.country}
            options={countries()}
            onChange={handleInputChange}
          />
        </div>

        <div className='flex gap-2 justify-between'>
          <div className='w-full'>
            <FormInput
              type='number'
              name='per_hour_price'
              title='user.freelancer.form.perHourPrice'
              value={formData.per_hour_price}
              onChange={handleInputChange}
            />
          </div>

          <div className='w-full'>
            <FormSelect
              name='currency'
              title='user.freelancer.form.currency'
              value={formData.currency}
              options={currencies()}
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
        />
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='inline-flex justify-center rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 my-4'
      >
        {isLoading ? '...' : $t('user.freelancer.form.save')}
      </button>

      {isSuccess && <p className='text-green-500'>{$t('user.freelancer.form.success')}</p>}
      {isError && <p className='text-red-500'>{$t('user.freelancer.form.error')}</p>}
    </form>
  )
}
