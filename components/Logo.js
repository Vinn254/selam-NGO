"use client"

import Link from 'next/link'
import Image from 'next/image'

/**
 * Logo design for SELAM NURU YA JAMIII
 * Features:
 * - selam in BLACK color (lowercase)
 * - NURU YA JAMIII in cool matching RED color (capitalized)
 * - Clean, modern, and scalable
 * - Responsive one-line layout for small screens
 */
export default function Logo({ scrolled = false, size = 'default' }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
  }

  const textSizes = {
    small: 'text-xs sm:text-sm',
    default: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg',
  }

  const iconSize = {
    small: 28,
    default: 36,
    large: 44,
  }

  return (
    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
      <div className={`${sizeClasses[size]} relative rounded-xl flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 bg-white/0`}> 
        <Image
          src="/logo.jpeg"
          alt="Selam logo"
          width={iconSize[size]}
          height={iconSize[size]}
          className="relative z-10 rounded-md object-cover"
        />
      </div>

      <div className="flex flex-wrap items-baseline leading-tight">
        <span className={`font-display font-bold ${textSizes[size]} text-black transition-colors duration-300`}>
          selam
        </span>
        <span className={`font-display font-bold ${textSizes[size]} text-red-600 transition-colors duration-300`}>
          {' '}NURU YA JAMIII
        </span>
      </div>
    </Link>
  )
}
