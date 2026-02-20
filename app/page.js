import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Dynamic imports for better code-splitting and performance
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  loading: () => <div className="h-screen min-h-[600px] max-h-[900px] bg-gradient-to-br from-emerald-800 to-teal-900 animate-pulse" />,
  ssr: true,
})

const BentoGrid = dynamic(() => import('@/components/BentoGrid'), {
  loading: () => <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />,
  ssr: true,
})

const LatestUpdates = dynamic(() => import('@/components/LatestUpdates'), {
  loading: () => <div className="h-96 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />,
  ssr: true,
})

// Fetch updates with optimized caching strategy
async function getUpdates() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // Reduced to 3 seconds
    
    const base = process.env.NEXT_PUBLIC_API_URL || ''
    const res = await fetch(`${base}/api/updates`, {
      cache: 'force-cache', // Cache for better performance
      signal: controller.signal,
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    
    clearTimeout(timeoutId)
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.updates || []
  } catch (error) {
    return []
  }
}

export const metadata = {
  title: 'Home',
  description: 'Selam NGO - Empowering communities through sustainable development, education, healthcare, and social impact initiatives across Kenya.',
  openGraph: {
    title: 'Selam NGO - Empowering Communities',
    description: 'Dedicated to sustainable development and social impact initiatives across Kenya.',
    images: ['/og-image.jpg'],
  },
}

// Enable incremental static regeneration for better caching
export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const updates = await getUpdates()

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <LatestUpdates initialUpdates={updates} />
        <BentoGrid />
      </main>
      <Footer />
    </>
  )
}
