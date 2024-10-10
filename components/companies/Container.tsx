'use client'

import Box from './Box'
import { Company } from '@/interfaces'
import { isEmpty } from 'lodash'
import { $t } from '@/utils/translationHelper'

export function CompanyContainer({
  companies,
  isFeatured,
}: Readonly<{
  companies?: Company[] | undefined
  isFeatured?: boolean
}>) {
  companies ??= []
  isFeatured ??= false

  return (
    !isEmpty(companies) && (
      <section className={`${isFeatured ? '' : 'bg-slate-50 py-2'}`}>
        <div className='container mx-auto mt-6 mb-12 px-4 sm:px-0'>
          <h2 className='text-2xl text-primary-700 font-bold text-center mb-8'>
            ✨ {$t(isFeatured ? 'homepage.featuredCompanies' : 'header.companies')}
          </h2>

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
