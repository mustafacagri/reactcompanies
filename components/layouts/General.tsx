'use client'

import { Footer, Header } from '@/components/ui'
import { useEffect, useState } from 'react'

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [currentLocale, setCurrentLocale] = useState('en')

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
