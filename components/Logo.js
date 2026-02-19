"use client"

import Link from 'next/link'
import Image from 'next/image'

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
      <div className={`${sizeClasses[size]} relative rounded-xl flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 bg-white/0`}> 
        <Image
          src="/logo.jpeg"
          alt="Selam logo"
          width={iconSize[size]}
          height={iconSize[size]}
          className="relative z-10 rounded-md object-cover"
        />
      </div>

      <span className={`font-display font-bold ${textSizes[size]} transition-colors duration-300 ${
        scrolled 
          ? 'text-gray-900' 
          : 'text-white'
      }`}>
        <span className={scrolled 
          ? 'bg-gradient-to-r from-[#1f8a3a] via-[#3aa34a] to-[#10b981] bg-clip-text text-transparent' 
          : 'bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent'
        }>se</span>
        <span className={`${scrolled 
          ? 'bg-gradient-to-r from-[#f6c043] via-[#ff9800] to-[#d6272f] bg-clip-text text-transparent' 
          : 'bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent'
        }`}>la</span>
        <span className={scrolled 
          ? 'bg-gradient-to-r from-[#1f8a3a] via-[#3aa34a] to-[#10b981] bg-clip-text text-transparent' 
          : 'bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent'
        }>m</span>
      </span>
    </Link>
  )
}
