'use client'

import { useState, useEffect, useRef, memo, useCallback } from 'react'
import Image from 'next/image'

// Import local updates as fallback
import localUpdates from '@/data/updates.json'

// Get API URL safely for client-side (falls back to relative path when not set)
const getApiUrl = () => {
  return typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : ''
}

function LatestUpdates({ initialUpdates = [] }) {
  // Use local updates as fallback when no initial updates provided
  const defaultUpdates = localUpdates?.updates || localUpdates || []
  const [updates, setUpdates] = useState(initialUpdates.length > 0 ? initialUpdates : defaultUpdates)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sliderRef = useRef(null)
  const sectionRef = useRef(null)
  const apiUrl = getApiUrl()
  const fetchTimeoutRef = useRef(null)

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Only fetch once when visible
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Optimized fetch updates with better caching
  const fetchUpdates = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/updates', {
        cache: 'no-store',
      })
      
      if (response.ok) {
          const data = await response.json()
          setUpdates(data.updates || [])
        }
      } catch (error) {
      console.error('Failed to fetch updates:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch updates on mount
  useEffect(() => {
    // Always fetch fresh updates on mount
    fetchUpdates()

    // Fetch fresh updates every 30 seconds
    const interval = setInterval(fetchUpdates, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [fetchUpdates])

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  // Always show the section if we have local updates
  const showSection = updates.length > 0 || localUpdates?.updates?.length > 0 || localUpdates?.length > 0

  if (!showSection) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-16 green-pattern-bg" id="updates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Latest Updates
            </h2>
            <p className="text-lg text-gray-600">
              See what we've been doing in our communities
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-200"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-200"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Updates Slider */}
        <div
          ref={sliderRef}
          className={`updates-slider transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {isLoading && updates.length === 0 ? (
            // Loading Skeletons
            [...Array(3)].map((_, i) => (
              <div key={i} className="update-card">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="skeleton h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <div className="skeleton h-4 w-24" />
                    <div className="skeleton h-6 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            updates.map((update, index) => (
              <article
                key={update._id || update.id}
                className={`update-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl border border-gray-200 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Media - Video or Image */}
                {update.mediaType === 'video' || update.mediaUrl?.includes('youtube') || update.mediaUrl?.includes('youtu.be') ? (
                  // Video Thumbnail with Play Button
                  <div className="relative h-48 w-full bg-gray-900">
                    {update.mediaUrl ? (
                      <Image
                        src={update.mediaUrl}
                        alt={update.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                        loading="lazy"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700" />
                    )}
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-emerald-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Video Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                        VIDEO
                      </span>
                    </div>
                  </div>
                ) : (
                  // Image
                  update.mediaUrl ? (
                    <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                      <Image
                        src={update.mediaUrl}
                        alt={update.title}
                        fill
                        sizes="320px"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 w-full bg-gradient-to-br from-emerald-600 to-teal-700" />
                  )
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <time className="text-sm text-emerald-600 font-semibold">
                    {formatDate(update.createdAt || update.date)}
                  </time>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                    {update.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {update.description}
                  </p>

                  {/* Read More / Watch Video Link */}
                  <a
                    href={`/updates/${update._id || update.id}`}
                    className="inline-flex items-center space-x-1 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 group"
                  >
                    <span>{update.mediaType === 'video' || update.mediaUrl?.includes('youtube') || update.mediaUrl?.includes('youtu.be') ? 'Watch Video' : 'Read more'}</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
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
              </article>
            ))
          )}
        </div>

        {/* View All Link */}
        {updates.length > 0 && (
          <div className={`text-center mt-12 transition-all duration-700 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <a
              href="/updates"
              className="btn-primary"
            >
              View All Updates
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default memo(LatestUpdates)
