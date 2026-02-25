'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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

// Individual team member card with scroll animation
function TeamMemberCard({ member, index }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform transition-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
        transitionProperty: 'opacity, transform, box-shadow'
      }}
    >
      <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain bg-gray-100"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white/90 text-sm text-center">{member.description}</p>
        </div>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 mb-1">
          {member.name}
        </h3>
        <p className="text-emerald-600 font-semibold text-sm">
          {member.role}
        </p>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The dedicated individuals driving Selam CBO's mission forward
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
