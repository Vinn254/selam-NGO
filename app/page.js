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

  // Replace LatestUpdates on the homepage with a curated set of recent program photos
  const curatedUpdates = [
    {
      id: 'home-pic-1',
      title: 'Mama and Baby Care Support',
      description: 'Young mothers receiving mentorship and nutrition education with essential baby supplies during weekly health sessions.',
      mediaUrl: '/photo1.jpeg',
      createdAt: new Date().toISOString(),
      mediaType: 'image',
    },
    {
      id: 'home-pic-2',
      title: 'EmpowerHer School Initiative',
      description: 'Adolescent girls in Grade 6 and 7 learn menstrual health and personal development with support from mentors.',
      mediaUrl: '/photo2.jpeg',
      createdAt: new Date().toISOString(),
      mediaType: 'image',
    },
    {
      id: 'home-pic-3',
      title: 'Marginalized Aid Program',
      description: 'Weekly visits bringing hope and essential support to vulnerable families and abandoned elderly in the community.',
      mediaUrl: '/photo3.jpeg',
      createdAt: new Date().toISOString(),
      mediaType: 'image',
    },
    {
      id: 'home-pic-4',
      title: 'Kids Fun Time Program',
      description: 'Children engage in dance, games, and learning activities in a safe weekend environment for talent development.',
      mediaUrl: '/photo4.jpeg',
      createdAt: new Date().toISOString(),
      mediaType: 'image',
    },
    {
      id: 'home-pic-5',
      title: 'Community Outreach Activities',
      description: 'Ongoing community engagement showcasing our commitment to empowering vulnerable families through various programs.',
      mediaUrl: '/photo5.jpeg',
      createdAt: new Date().toISOString(),
      mediaType: 'image',
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <BentoGrid />
        <LatestUpdates initialUpdates={curatedUpdates} />
      </main>
      <Footer />
    </>
  )
}
