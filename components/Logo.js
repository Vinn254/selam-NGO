'use client'

import Link from 'next/link'

/**
 * Modern logo design for Selam NGO
 * Features:
 * - Abstract hand/growth symbol representing community support
 * - Uses emerald/teal gradient to match website theme
 * - Clean, modern, and scalable SVG
 */
export default function Logo({ scrolled = false, size = 'default' }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
  }

  const textSizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl',
  }

  const iconSize = {
    small: 28,
    default: 36,
    large: 44,
  }

  return (
    <Link href="/" className="flex items-center space-x-2 group">
      {/* Logo Icon - Modern design with emerald gradient */}
      <div className={`${sizeClasses[size]} relative rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 shadow-lg group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105`}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
        
        {/* SVG Icon - Abstract "S" shape representing growth/hands */}
        <svg 
          width={iconSize[size]} 
          height={iconSize[size]} 
          viewBox="0 0 36 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Abstract S shape with leaf/hands motif */}
          <path 
            d="M18 6C12.48 6 10 10 10 14C10 18 14 20 18 22C22 24 26 24 26 28C26 32 22 34 18 34" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          {/* Leaf accent */}
          <path 
            d="M22 10C24 8 28 8 28 12C28 16 24 18 20 16" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
            opacity="0.8"
          />
          {/* Small accent dot */}
          <circle cx="12" cy="28" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>

      {/* Logo Text - Modern gradient styling with unique 'la' design */}
      <span className={`font-display font-bold ${textSizes[size]} transition-colors duration-300 ${
        scrolled 
          ? 'text-gray-900' 
          : 'text-white'
      }`}>
        <span className={scrolled 
          ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent' 
          : 'bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent'
        }>se</span>
        <span className={`${scrolled 
          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent' 
          : 'bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent'
        }`}>la</span>
        <span className={scrolled 
          ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent' 
          : 'bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent'
        }>m</span>
      </span>
    </Link>
  )
}
