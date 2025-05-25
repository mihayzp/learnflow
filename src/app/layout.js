import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthProvider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'LearnFlow - AI-Powered Micro-Learning',
  description: 'Master any skill in just 5 minutes a day with personalized AI-driven lessons',
  keywords: ['AI learning', 'micro-learning', 'personalized education', 'skill development'],
  authors: [{ name: 'LearnFlow Team' }],
  creator: 'LearnFlow',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'LearnFlow - AI-Powered Micro-Learning',
    description: 'Master any skill in just 5 minutes a day',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'LearnFlow',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LearnFlow - AI-Powered Micro-Learning',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}