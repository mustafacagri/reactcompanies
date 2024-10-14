'use client'

import DOMPurify from 'dompurify'
import Head from 'next/head'
import { $t } from '@/utils/translationHelper'

export default function Banner() {
  const sanitizedTemplate = () => {
    const template = $t('homepage.title', ['<h1 class="text-secondary-700 inline-block">', '</h1>', '<br />'])

    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(template)
    }

    return template // Return an empty string or a fallback for server-side
  }

  return (
    <>
      <Head>
        <title>{$t('homepage.titlePlain')}</title>
      </Head>

      <section className='bg-gradient-to-r from-primary-400 to-blue-300 py-16 relative'>
        <div className='container mx-auto max-w-full'>
          <div className='flex flex-col text-center max-w-full'>
            <div className='relative z-10'>
              <div className='mt-4 font-semibold text-[40px] lg:text-7xl xl:text-7xl leading-tight text-white'>
                <div dangerouslySetInnerHTML={{ __html: sanitizedTemplate() }} />
              </div>
              <div className='text-lg lg:text-xl xl:text-3xl text-white mt-8'>{$t('homepage.subtitle')}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
