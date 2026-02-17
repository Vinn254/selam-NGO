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
  },
]

export default function WhatWeDoPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <section
            key={program.id}
            className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} mb-6 text-3xl`}>
                    {program.icon}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                    {program.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {program.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                      Key Initiatives:
                    </h3>
                    <ul className="space-y-3">
                      {program.initiatives.map((initiative, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600">{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r ${program.gradient} text-white font-semibold`}>
                    <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    {program.impact}
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
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Our Approach
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                We believe in sustainable, community-driven development
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '👥', title: 'Community-Led', description: 'Local voices guide our programs' },
                { icon: '🔄', title: 'Sustainable', description: 'Building long-term solutions' },
                { icon: '🤲', title: 'Inclusive', description: 'Reaching the most vulnerable' },
                { icon: '📊', title: 'Data-Driven', description: 'Measuring impact and learning' },
              ].map((approach, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-5xl mb-4">{approach.icon}</div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {approach.title}
                  </h3>
                  <p className="text-white/80">{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 green-pattern-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Join Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Be part of the change. Together, we can transform lives and build stronger communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/join-us" className="btn-primary">
                Get Involved
              </a>
              <a href="/partners" className="btn-secondary">
                Become a Partner
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
