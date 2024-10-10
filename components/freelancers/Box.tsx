'use client'

import Link from 'next/link'
import { Freelancer } from '@/interfaces' // Adjust the import path as necessary
import { Icon, FlagCountry } from '@/components/ui'
import { $t } from '@/utils/translationHelper'
import Image from 'next/image'

export default function FreelancersBox({ freelancer }: Readonly<{ freelancer: Freelancer }>) {
  return (
    <Link
      href={`/react-freelancers/${freelancer.username}`}
      className='bg-white p-4 rounded-lg shadow-sm outline outline-slate-100 hover:shadow-lg hover:border-slate-200'
    >
      <div className='flex items-center'>
        <Image
          src={freelancer.img}
          alt={freelancer?.name}
          className='h-16 w-16 object-contain rounded-lg'
          width={64}
          height={64}
        />
        <div className='ml-4'>
          <h3 className='text-md font-semibold text-left'>{freelancer.name}</h3>

          {freelancer?.country && (
            <div className='flex items-center mt-1'>
              {freelancer?.country && <FlagCountry country={freelancer.country} />}
              {freelancer?.currency && freelancer?.per_hour_price && (
                <span className='ml-1 inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'>
                  <Icon
                    name='banknotes'
                    className='banknotes mr-1 inline-block'
                  />
                  {freelancer.per_hour_price?.toLocaleString()} {freelancer.currency} / {$t('home.freelancers.hour')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <p className='mt-4 text-xs text-gray-600 text-left line-clamp-2'>{freelancer.description}</p>
    </Link>
  )
}
