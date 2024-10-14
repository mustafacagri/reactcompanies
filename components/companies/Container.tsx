'use client'

import Box from './Box'
import { Company } from '@/interfaces'
import { isEmpty } from 'lodash'
import { $t } from '@/utils/translationHelper'

export function CompanyContainer({
  companies,
  isFeatured,
  isHomepage = false,
}: Readonly<{
  companies?: Company[]
  isFeatured?: boolean
  isHomepage?: boolean
}>) {
  companies ??= []
  isFeatured ??= false

  const Heading = isHomepage ? 'h2' : isFeatured ? 'h1' : 'h2'
  const titleText = $t(isFeatured ? 'homepage.featuredCompanies' : 'header.companies')

  return (
    !isEmpty(companies) && (
      <section className={`${isFeatured ? '' : 'bg-slate-50 py-2'}`}>
        <div className='container mx-auto mt-6 mb-12 px-4 sm:px-0'>
          <Heading className='text-2xl text-primary-700 font-bold text-center mb-8'>✨ {titleText}</Heading>

          <div className='flex justify-center'>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
              {companies.map(company => (
                <Box
                  key={company.id}
                  company={company}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  )
}
