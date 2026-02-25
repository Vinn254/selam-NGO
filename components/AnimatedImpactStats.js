'use client'

import { useState, useEffect, useRef } from 'react'

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

export default function AnimatedImpactStats() {
  const stats = [
    { number: '10000', suffix: '+', label: 'Lives Transformed', color: 'modern-card-green-light' },
    { number: '8', suffix: '', label: 'Regions Served', color: 'modern-card-green-teal' },
    { number: '25', suffix: '+', label: 'Active Projects', color: 'modern-card-green-emerald' },
    { number: '50', suffix: '+', label: 'Community Partners', color: 'modern-card-green-mint' },
  ]

  return (
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
          {stats.map((stat, index) => (
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
  )
}
