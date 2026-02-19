import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Image from 'next/image'

export const metadata = {
  title: 'What We Do',
  description: 'Explore Selam NGO\'s comprehensive programs in education, healthcare, and community development. Learn how we empower Kenyan communities through sustainable initiatives.',
  openGraph: {
    title: 'What We Do - Selam NGO Programs',
    description: 'Discover our integrated programs transforming lives across Kenya.',
    images: ['/og-programs.jpg'],
  },
}

const programs = [
  {
    id: 1,
    title: 'Education Programs',
    description: 'Building a foundation for lifelong learning and opportunity',
    initiatives: [
      'School construction and renovation',
      'Scholarship programs for underprivileged students',
      'Teacher training and capacity building',
      'Adult literacy programs',
      'Educational material distribution',
      'Digital learning initiatives',
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    impact: '15,000+ students supported annually',
    icon: '📚',
    color: 'modern-card-green',
  },
  {
    id: 2,
    title: 'Healthcare Services',
    description: 'Delivering essential medical care to underserved communities',
    initiatives: [
      'Mobile health clinics',
      'Maternal and child health programs',
      'Disease prevention and vaccination campaigns',
      'Health education workshops',
      'Medical equipment provision',
      'Community health worker training',
    ],
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop',
    impact: '25,000+ patients treated annually',
    icon: '🏥',
    color: 'modern-card-blue',
  },
  {
    id: 3,
    title: 'Community Development',
    description: 'Empowering communities through sustainable livelihoods',
    initiatives: [
      'Vocational skills training',
      'Microfinance and savings groups',
      'Agricultural development programs',
      'Women empowerment initiatives',
      'Youth employment programs',
      'Infrastructure development',
    ],
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
    impact: '10,000+ individuals economically empowered',
    icon: '🤝',
    color: 'modern-card-orange',
  },
  {
    id: 4,
    title: 'Water & Sanitation',
    description: 'Providing access to clean water and proper sanitation',
    initiatives: [
      'Well drilling and water point construction',
      'Rainwater harvesting systems',
      'Latrine construction',
      'Hygiene education programs',
      'Water committee training',
      'Maintenance and sustainability programs',
    ],
    image: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&h=600&fit=crop',
    impact: '30+ communities with clean water access',
    icon: '💧',
    color: 'modern-card-cyan',
  },
]

const patternSvg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

export default function WhatWeDoPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen page-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1f8a3a] via-[#3aa34a] to-[#f6c043]">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `url("${patternSvg}")` }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                What We Do
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Comprehensive programs designed to create lasting impact and empower communities across Kenya
              </p>
            </div>
          </div>
        </section>

        {/* Programs */}
        {programs.map((program, index) => (
          <section key={program.id} className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className={`modern-card ${program.color} text-white p-8 mb-6`}>
                    <div className="modern-card-content">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 text-3xl">
                        {program.icon}
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                        {program.title}
                      </h2>
                      <p className="text-lg text-white/90 mb-6">
                        {program.description}
                      </p>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-display font-bold mb-4">
                          Key Initiatives:
                        </h3>
                        <ul className="space-y-3">
                          {program.initiatives.map((initiative, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg className="w-6 h-6 text-white mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="text-white/90">{initiative}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`inline-flex items-center px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white font-semibold`}>
                        <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        {program.impact}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Approach Section */}
        <section className="py-20 bg-gradient-to-br from-[#f6c043] via-[#ff9800] to-[#1f8a3a]">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `url("${patternSvg}")` }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Our Approach
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                We believe in sustainable, community-driven development
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
              {[
                { icon: '👥', title: 'Community-Led', description: 'Local voices guide our programs', color: 'modern-card-green' },
                { icon: '🔄', title: 'Sustainable', description: 'Building long-term solutions', color: 'modern-card-yellow' },
                { icon: '🤲', title: 'Inclusive', description: 'Reaching the most vulnerable', color: 'modern-card-orange' },
                { icon: '📊', title: 'Data-Driven', description: 'Measuring impact and learning', color: 'modern-card-purple' },
              ].map((approach, index) => (
                <div key={index} className={`modern-card ${approach.color} text-white p-6 text-center`}>
                  <div className="modern-card-content">
                    <div className="text-5xl mb-4">{approach.icon}</div>
                    <h3 className="text-xl font-display font-bold mb-2">
                      {approach.title}
                    </h3>
                    <p className="text-white/80">{approach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="modern-card modern-card-purple text-white p-8 md:p-12">
              <div className="modern-card-content">
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Join Our Mission
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  Be part of the change. Together, we can transform lives and build stronger communities
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/join-us" className="modern-card modern-card-green text-white px-8 py-4 inline-block">
                    <span className="modern-card-content text-center font-semibold">Get Involved</span>
                  </a>
                  <a href="/partners" className="modern-card modern-card-blue text-white px-8 py-4 inline-block">
                    <span className="modern-card-content text-center font-semibold">Become a Partner</span>
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
