'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import Image from 'next/image'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=60&fm=webp&fit=crop',
    alt: 'Community empowerment through education',
    priority: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=60&fm=webp&fit=crop',
    alt: 'Healthcare initiatives in rural areas',
    priority: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=60&fm=webp&fit=crop',
    alt: 'Sustainable development projects',
    priority: false,
  },
]

// Memoized carousel indicator component
const CarouselIndicators = memo(({ current, onSelect, count }) => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className={`relative h-3 rounded-full transition-all duration-500 ${
          index === current 
            ? 'bg-white w-10' 
            : 'bg-white/40 hover:bg-white/60 w-3'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      >
        {index === current && (
          <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
        )}
      </button>
    ))}
  </div>
))

CarouselIndicators.displayName = 'CarouselIndicators'

// Memoized scroll down indicator
const ScrollIndicator = memo(() => (
  <a
    href="#what-we-do"
    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 group cursor-pointer"
    aria-label="Scroll down"
  >
    <div className="flex flex-col items-center">
      <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center pt-1 group-hover:border-white/80 transition-colors duration-300">
        <div className="w-1.5 h-1.5 bg-white/80 rounded-full group-hover:bg-white transition-colors duration-300 scroll-wheel" />
      </div>
      <div className="flex flex-col items-center -mt-1">
        <svg 
          className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300 arrow-bounce" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  </a>
))

ScrollIndicator.displayName = 'ScrollIndicator'

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleImageLoad = useCallback((index) => {
    setImagesLoaded((prev) => new Set([...prev, index]))
  }, [])

  const goToSlide = useCallback((index) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 2000)
    }
  }, [currentIndex, isTransitioning])

  useEffect(() => {
    setIsLoaded(true)
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => {
          const isActive = index === currentIndex
          const isNext = (index === currentIndex + 1) || (currentIndex === heroImages.length - 1 && index === 0)
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
                isActive 
                  ? 'opacity-100 z-10 scale-100' 
                  : isNext
                    ? 'opacity-0 z-0 scale-105'
                    : 'opacity-0 z-0 scale-100'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-900" />
              
              <div className={`absolute inset-0 ${isActive ? 'hero-ken-burns' : ''}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image.priority}
                  quality={60}
                  sizes="100vw"
                  className={`object-cover transition-opacity duration-700 ease-out ${
                    imagesLoaded.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
              <div className="absolute inset-0 hero-gradient" />
            </div>
          )
        })}
      </div>

      {/* Content with smoother entrance */}
      <div className="relative z-20 h-full flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`max-w-3xl transition-all duration-[1500ms] ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight text-balance">
              Community-Based Organization
              <br />
              <span className="text-accent-300">Empowering Vulnerable Communities</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 max-w-2xl text-balance">
              Selam CBO Kenya is a community-based organization in Kisumu dedicated to sustainable community development through education, vocational training, mentorship, and economic empowerment for youth, women, and children.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#what-we-do"
                className="btn-primary text-center"
              >
                Discover Our Work
              </a>
              <a
                href="/join-us"
                className="btn-secondary text-center"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators - Bottom center with smoother styling */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-3 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'bg-white w-10' 
                : 'bg-white/40 hover:bg-white/60 w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Progress indicator for active slide */}
            {index === currentIndex && (
              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Modern Scroll Down Indicator */}
      <a
        href="#what-we-do"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 group cursor-pointer"
        aria-label="Scroll down"
      >
        <div className="flex flex-col items-center">
          {/* Animated mouse icon */}
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center pt-1 group-hover:border-white/80 transition-colors duration-300">
            {/* Animated scroll wheel */}
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full group-hover:bg-white transition-colors duration-300 scroll-wheel" />
          </div>
          
          {/* Arrow indicators below mouse */}
          <div className="flex flex-col items-center -mt-1">
            <svg 
              className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300 arrow-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </a>
    </section>
  )
}

export default memo(HeroSection)
