import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://selam.co.ke'),
  title: {
    default: 'Selam CBO Kisumu Kenya | Community-Based Organization in Kisumu - Empowering Vulnerable Communities',
    template: '%s | Selam CBO Kisumu Kenya'
  },
  description: 'Selam CBO Kisumu Kenya is a community-based organization in Kisumu dedicated to empowering vulnerable communities through sustainable development, education, healthcare, and social impact initiatives for youth, women, and children.',
  keywords: ['Community-Based Organization in Kisumu', 'Selam CBO Kisumu Kenya', 'CBO Kenya', 'community empowerment Kenya', 'non-profit organization Kisumu', 'youth and women empowerment', 'poverty and education programs', 'sustainable community development', 'vocational training Kenya', 'community development Kisumu', 'NGO Kenya', 'charity Kisumu'],
  authors: [{ name: 'Selam CBO Kisumu Kenya' }],
  creator: 'Selam CBO Kisumu Kenya',
  publisher: 'Selam CBO Kisumu Kenya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://selam.co.ke',
    siteName: 'Selam CBO Kisumu Kenya',
    title: 'Selam CBO Kisumu Kenya | Community-Based Organization Empowering Vulnerable Communities',
    description: 'A community-based organization in Kisumu empowering vulnerable communities through education, vocational training, mentorship, and sustainable development programs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Selam CBO Kenya - Community-Based Organization in Kisumu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selam CBO Kisumu Kenya | Community-Based Organization in Kisumu',
    description: 'Empowering vulnerable communities in Kisumu through education, vocational training, and sustainable development.',
    images: ['/og-image.jpg'],
    creator: '@SelamCBO',
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
    canonical: 'https://selam.co.ke/',
  },
  manifest: '/manifest.json',
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
        {/* Google Analytics GA4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N3WF8PG5EX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N3WF8PG5EX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Canonical URL for SEO */}
        <link rel="canonical" href="https://selam.co.ke/" />
        
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NGO',
              name: 'Selam CBO Kisumu Kenya',
              description: 'Community-Based Organization in Kisumu empowering vulnerable communities through education, vocational training, mentorship, and sustainable development for youth, women, and children.',
              url: 'https://selam.co.ke',
              logo: 'https://selam.co.ke/logo.png',
              sameAs: [
                'https://facebook.com/SelamCBO',
                'https://twitter.com/SelamCBO',
                'https://instagram.com/SelamCBO',
                'https://linkedin.com/company/selam-cbo',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+254712345678',
                contactType: 'Customer Service',
                availableLanguage: ['English', 'Kiswahili'],
              },
              areaServed: {
                '@type': 'Place',
                name: 'Kisumu, Kenya',
              },
              serviceType: [
                'Community Development',
                'Education Programs',
                'Vocational Training',
                'Youth Empowerment',
                'Women Empowerment',
                'Healthcare Services',
              ],
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
