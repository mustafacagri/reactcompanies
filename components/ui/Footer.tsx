'use client'

import Link from 'next/link'
import { $t, Locale, setLocale } from '@/utils/translationHelper'

const links: { name: string; url: string }[] = [
  { name: 'header.home', url: '/' },
  { name: 'header.companies', url: '/companies' },
  { name: 'header.freelancers', url: '/react-freelancers' },
  { name: 'header.jobs', url: '/jobs' },
  { name: 'header.contact', url: '/contact' },
]

const languages: { name: string; locale: Locale }[] = [
  { name: 'English', locale: 'en' },
  { name: 'Español', locale: 'es' },
  { name: 'Français', locale: 'fr' },
  { name: 'Deutsch', locale: 'de' },
  { name: 'Polski', locale: 'pl' },
  { name: 'Nederlands', locale: 'nl' },
  { name: 'Русский', locale: 'ru' },
  { name: 'Türkçe', locale: 'tr' },
  { name: '日本語', locale: 'ja' },
  { name: 'العربية', locale: 'ar' },
]

export function Footer({ saveCurrentLocale }: Readonly<{ saveCurrentLocale: (locale: Locale) => void }>) {
  const setLanguage = (locale: Locale) => {
    saveCurrentLocale(locale)
    setLocale(locale)
  }

  return (
    <footer className='bg-white py-8 px-6'>
      <div className='container mx-auto text-center'>
        <nav className='space-x-6 mb-4'>
          {links.map(link => (
            <Link
              key={link.url}
              className='text-gray-700 hover:text-blue-500 cursor-pointer py-3 inline-block sm:py-0'
              href={link.url}
            >
              {$t(link.name)}
            </Link>
          ))}
        </nav>
        <div className='flex flex-wrap justify-center space-x-4 mb-4 text-xs'>
          {languages.map(language => (
            <button
              key={language.locale}
              onClick={() => setLanguage(language.locale)}
              className='text-gray-700 hover:text-blue-500 cursor-pointer py-3 px-4 min-h-[44px] leading-5 sm:py-1 sm:px-2 sm:min-h-[22px]'
            >
              {language.name}
            </button>
          ))}
        </div>
        <p className='text-gray-500'>© 2024 ReactCompanies. {$t('generic.allRightsReserved')}.</p>
        <p className='block cursor-pointer text-gray-800 text-xs mt-4 opacity-90 transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-800 hover:opacity-100'>
          Made with 🚀 React 18, 🔥 Next 14, 🔧 Typescript, 🎁 TailwindCSS, 💚 Supabase and ❤️ in 📍 Istanbul
        </p>
      </div>
    </footer>
  )
}
