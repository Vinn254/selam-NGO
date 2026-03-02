import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import LatestUpdates from '@/components/LatestUpdates'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import dbConnect from '@/lib/mongodb'
import localUpdates from '@/data/updates.json'

export const metadata = {
  title: 'SELAM Nuru ya Jamii CBO Kisumu Kenya | Community-Based Organization Empowering Vulnerable Communities',
  description: 'SELAM Nuru ya Jamii CBO Kisumu Kenya - A registered community-based organization addressing urgent social and economic challenges affecting vulnerable families in Kisumu County through education, vocational training, mentorship, and sustainable development programs.',
  keywords: ['SELAM Nuru ya Jamii CBO', 'Community-Based Organization in Kisumu', 'Selam CBO Kenya', 'community empowerment Kenya', 'non-profit organization Kisumu', 'youth and women empowerment', 'poverty and education programs', 'sustainable community development', 'vocational training programs Kenya'],
  openGraph: {
    title: 'SELAM Nuru ya Jamii CBO Kisumu Kenya | Community-Based Organization Empowering Communities',
    'description': 'Discover how SELAM Nuru ya Jamii CBO supports vulnerable communities in Kisumu through education, vocational training, mentorship, and sustainable development initiatives for youth, women, and children.',
    images: ['/og-image.jpg'],
  },
}

// Server-side function to fetch updates
async function getUpdates() {
  try {
    const client = await dbConnect()
    const db = client.db()
    const updates = await db
      .collection('updates')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Convert ObjectId to string
    const serializedUpdates = updates.map(update => ({
      ...update,
      _id: update._id?.toString()
    }))

    // If MongoDB has data, return it; otherwise return local fallback
    if (serializedUpdates.length > 0) {
      return serializedUpdates
    }
    
    return localUpdates.updates || localUpdates || []
  } catch (error) {
    console.error('Error fetching updates:', error.message)
    // Fallback to local updates if MongoDB fails
    return localUpdates.updates || localUpdates || []
  }
}

export default async function HomePage() {
  // Fetch updates server-side
  const initialUpdates = await getUpdates()

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <BentoGrid />
        <LatestUpdates initialUpdates={initialUpdates} />
      </main>
      <Footer />
    </>
  )
}
