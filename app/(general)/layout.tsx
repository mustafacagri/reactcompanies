import '@/app/globals.css'
import type { Metadata } from 'next'
import GeneralLayout from '@/components/layouts/General'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['200', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'React Companies: React Jobs - React.js Developers - React.js Remote Jobs',
  description:
    'React Companies lists companies using React.js and provides job listings for React.js developers and React.js remote jobs.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <GeneralLayout>{children}</GeneralLayout>
      </body>
    </html>
  )
}
