import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Image from 'next/image'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Selam NGO\'s history, mission, vision, and the dedicated team working to empower communities across Kenya through sustainable development initiatives.',
  openGraph: {
    title: 'About Selam NGO - Our Story and Mission',
    description: 'Discover how Selam NGO is transforming lives through education, healthcare, and community development.',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen page-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                ABOUT US
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto text-left">
                SELAM is a non-political, independent, and non-profit Community-Based Organization (CBO) founded in Kisumu, Kenya, that empowers vulnerable communities by fostering solidarity, creating opportunities, and promoting sustainable growth. Established to address gender inequality, poverty, and limited access to education and health services, as well as promote environmental sustainability. The name "Selam," meaning peace, reflects our commitment to inclusive development, human dignity, and community harmony.
              </p>
            </div>
          </div>
        </section>

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
                { title: 'Integrity & Accountability', desc: 'Acting with honesty and taking responsibility', color: 'modern-card-green' },
                { title: 'Inclusivity & Equality', desc: 'Treating everyone equally regardless of background', color: 'modern-card-yellow' },
                { title: 'Community Participation', desc: 'Encouraging everyone to take part', color: 'modern-card-orange' },
                { title: 'Transparency', desc: 'Being open in all that we do', color: 'modern-card-purple' },
                { title: 'Sustainability', desc: 'Committed to sustainable practices', color: 'modern-card-pink' },
                { title: 'Social Justice', desc: 'Standing up for what is right', color: 'modern-card-blue' },
                { title: 'Environmental Responsibility', desc: 'Protecting our environment', color: 'modern-card-cyan' },
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

        {/* Impact Stats */}
        <section className="relative py-20 bg-gradient-to-br from-[#f6c043] via-[#ff9800] to-[#1f8a3a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-white/90">
                Making a difference, one community at a time
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
              {[
                { number: '50,000+', label: 'Lives Transformed', color: 'modern-card-green' },
                { number: '15', label: 'Regions Served', color: 'modern-card-yellow' },
                { number: '100+', label: 'Active Projects', color: 'modern-card-orange' },
                { number: '200+', label: 'Community Partners', color: 'modern-card-purple' },
              ].map((stat, index) => (
                <div key={index} className={`modern-card ${stat.color} text-white text-center`}>
                  <div className="modern-card-content">
                    <div className="text-4xl sm:text-5xl font-display font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg text-white/90">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Together, we can create lasting change and empower communities across Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/join-us" className="modern-card modern-card-green text-white px-8 py-4 inline-block">
                <span className="modern-card-content text-center font-semibold">Get Involved</span>
              </a>
              <a href="/what-we-do" className="modern-card modern-card-blue text-white px-8 py-4 inline-block">
                <span className="modern-card-content text-center font-semibold">Our Programs</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
