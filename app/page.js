import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import LatestUpdates from '@/components/LatestUpdates'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Fetch updates with optimized caching strategy
async function getUpdates() {
  // Skip fetch during build time to prevent hanging
  if (process.env.NODE_ENV === 'production' && process.env.__NEXT_PRIVATE_BUILD_ID) {
    return []
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000) // Timeout after 2 seconds
    
    const base = process.env.NEXT_PUBLIC_API_URL || ''
    if (!base) {
      clearTimeout(timeoutId)
      return []
    }

    const res = await fetch(`${base}/api/updates`, {
      cache: 'no-store',
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.updates || []
  } catch (error) {
    // Silently fail - return empty array if API is unavailable
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
export const revalidate = 60 // Revalidate every minute for faster updates

export default async function HomePage() {
  const updates = await getUpdates()

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <BentoGrid />
        {updates.length > 0 && <LatestUpdates initialUpdates={updates} />}
      </main>
      <Footer />
    </>
  )
}
