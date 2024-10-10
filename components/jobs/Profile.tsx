'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Job } from '@/interfaces'
import { Icon, FlagCountry } from '@/components/ui'
import { markData, shortWebsite } from '@/utils/useUtilities'
import { $t } from '@/utils/translationHelper'

import githubIcon from '@/assets/images/icons/github.svg'
import linkedinIcon from '@/assets/images/icons/linkedin.svg'
import mediumIcon from '@/assets/images/icons/medium.svg'

export function JobProfile({ job }: Readonly<{ job: Job }>) {
  const company = Array.isArray(job?.companies) ? job.companies[0] : job.companies
  const [markedDescription, setMarkedDescription] = useState<string>('')

  // Call the hook inside the useEffect and handle the async response
  useEffect(() => {
    async function fetchMarkedDescription() {
      const description = await markData(job.description)
      setMarkedDescription(description)
    }

    fetchMarkedDescription()
  }, [job.description]) // Ensure the effect runs when job.description changes

  type SocialKey = 'github' | 'linkedin' | 'medium'

  const icons: Record<SocialKey, string> = {
    github: githubIcon,
    linkedin: linkedinIcon,
    medium: mediumIcon,
  }

  if (!job) return null

  return (
    <>
      <div className='bg-gray-100 p-8'>
        <div className='max-w-screen-xl mx-auto'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex items-center mb-4 sm:mb-0'>
              <img
                src={company?.logo}
                alt={company?.name}
                width={96}
                height={96}
                className='rounded-full object-cover'
              />
              <div className='ml-6'>
                <h2 className='text-xl font-bold'>{job.title}</h2>
                <Link
                  href={company?.slug ? `/companies/${company.slug}` : '#'}
                  className='block text-gray-600 hover:text-primary-700 mt-1 mb-2'
                >
                  {company?.name}
                </Link>
                {job.country && (
                  <FlagCountry
                    country={job.country}
                    className='mt-1'
                  />
                )}
              </div>
            </div>
            <div>
              <div className='flex flex-col sm:flex-row sm:space-x-4'>
                <div className='flex flex-wrap gap-2 mb-2 sm:mb-0'>
                  {job.currency && job.per_hour_price && (
                    <span className='inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'>
                      <Icon
                        name='banknotes'
                        className='banknotes mr-1 inline-block'
                      />
                      {job.per_hour_price?.toLocaleString()} {job.currency} / {$t('home.freelancers.hour')}
                    </span>
                  )}
                  {Object.entries(icons).map(([key, icon]) => {
                    const socialLink = company?.[key as SocialKey] // Ensuring correct typing for company keys
                    return (
                      socialLink && (
                        <a
                          key={key}
                          href={socialLink}
                          className='bg-slate-50 rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-300'
                        >
                          <Image
                            src={icon}
                            alt={key}
                            width={18}
                            className='inline-block'
                          />
                          <span className='hidden ml-2 xl:inline-block'>{key}</span>
                        </a>
                      )
                    )
                  })}
                </div>
                {company?.website && (
                  <a
                    href={company.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-slate-50 rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-300 mt-1 sm:mt-0'
                  >
                    <Icon
                      name='home'
                      className='inline-block mr-1'
                      size={18}
                    />
                    {shortWebsite(company.website)}
                  </a>
                )}
              </div>
              {Array.isArray(job?.employment_type) && job.employment_type?.length > 0 && (
                <div className='block clear-both mt-2 bg-slate-50 rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-300'>
                  <strong>{$t('jobs.employeeTypes')}</strong> {job.employment_type.join(', ')}
                </div>
              )}
              {Array.isArray(job?.seniority_level) && job?.seniority_level?.length > 0 && (
                <div className='block clear-both mt-2 bg-slate-50 rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-300'>
                  <strong>{$t('jobs.seniorityLevels')}</strong> {job.seniority_level.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 max-w-screen-lg mx-auto p-8 sm:p-0'>
        <div
          className='text-lg description'
          dangerouslySetInnerHTML={{ __html: markedDescription }}
        ></div>

        {job?.apply_link && (
          <Link
            href={job.apply_link}
            target={job.apply_link === '/user/freelancer' ? '_self' : '_blank'}
            className='apply-now-btn inline-block mt-4 text-white bg-primary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
          >
            <span className='emoji mr-2'>🚀</span> {$t('home.applyNow')}
          </Link>
        )}
      </div>
    </>
  )
}
