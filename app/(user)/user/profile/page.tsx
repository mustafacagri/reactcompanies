'use client'

import { isEmpty } from 'lodash'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { $t } from '@/utils/translationHelper'
import Image from 'next/image'

interface User {
  email: string
  name: string
  picture?: string
  providers?: string[]
}

const initialUser: User = {
  email: '',
  name: '',
  picture: '',
  providers: [],
}

export default function Profile() {
  const [user, setUser] = useState<User>(initialUser)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const updatedUser: User = session?.user?.user_metadata
        ? {
            email: session.user.email ?? '',
            name: session.user.user_metadata.full_name ?? '',
            picture: session.user.user_metadata.avatar_url ?? '',
            providers: session.user.app_metadata?.providers ?? [],
          }
        : initialUser

      setUser(updatedUser)
    })

    // Cleanup listener on unmount
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  if (isEmpty(user)) return null

  return (
    <div className='w-full flex justify-center p-6'>
      <div className='w-full max-w-md flex flex-col items-center bg-white p-8 rounded-lg shadow-lg mx-auto'>
        {user.picture && (
          <Image
            alt={user.name}
            src={user.picture}
            className='rounded-full w-24 h-24 mb-6'
            width={96}
            height={96}
          />
        )}

        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{user.name}</h2>
        <p className='text-gray-600 mb-6'>{user.email}</p>

        {Array.isArray(user.providers) && user.providers.length > 0 && (
          <>
            <p className='text-primary-700'>{$t('user.profile.loginProviders')}</p>
            <div className='flex space-x-4 mt-2'>
              {user.providers.map(provider => (
                <span
                  key={provider}
                  className='px-6 py-2 bg-secondary-700 text-white rounded-full text-sm'
                >
                  {provider}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
