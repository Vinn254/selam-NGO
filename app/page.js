import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import LatestUpdates from '@/components/LatestUpdates'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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

export default async function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <BentoGrid />
        <LatestUpdates />
      </main>
      <Footer />
    </>
  )
}
