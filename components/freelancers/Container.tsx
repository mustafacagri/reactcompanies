'use client'

import Box from './Box'
import { Freelancer } from '@/interfaces'
import { $t } from '@/utils/translationHelper'

export function FreelancerContainer({
  isFeatured,
  freelancers,
}: Readonly<{
  isFeatured?: boolean
  freelancers?: Freelancer[]
}>) {
  freelancers ??= []
  isFeatured = isFeatured ?? false

  if (!freelancers.length) {
    return null
  }

  return (
    <section className='container mx-auto mt-6 mb-12 px-4 sm:px-0'>
      <h2 className='text-2xl text-primary-700 font-bold text-center mb-8'>
        🌟 {$t(isFeatured ? 'homepage.featuredFreelancers' : 'header.freelancers')}
      </h2>

      <div className='flex justify-center'>
        <div
          className={`w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(
            freelancers.length,
            2
          )} xl:grid-cols-${Math.min(freelancers.length, 3)}`}
        >
          {freelancers.map(freelancer => (
            <Box
              key={freelancer.id}
              freelancer={freelancer}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
