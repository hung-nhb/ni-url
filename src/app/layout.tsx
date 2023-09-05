import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// ** Import Component
import Footer from '@/view/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ni Url',
  description: 'Shorten your url',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
