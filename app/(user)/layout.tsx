import '@/app/globals.css'
import type { Metadata } from 'next'
import Layout from '@/components/layouts/User'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['200', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'React Companies Dashboard',
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <link
        rel='icon'
        href='/favicon.ico'
      />
      <body className={poppins.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
