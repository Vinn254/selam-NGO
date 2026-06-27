'use client'

import { useEffect, useRef, useState, memo } from 'react'

const visionMission = [
  {
    id: 'vision',
    title: 'Vision',
    description: 'To create a peaceful, empowered, and self-reliant community where everyone has equal opportunity to achieve socio-economic well-being and live with dignity.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    borderColor: 'border-emerald-400',
  },
  {
    id: 'mission',
    title: 'Mission',
    description: 'To collaborate with community members and partners to enhance financial capability, promote social justice, and empower youth, women, and vulnerable families through education, skills development, economic initiatives, health awareness, and environmental sustainability programs.',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    borderColor: 'border-green-400',
  },
]

const objectives = [
  {
    id: 1,
    title: 'Essential Social Services',
    description: 'To promote access to essential social services.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    id: 2,
    title: 'Safe & Healthy Community',
    description: 'To collaborate to ensure the community remains safe, clean, and healthy for all.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Poverty & Disease Alleviation',
    description: 'To support initiatives that address poverty, hunger, illiteracy, and disease.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    id: 4,
    title: 'Skills Training',
    description: 'To provide skills training and income opportunities for youth and women.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-emerald-600 to-green-600',
  },
  {
    id: 5,
    title: 'Sexual & Reproductive Health',
    description: 'To promote sexual and reproductive health awareness and support social well-being.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    gradient: 'from-teal-600 to-emerald-600',
  },
  {
    id: 6,
    title: 'Strategic Partnerships',
    description: 'To leverage resources and build partnerships for community growth.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    id: 7,
    title: 'Economic Projects',
    description: 'To develop sustainable economic projects, such as revolving funds and small businesses.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 8,
    title: 'Unity & Participation',
    description: 'To promote unity, mutual support, and active participation.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 9,
    title: 'Environmental Stewardship',
    description: 'To encourage responsible environmental stewardship and informed climate action.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-teal-500 to-green-500',
  },
]

function BentoGrid() {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const [mounted, setMounted] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.dataset.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-bento-item]')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <section className="py-16 green-pattern-bg" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          data-id="section-header"
          data-bento-item
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            mounted && visibleItems.has('section-header')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Our Foundation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guided by our vision, mission, and core objectives, we work to create lasting positive change in communities across areas in Kenya.
          </p>
        </div>

        {/* Vision & Mission - Large Modern Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {visionMission.map((item, index) => (
            <div
              key={item.id}
              data-id={item.id}
              data-bento-item
              className={`relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-700 ease-out ${
                mounted && visibleItems.has(item.id)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10`} />
              
              {/* Decorative Circle */}
              <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${item.gradient} opacity-20 rounded-full`} />
              <div className={`absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-15 rounded-full`} />
              
              <div className="relative p-10 md:p-12">
                {/* Title with Underline */}
                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                  {item.title}
                  <div className={`h-1 w-20 bg-gradient-to-r ${item.gradient} mt-3 rounded-full`} />
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Objectives - 9 Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
            Objectives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectives.map((item, index) => (
              <div
                key={item.id}
                data-id={`obj-${item.id}`}
                data-bento-item
                className={`green-card p-5 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-700 ease-out ${
                  mounted && visibleItems.has(`obj-${item.id}`)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 text-white`}>
                  {item.icon}
                </div>

                {/* Title */}
                <h4 className="text-base font-display font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="/about"
            className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 group"
          >
            <span>Learn more about our story</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default memo(BentoGrid)
