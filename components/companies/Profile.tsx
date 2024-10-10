'use client'

import Link from 'next/link'

import { Company, Job } from '@/interfaces'
import { FlagCountry } from '@/components/ui'
import { isEmpty } from 'lodash'
import { JobContainer } from '@/components/jobs'
import { markData, shortWebsite } from '@/utils/useUtilities'
import { socialLinks } from '@/utils/socialMedia'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { useEffect, useState } from 'react'

export function CompanyProfile({ company, jobs }: Readonly<{ company: Company; jobs: Job[] }>) {
  const [markedDescription, setMarkedDescription] = useState<string>('')

  // Call the hook inside the useEffect and handle the async response
  useEffect(() => {
    async function fetchMarkedDescription() {
      const description = await markData(company.description)
      setMarkedDescription(description)
    }

    fetchMarkedDescription()
  }, [company.description]) // Ensure the effect runs when job.description changes

  const workingTypes = [
    { key: 'is_remote' as keyof Company, label: 'Remote' },
    { key: 'is_hybrid' as keyof Company, label: 'Hybrid' },
    { key: 'is_hiring' as keyof Company, label: 'Hiring' },
  ]
    .filter(({ key }) => typeof company?.[key] === 'boolean')
    .map(({ key, label }) => ({
      label,
      value: company[key] ? '✅' : '❌',
    }))

  return (
    <>
      <div className='bg-gray-100 p-8'>
        <div className='max-w-screen-xl mx-auto'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex items-center sm:mb-0'>
              <img
                src={company.logo}
                alt={company.name}
                className='w-24 h-24 rounded-full object-cover'
              />
              <div className='ml-6'>
                <h2 className='text-xl font-bold'>{company.name}</h2>
                <div className='flex flex-col sm:flex-row items-start sm:items-center mt-1'>
                  {company.country && <FlagCountry country={company.country} />}

                  <div className='flex flex-wrap'>
                    {workingTypes.map(({ label, value }) => (
                      <span
                        key={label}
                        className='ml-0 sm:ml-1 inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'
                      >
                        <span className='mx-auto block h-5 w-5 sm:mr-1 sm:h-auto sm:w-auto sm:inline-block'>
                          {value}
                        </span>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row sm:space-x-4'>
              <div className='flex flex-wrap gap-2 mb-2 sm:mb-0'>
                {socialLinks.map(key => {
                  const socialLink = company?.[key]
                  return (
                    socialLink && (
                      <a
                        key={key}
                        href={socialLink}
                        className='bg-slate-50 rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-300'
                      >
                        <SocialIcon type={key} />
                      </a>
                    )
                  )
                })}
              </div>

              {company.website && (
                <Link
                  href={company.website}
                  className='bg-slate-50 rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-300 mt-1 sm:mt-0'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='inline-block mr-1'>🏠</span>
                  {shortWebsite(company.website)}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white mt-8 max-w-screen-lg mx-auto p-8 sm:p-0 sm:pb-4'>
        <div
          className='text-lg'
          dangerouslySetInnerHTML={{ __html: markedDescription }}
        />
      </div>
      {!isEmpty(jobs) && (
        <JobContainer
          jobs={jobs}
          className='bg-slate-50'
        />
      )}
    </>
  )
}
