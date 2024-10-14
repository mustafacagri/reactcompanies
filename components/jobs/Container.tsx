'use client'

import Box from './Box'
import { Job } from '@/interfaces'
import { $t } from '@/utils/translationHelper'

export function JobContainer({
  className,
  isFeatured,
  isHomepage = false,
  jobs,
}: Readonly<{
  className?: string
  isFeatured?: boolean
  isHomepage?: boolean
  jobs?: Job[]
}>) {
  jobs ??= []
  isFeatured = isFeatured ?? false

  const Heading = isHomepage ? 'h2' : isFeatured ? 'h1' : 'h2'
  const titleText = $t(isFeatured ? 'home.featuredJobs' : 'home.openJobs')

  if (!jobs.length) {
    return null
  }

  return (
    <section className={`px-4 sm:px-0 ${isFeatured ? 'py-12' : 'py-6'} ${className ?? 'mt-6 bg-slate-50'}`}>
      <div className='mx-auto container'>
        <Heading className='text-2xl text-primary-700 font-bold text-center mb-8'>
          {isFeatured ? '🔥' : '🚀'} {titleText}
        </Heading>
        <div className='flex justify-center'>
          <div
            className={`w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(
              jobs.length,
              2
            )} xl:grid-cols-${Math.min(jobs.length, 3)}`}
          >
            {jobs.map(job => (
              <Box
                key={job.id}
                job={job}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
