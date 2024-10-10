'use client'

import { Job } from '@/interfaces'
import { isEmpty } from 'lodash'
import { $t } from '@/utils/translationHelper'
import Link from 'next/link'
import { FlagCountry } from '@/components/ui'

interface JobsProps {
  jobs: ReadonlyArray<Job> | null
}

export default function Jobs({ jobs }: Readonly<JobsProps>) {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>{$t('user.menu.myJobPosts')}</h1>
      {isEmpty(jobs) && (
        <div className='mt-4 text-center'>
          <p className='text-red-500'>{$t('user.jobs.nojob')}</p>
          <p className='mt-4 text-green-500'>
            <Link href='post-job'>➕ {$t('user.menu.postAJob')}</Link>
          </p>
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {!isEmpty(jobs) &&
          jobs?.map((job: Job) => (
            <Link
              key={job.id}
              href={`/user/post-job?url=${job.url}`}
              className='smallBoxCompany bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200'
            >
              <div className='flex items-center'>
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <h3 className='text-md font-semibold text-left'>{job.title}</h3>
                    <span className={`ml-auto text-sm ${job.is_active ? 'text-green-700' : 'text-red-700'}`}>
                      {job.is_active ? $t('generic.active') : $t('generic.waitingForApproval')}
                    </span>
                  </div>

                  <div className='flex items-center mt-1'>
                    {job?.country && <FlagCountry country={job.country} />}
                    <span className='ml-1 inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'>
                      <span className='mx-auto block h-5 w-5 sm:mr-1 sm:h-auto sm:w-auto sm:inline-block'>
                        {job.is_remote ? '✅' : '❌'}
                      </span>
                      {$t('generic.remote')}
                    </span>
                    <span className='ml-1 inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'>
                      <span className='mx-auto block h-5 w-5 sm:mr-1 sm:h-auto sm:w-auto sm:inline-block'>
                        {job.is_hybrid ? '✅' : '❌'}
                      </span>
                      {$t('generic.hybrid')}
                    </span>
                  </div>
                </div>
              </div>

              <p className='mt-4 text-xs text-gray-600 text-left line-clamp-2'>{job.description}</p>
            </Link>
          ))}
      </div>
    </div>
  )
}
