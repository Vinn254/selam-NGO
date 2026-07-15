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
   // Latest updates with new women empowerment program content with SHOFCO
   const curatedUpdates = [
     {
       id: 'home-latest-1',
       title: 'Women Empowerment Program with SHOFCO',
       description: 'Empowering women through skills training and community support in partnership with SHOFCO. Together we are creating sustainable change and building stronger communities.',
       mediaUrl: '/new1.jpeg',
       createdAt: new Date().toISOString(),
       mediaType: 'image',
     },
     {
       id: 'home-latest-2',
       title: 'Vocational Training Workshop - SHOFCO Partnership',
       description: 'Hands-on vocational training session for women in the community. This program, sponsored by SHOFCO, focuses on practical skills development for income generation.',
       mediaUrl: '/vid1.mp4',
       createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
       mediaType: 'video',
     },
     {
       id: 'home-latest-3',
       title: 'Community Women Support Group',
       description: 'Women from the community coming together for support, education, and empowerment activities. Building a network of strong, capable women leaders.',
       mediaUrl: '/new2.jpeg',
       createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
       mediaType: 'image',
     },
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
