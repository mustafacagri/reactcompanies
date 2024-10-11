'use client'

import { $t } from '@/utils/translationHelper'
import Image from 'next/image'

import githubIcon from '@/assets/images/icons/github.svg'
import linkedinIcon from '@/assets/images/icons/linkedin.svg'
import mediumIcon from '@/assets/images/icons/medium.svg'

// Define the type for social keys
type SocialKey = 'github' | 'linkedin' | 'medium'

const socials: Record<SocialKey, string> = {
  github: 'https://github.com/mustafacagri/reactcompanies',
  linkedin: 'https://www.linkedin.com/company/reactcompanies',
  medium: 'https://mustafacagri.medium.com/',
}

const icons = {
  github: githubIcon,
  linkedin: linkedinIcon,
  medium: mediumIcon,
}

// Ensure section2Messages is treated as an array or wrap the string in an array
const section2Messages = Array.isArray($t('home.bottom.section2.messages'))
  ? ($t('home.bottom.section2.messages') as unknown as string[]) // First cast to unknown, then to string[]
  : [$t('home.bottom.section2.messages')] // Wrap string in array if not

export default function Bottom() {
  return (
    <div className='bg-secondary-700 text-white py-10 px-6 sm:px-12'>
      <div className='container mx-auto'>
        <div className='flex flex-col sm:flex-row sm:justify-between gap-12'>
          <div className='mb-6 sm:mb-0 sm:w-1/3'>
            <h3 className='text-xl font-bold mb-4'>🚀 {$t('home.bottom.section1.title')}</h3>
            <p className='text-gray-300'>{$t('home.bottom.section1.description')}</p>
          </div>

          <div className='mb-6 sm:mb-0 sm:w-1/3'>
            <h3 className='text-xl font-bold mb-4'>💚 {$t('home.bottom.section2.title')}</h3>

            {section2Messages.map((message: string, index: number) => (
              <p
                key={message}
                className='mt-1'
              >
                {message}
              </p>
            ))}
          </div>

          <div className='sm:w-1/3'>
            <h3 className='text-xl font-bold mb-4'>🗣️ {$t('home.bottom.section3.title')}</h3>

            {Object.values($t('home.bottom.section3.messages')).map((message: string) => (
              <p
                key={message}
                className='mb-4'
              >
                {message}
              </p>
            ))}

            <div className='flex space-x-4'>
              {Object.entries(icons).map(([social, icon]) => (
                <a
                  key={social}
                  href={socials[social as SocialKey]} // Cast social to SocialKey
                  className='bg-white rounded-full p-4 hover:bg-slate-200'
                >
                  <Image
                    src={icon}
                    alt={social}
                    width='24'
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
