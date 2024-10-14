'use client'

import ISO6391 from 'iso-3166-1'
import Image from 'next/image'

export function FlagCountry({
  country,
  xsFlag2Lines = true,
  className = '',
}: Readonly<{ country: string; xsFlag2Lines?: boolean; className?: string }>) {
  const flag = country && ISO6391.whereCountry(country)?.alpha2 ? ISO6391.whereCountry(country)?.alpha2 : ''
  const src = flag ? `/flags/${flag.toLowerCase()}.svg` : ''

  const fitCountry = () => country.replace('United States of America', 'USA')

  return (
    <>
      {country && (
        <span className='inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'>
          <Image
            src={src}
            alt={country}
            className={`mx-auto h-5 w-5 mb-1 rounded-full object-cover sm:mb-0 sm:mr-1 sm:inline-block ${
              xsFlag2Lines ? 'block' : 'inline-block'
            } ${className}`}
            width={20}
            height={20}
          />
          {fitCountry()}
        </span>
      )}
    </>
  )
}
