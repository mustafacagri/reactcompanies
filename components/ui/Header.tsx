'use client'

import isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import { Icon, Logo } from '@/components/ui'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { User } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { useSupabaseService } from '@/services/api/supabaseService'
import { $t } from '@/utils/translationHelper'
import Image from 'next/image'

export function Header() {
  const supabaseService = useSupabaseService()
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [picture, setPicture] = useState('')

  useEffect(() => {
    // Listening to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const user = { ...session.user, ...session.user?.user_metadata }

        setPicture(user?.user_metadata?.avatar_url || '')
        setUser(user)
      } else {
        setUser(null)
      }
    })

    // Cleanup listener on unmount
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await supabaseService.logout()
    setUser(null)
    router.push('/login')
  }

  const [state, setState] = useState({
    isMenuOpen: false,
    isMobileMenuOpen: false,
  })

  const links: { name: string; url: string; isMobile?: boolean }[] = [
    { name: 'header.companies', url: '/companies' },
    { name: 'header.freelancers', url: '/react-freelancers' },
    { name: 'header.jobs', url: '/jobs' },
    { name: 'header.postAJob', url: '/user/post-job', isMobile: true },
  ]

  const toggleMobileMenu = () => {
    setState(prevState => ({
      ...prevState,
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }))
  }

  const toggleDropdown = () => {
    setState(prevState => ({
      ...prevState,
      isMenuOpen: !prevState.isMenuOpen,
    }))
  }

  const userMenu: { name: string; url: string }[] = [
    { name: 'header.userMenu.profile', url: 'profile' },
    { name: 'header.userMenu.myCompany', url: 'company' },
    { name: 'header.userMenu.myJobs', url: 'jobs' },
    { name: 'header.userMenu.myfreelancerAccount', url: 'freelancer' },
  ]

  return (
    <header>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Logo />

          <div className='flex items-center lg:order-2 xs:order-1 relative'>
            <Link
              href='/react-freelancers'
              className='hidden xl:block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
            >
              {$t('header.hire')}
            </Link>
            <Link
              href='/user/post-job'
              className='hidden lg:block text-white bg-secondary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-secondary-600 dark:hover:bg-secondary-700 focus:outline-none dark:focus:ring-secondary-800'
            >
              {$t('header.postAJob')}
            </Link>

            {isEmpty(user) && (
              <Link
                href='/login'
                className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
              >
                {$t('header.login')}
              </Link>
            )}
            {!isEmpty(user) && (
              <div>
                <button
                  className='relative inline-block text-left'
                  onClick={toggleDropdown}
                >
                  <div className='no-select flex items-center cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
                    {picture && (
                      <Image
                        src={picture}
                        className='h-6 w-6 rounded-full mr-2'
                        alt={user?.name ?? ''}
                        width={24}
                        height={24}
                      />
                    )}
                    <span className='mr-1'>{user?.name?.split(' ')?.[0] || ''}</span>
                    {state.isMenuOpen ? '▲' : '▼'}
                  </div>
                </button>

                {state.isMenuOpen && (
                  <div className='absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20'>
                    <ul className='py-1 text-sm text-gray-700 dark:text-gray-200'>
                      {userMenu.map(({ name, url }) => (
                        <li key={url}>
                          <Link
                            href={`/user/${url}`}
                            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
                          >
                            {$t(name)} {/* Ensure translation is applied correctly */}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={logout}
                          className='cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
                        >
                          {$t('header.logout')}
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none ring-2 ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:ring-gray-600'
          >
            <span className='sr-only'>Open main menu</span>
            <Icon name='bars3' />
          </button>

          <div
            className={`${
              state.isMobileMenuOpen ? 'block' : 'hidden'
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 xs:order-2`}
            id='mobile-menu'
          >
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              {links.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className={`block py-2 pr-4 pl-3 rounded lg:p-0 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 block lg:block ${
                      link?.isMobile ? 'block lg:hidden' : 'block lg:block'
                    }`}
                  >
                    {$t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
