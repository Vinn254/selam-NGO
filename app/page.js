import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import LatestUpdates from '@/components/LatestUpdates'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Fetch updates at build time with ISR
async function getUpdates() {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/updates`, {
      next: { revalidate: parseInt(process.env.REVALIDATE_TIME) || 60 }, // ISR: revalidate every 60 seconds
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (!res.ok) {
      console.warn('Updates API returned non-OK status:', res.status)
      return []
    }
    
    const data = await res.json()
    return data.updates || []
  } catch (error) {
    // Log but don't throw - gracefully handle API unavailability
    if (error.name === 'AbortError') {
      console.warn('Updates API request timed out')
    } else {
      console.warn('Failed to fetch updates:', error.message)
    }
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

export default async function HomePage() {
  const updates = await getUpdates()

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <BentoGrid />
        <LatestUpdates initialUpdates={updates} />
      </main>
      <Footer />
    </>
  )
}
