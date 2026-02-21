import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import LatestUpdates from '@/components/LatestUpdates'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Fetch updates with optimized caching strategy
async function getUpdates() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000)
    
    // Use relative API path - works in both dev and production
    const res = await fetch(`/api/updates`, {
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
  title: 'Selam CBO Kenya | Community-Based Organization in Kisumu Empowering Vulnerable Communities',
  description: 'Selam CBO Kenya is a community-based organization in Kisumu dedicated to empowering vulnerable communities through education, vocational training, mentorship, and sustainable development programs for youth, women, and children.',
  keywords: ['Community-Based Organization in Kisumu', 'Selam CBO Kenya', 'community empowerment Kenya', 'non-profit organization Kisumu', 'youth and women empowerment', 'poverty and education programs', 'sustainable community development', 'vocational training programs Kenya'],
  openGraph: {
    title: 'Selam CBO Kenya | Community-Based Organization Empowering Communities in Kisumu',
    description: 'Discover how Selam CBO supports vulnerable communities in Kisumu through education, vocational training, mentorship, and sustainable development initiatives for youth, women, and children.',
    images: ['/og-image.jpg'],
  },
}

// Enable incremental static regeneration for better caching
export const revalidate = 10 // Revalidate every 10 seconds for faster updates

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
