import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import LatestUpdates from '@/components/LatestUpdates'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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
