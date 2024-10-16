'use client'

import Head from 'next/head'

import { FlagCountry, Icon } from '@/components/ui'
import { Freelancer } from '@/interfaces'
import { isEmpty } from 'lodash'
import { shortWebsite, markData } from '@/utils/useUtilities'
import { socialLinks } from '@/utils/socialMedia'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { useEffect, useState } from 'react'
import { $t } from '@/utils/translationHelper'
import Image from 'next/image'

export function FreelancerProfile({ freelancer }: Readonly<{ freelancer: Freelancer }>) {
  const [markedDescription, setMarkedDescription] = useState<string>('')

  // Call the hook inside the useEffect and handle the async response
  useEffect(() => {
    async function fetchMarkedDescription() {
      const description = await markData(freelancer.description)
      setMarkedDescription(description)
    }

    fetchMarkedDescription()
  }, [freelancer.description]) // Ensure the effect runs when job.description changes

  useEffect(() => {
    if (!isEmpty(freelancer)) {
      document.title = `${freelancer.name} | Freelancer`
    }
  }, [freelancer])

  if (isEmpty(freelancer)) return null

  return (
    <>
      <Head>
        <title>{$t('vue-freelancer.useHead.title', [freelancer.name])}</title>
        <meta
          name='description'
          content={$t('vue-freelancer.useHead.description', [freelancer.name])}
        />
        <meta
          property='og:title'
          content={`${freelancer.name} | Freelancer`}
        />
        <meta
          property='og:description'
          content={$t('vue-freelancer.useHead.description', [freelancer.name])}
        />
        {freelancer?.img && (
          <meta
            property='og:image'
            content={freelancer?.img}
          />
        )}
      </Head>

      <div className='bg-gray-100 p-8'>
        <div className='max-w-screen-xl mx-auto'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex items-center mb-4 sm:mb-0'>
              {freelancer?.img && (
                <Image
                  src={freelancer.img}
                  alt={freelancer.name}
                  className='w-24 h-24 rounded-full object-cover'
                  width={96}
                  height={96}
                />
              )}
              <div className='ml-6'>
                <h2 className='text-xl font-bold'>{freelancer.name}</h2>
                <p className='text-gray-600'>{freelancer?.title}</p>
                {freelancer?.country && (
                  <FlagCountry
                    country={freelancer.country}
                    xsFlag2Lines={false}
                    className='mt-1'
                  />
                )}
              </div>
            </div>
            <div className='flex flex-col sm:flex-row sm:space-x-4'>
              <div className='flex flex-wrap gap-2 mb-2 sm:mb-0'>
                {freelancer.currency && freelancer.per_hour_price && (
                  <span className='inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'>
                    <Icon
                      name='banknotes'
                      className='banknotes mr-1 inline-block'
                    />
                    {freelancer.per_hour_price?.toLocaleString()} {freelancer.currency} / hour
                  </span>
                )}

                <div className='flex flex-wrap gap-2 mb-2 sm:mb-0'>
                  {socialLinks.map(key => {
                    const socialLink = freelancer?.[key]
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
              </div>

              {freelancer.website && (
                <a
                  href={freelancer.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-slate-50 rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-300 mt-1 sm:mt-0'
                >
                  <span className='inline-block mr-1'>🏠</span>
                  {shortWebsite(freelancer.website)}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 max-w-screen-lg mx-auto p-8 sm:p-0'>
        <div
          className='text-lg description'
          dangerouslySetInnerHTML={{ __html: markedDescription }}
        />
      </div>
    </>
  )
}
