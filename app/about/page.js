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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                About Selam
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Building a brighter future for Kenyan communities through compassion, innovation, and sustainable development
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2024, Selam NGO emerged from a simple yet powerful vision: to create lasting change in Kenya communities through sustainable development and empowerment.
                  </p>
                  <p>
                    What began as a small grassroots initiative has grown into a comprehensive organization serving over 1,000 individuals across 5 regions. Our journey has been marked by dedication, resilience, and an unwavering commitment to the communities we serve.
                  </p>
                  <p>
                    Today, Selam stands as a beacon of hope, implementing integrated programs in education, healthcare, and economic development that transform lives and build self-sufficient communities.
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop"
                  alt="Selam NGO community work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 green-pattern-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="green-card p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A thriving Kenya where every community has access to quality education, healthcare, and sustainable livelihoods. We envision empowered communities that are self-reliant, resilient, and capable of driving their own development.
                </p>
              </div>
              <div className="green-card p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower marginalized communities through integrated development programs that promote self-reliance and dignity. We work alongside communities to build capacity, create opportunities, and foster sustainable change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide our work and define our approach
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '💙', title: 'Compassion', description: 'We lead with empathy and understanding', gradient: 'from-blue-500 to-cyan-500' },
                { icon: '🤝', title: 'Integrity', description: 'We operate with transparency and honesty', gradient: 'from-purple-500 to-pink-500' },
                { icon: '🌱', title: 'Sustainability', description: 'We build solutions that last', gradient: 'from-green-500 to-emerald-500' },
                { icon: '✨', title: 'Excellence', description: 'We strive for the highest impact', gradient: 'from-amber-500 to-orange-500' },
              ].map((value, index) => (
                <div key={index} className="green-card p-6 rounded-2xl text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} mb-4 text-3xl`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-white/90">
                Making a difference, one community at a time
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '50,000+', label: 'Lives Transformed' },
                { number: '15', label: 'Regions Served' },
                { number: '100+', label: 'Active Projects' },
                { number: '200+', label: 'Community Partners' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-display font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Together, we can create lasting change and empower communities across Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/join-us" className="btn-primary">
                Get Involved
              </a>
              <a href="/what-we-do" className="btn-secondary">
                Our Programs
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
