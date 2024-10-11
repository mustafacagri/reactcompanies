'use client'

import { Footer, Header } from '@/components/ui'
import { initGA, logPageView } from '@/lib/analytics'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [currentLocale, setCurrentLocale] = useState('en')
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initGA()
    const pagePath = pathname + searchParams.toString()
    logPageView(pagePath)
  }, [pathname, searchParams])

  // Ensure localStorage is accessed only on the client side
  useEffect(() => {
    localStorage.setItem('currentLocale', currentLocale)
  }, [currentLocale])

  return (
    <div key={currentLocale}>
      <Header />
      {children}
      <Footer saveCurrentLocale={setCurrentLocale} />
    </div>
  )
}
