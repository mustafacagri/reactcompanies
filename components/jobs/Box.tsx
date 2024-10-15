'use client'

import Link from 'next/link'
import { Job } from '@/interfaces' // Adjust the import path as necessary
import { Icon, FlagCountry } from '@/components/ui'
import { $t } from '@/utils/translationHelper'

export default function JobsBox({ job }: Readonly<{ job: Job }>) {
  // Define working types like remote or hybrid directly in the component
  const workingTypes = [
    { key: 'is_remote' as keyof Job, label: $t('generic.remote') },
    { key: 'is_hybrid' as keyof Job, label: $t('generic.hybrid') },
  ]
    .filter(({ key }) => typeof job?.[key] === 'boolean')
    .map(({ key, label }) => ({
      label,
      value: job[key] ? '✅' : '❌',
    }))

  return (
    <div className='bg-white p-4 rounded-lg shadow-sm outline outline-slate-100 hover:shadow-lg hover:border-slate-200'>
      <p className='mb-1 text-xs text-gray-600'>
        {Array.isArray(job?.companies)
          ? job.companies[0]?.name // Access the name of the first company
          : job?.companies?.name}
      </p>
      <h3 className='text-lg font-semibold text-primary-700'>{job.title}</h3>
      <div className='flex items-center mt-1'>
        {job?.country && <FlagCountry country={job.country} />}

        {workingTypes.map(({ label, value }) => (
          <span
            key={label}
            className='ml-1 inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'
          >
            <span className='mx-auto block h-5 w-5 sm:mr-1 sm:h-auto sm:w-auto sm:inline-block'>{value}</span>
            {label}
          </span>
        ))}

        {job?.currency && job?.per_hour_price && (
          <span className='ml-1 inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'>
            <Icon
              name='banknotes'
              className='banknotes block xl:inline-block sm:mr-1'
              size={20}
            />
            {job.per_hour_price.toLocaleString()} {job.currency}
            <span className='sm:hidden 2xl:inline-block ml-1'> / {$t('home.freelancers.hour')}</span>
          </span>
        )}
      </div>

      <Link
        href={`/jobs/${job.url}`}
        className='apply-now-btn mt-4 text-white bg-primary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
      >
        <span className='emoji mr-2'>🚀</span> {$t('home.applyNow')}
      </Link>
    </div>
  )
}
