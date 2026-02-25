import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import TeamSection from '@/components/TeamSection'
import AnimatedImpactStats from '@/components/AnimatedImpactStats'

export const metadata = {
  title: 'About Us | Selam CBO Kenya - Community-Based Organization in Kisumu',
  description: 'Learn about Selam CBO Kenya, a community-based organization in Kisumu empowering vulnerable communities through education, vocational training, mentorship, and sustainable development for youth, women, and children.',
  keywords: ['About Selam CBO', 'Community-Based Organization Kisumu', 'non-profit organization Kenya', 'youth women children empowerment', 'community development Kisumu', 'CBO Kenya', 'sustainable development organizations', 'gender inequality Kenya'],
  openGraph: {
    title: 'About Selam CBO Kenya | Community-Based Organization Empowering Vulnerable Communities',
    description: 'Discover how Selam CBO Kenya addresses gender inequality, poverty, and limited access to education through community initiatives for youth, women, and children in Kisumu.',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen page-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 bg-[#059669]">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-8">
                ABOUT US
              </h1>
              <div className="space-y-6 text-lg sm:text-xl text-white/90 max-w-4xl mx-auto text-left leading-relaxed">
                <p>
                  SELAM is a non-political, independent, and non-profit Community-Based Organization (CBO) founded in Kisumu, Kenya, that empowers vulnerable communities by fostering solidarity, creating opportunities, and promoting sustainable growth.
                </p>
                <p>
                  Established to address gender inequality, poverty, and limited access to education and health services, as well as promote environmental sustainability. The name "Selam," meaning peace, reflects our commitment to inclusive development, human dignity, and community harmony.
                </p>
                <p>
                  Selam CBO launches grassroots initiatives that support youth, women, and children. Through education, vocational training, mentorship, reproductive health advocacy, and economic empowerment, the organization addresses core social challenges, including early pregnancies, substance abuse, and food insecurity. Driven by integrity, inclusivity, and sustainability, Selam CBO cultivates lasting, community-led progress throughout Kisumu County.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section - Client Component */}
        <TeamSection />

        {/* Organizational Core Values Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Organizational Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Selam CBO launches grassroots initiatives that support youth, women, and children. Through education, vocational training, mentorship, reproductive health advocacy, and economic empowerment, the organization addresses core social challenges, including early pregnancies, substance abuse, and food insecurity. Driven by integrity, inclusivity, and sustainability, Selam CBO cultivates lasting, community-led progress throughout Kisumu County.
              </p>
            </div>

            {/* Modern Animated Core Value Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container mb-12">
              {[
                { title: 'Integrity & Accountability', desc: 'Acting with honesty and taking responsibility', color: 'modern-card-green-light' },
                { title: 'Inclusivity & Equality', desc: 'Treating everyone equally regardless of background', color: 'modern-card-green-teal' },
                { title: 'Community Participation', desc: 'Encouraging everyone to take part', color: 'modern-card-green-emerald' },
                { title: 'Transparency', desc: 'Being open in all that we do', color: 'modern-card-green-mint' },
                { title: 'Sustainability', desc: 'Committed to sustainable practices', color: 'modern-card-green-light' },
                { title: 'Social Justice', desc: 'Standing up for what is right', color: 'modern-card-green-teal' },
                { title: 'Environmental Responsibility', desc: 'Protecting our environment', color: 'modern-card-green-emerald' },
              ].map((value, index) => (
                <div key={index} className={`modern-card ${value.color} text-white`}>
                  <div className="modern-card-content">
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-white/90 text-sm">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats - Client Component */}
        <AnimatedImpactStats />

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="modern-card modern-card-green-extra-light text-gray-900 p-8 md:p-12">
              <div className="modern-card-content">
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Join Us in Making a Difference
                </h2>
                <p className="text-lg text-gray-900/90 mb-8">
                  Together, we can create lasting change and empower communities across Kenya
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/join-us" className="modern-card modern-card-green-bright text-white px-8 py-4 inline-block">
                    <span className="modern-card-content text-center font-semibold">Get Involved</span>
                  </a>
                  <a href="/what-we-do" className="modern-card modern-card-green-vibrant text-white px-8 py-4 inline-block">
                    <span className="modern-card-content text-center font-semibold">Our Programs</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
