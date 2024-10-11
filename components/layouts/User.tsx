'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Footer, Icon, Logo } from '@/components/ui'

import { $t } from '@/utils/translationHelper'

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [currentLocale, setCurrentLocale] = useState('en')

  // Ensure localStorage is accessed only on the client side
  useEffect(() => {
    localStorage.setItem('currentLocale', currentLocale)
  }, [currentLocale])

  const menu = [
    {
      title: 'user.menu.account',
      links: [
        {
          name: 'user.menu.profileSettings',
          to: '/user/profile',
          icon: 'user',
        },
      ],
    },
    {
      title: 'user.menu.freelancer',
      links: [
        {
          name: 'user.menu.myFreelancerAccount',
          to: '/user/freelancer',
          icon: 'briefcase',
        },
      ],
    },
    {
      title: 'user.menu.company',
      links: [
        {
          name: 'user.menu.myCompany',
          to: '/user/company',
          icon: 'buildingOffice2',
        },
        {
          name: 'user.menu.myJobPosts',
          to: '/user/jobs',
          icon: 'listBullet',
        },
        {
          name: 'user.menu.postAJob',
          to: '/user/post-job',
          icon: 'plusCircle',
        },
      ],
    },
  ]

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpened(false)
  }, [pathname])

  return (
    <div key={currentLocale}>
      <div className='block sm:hidden pointer text-center mb-0'>
        <button
          className='mx-auto inline-block mt-3 rounded-full bg-primary-700 p-4'
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        >
          <Icon
            name='bars3'
            className='mx-auto text-white'
          />
        </button>
      </div>

      <div className='flex'>
        <nav className={`w-64 h-screen bg-slate-50 dark:bg-gray-800 p-4 ${isMenuOpened ? 'block' : 'hidden sm:block'}`}>
          <Logo />

          <ul className='mt-6'>
            {menu.map(section => {
              return (
                <li
                  key={section.title}
                  className='mb-4'
                >
                  <h3 className='text-md font-semibold text-primary-700 dark:text-white mb-2'> {$t(section.title)}</h3>
                  <ul>
                    {section.links.map(({ icon, name, to }) => {
                      return (
                        <li
                          key={name}
                          className='mb-2 flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg'
                        >
                          <Link
                            href={to}
                            className='text-secondary-700 text-sm dark:text-gray-200 flex items-center'
                          >
                            <Icon
                              name={icon}
                              className='inline-block mr-2'
                              size={18}
                            />
                            {$t(name)}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className='flex-1 p-0 px-6 sm:p-6 max-w-full'>
          {children}
          <Footer saveCurrentLocale={setCurrentLocale} />
        </div>
      </div>
    </div>
  )
}
