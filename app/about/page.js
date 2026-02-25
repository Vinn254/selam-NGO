'use client'

import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Image from 'next/image'

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

// Team members data
const teamMembers = [
  {
    name: 'Robert Owino',
    role: 'Chief Executive Officer (CEO)',
    image: '/PIC1.jpeg',
    description: 'Leading Selam CBO with vision and dedication to community empowerment.',
  },
  {
    name: 'Vincent Mboya',
    role: 'Director',
    image: '/PIC2.jpeg',
    description: 'Driving strategic initiatives and fostering partnerships for sustainable growth.',
  },
  {
    name: 'Rosemary Awuor',
    role: 'Treasurer',
    image: '/PIC3.jpeg',
    description: 'Ensuring transparent financial management and resource allocation.',
  },
]

// Animated counter component
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    const targetNum = parseInt(target.replace(/[^0-9]/g, '')) || target

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * targetNum))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  // Format the number with commas
  const formattedCount = count.toLocaleString()

  return (
    <span ref={ref}>
      {formattedCount}{suffix}
    </span>
  )
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen page-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-[#059669]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                ABOUT US
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto text-left">
                SELAM is a non-political, independent, and non-profit Community-Based Organization (CBO) founded in Kisumu, Kenya, that empowers vulnerable communities by fostering solidarity, creating opportunities, and promoting sustainable growth. Established to address gender inequality, poverty, and limited access to education and health services, as well as promote environmental sustainability. The name "Selam," meaning peace, reflects our commitment to inclusive development, human dignity, and community harmony. Selam CBO launches grassroots initiatives that support youth, women, and children. Through education, vocational training, mentorship, reproductive health advocacy, and economic empowerment, the organization addresses core social challenges, including early pregnancies, substance abuse, and food insecurity. Driven by integrity, inclusivity, and sustainability, Selam CBO cultivates lasting, community-led progress throughout Kisumu County.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The dedicated individuals driving Selam CBO's mission forward
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white/90 text-sm">{member.description}</p>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-semibold text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
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

        {/* Impact Stats */}
        <section className="relative py-20 bg-[#059669]">
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
                { number: '10000', suffix: '+', label: 'Lives Transformed', color: 'modern-card-green-light' },
                { number: '8', suffix: '', label: 'Regions Served', color: 'modern-card-green-teal' },
                { number: '25', suffix: '+', label: 'Active Projects', color: 'modern-card-green-emerald' },
                { number: '50', suffix: '+', label: 'Community Partners', color: 'modern-card-green-mint' },
              ].map((stat, index) => (
                <div key={index} className={`modern-card ${stat.color} text-white text-center`}>
                  <div className="modern-card-content">
                    <div className="text-4xl sm:text-5xl font-display font-bold mb-2">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
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
