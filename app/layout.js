import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'
import BrandTheme from '@/components/BrandTheme'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://selam-ngo.org'),
  title: {
    default: 'Selam NGO - Empowering Communities Through Sustainable Development',
    template: '%s | Selam NGO'
  },
  description: 'Selam is a non-governmental organization dedicated to empowering communities through sustainable development, education, healthcare, and social impact initiatives across Kenya.',
  keywords: ['NGO', 'Kenya', 'Selam', 'sustainable development', 'community empowerment', 'social impact', 'charity', 'non-profit', 'humanitarian'],
  authors: [{ name: 'Selam NGO' }],
  creator: 'Selam NGO',
  publisher: 'Selam NGO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://selam-ngo.org',
    siteName: 'Selam NGO',
    title: 'Selam NGO - Empowering Communities Through Sustainable Development',
    description: 'Selam is a non-governmental organization dedicated to empowering communities through sustainable development, education, healthcare, and social impact initiatives.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Selam NGO - Empowering Communities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selam NGO - Empowering Communities',
    description: 'Dedicated to sustainable development and social impact initiatives across Kenya.',
    images: ['/og-image.jpg'],
    creator: '@SelamNGO',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0284c7' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NGO',
              name: 'Selam NGO',
              description: 'Empowering communities through sustainable development and social impact initiatives',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://selam-ngo.org',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://selam-ngo.org'}/logo.png`,
              sameAs: [
                'https://facebook.com/SelamNGO',
                'https://twitter.com/SelamNGO',
                'https://instagram.com/SelamNGO',
                'https://linkedin.com/company/selam-ngo',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+254712345678',
                contactType: 'Customer Service',
                availableLanguage: ['English', 'Amharic'],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        <BrandTheme />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
