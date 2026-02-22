"use client"

import Link from 'next/link'
import Image from 'next/image'

/**
 * Logo design for SELAM NURU YA JAMII INITIATIVE
 * Features:
 * - SELAM in BLACK color
 * - NURU YA JAMII in cool matching YELLOW color
 * - INITIATIVE in cool GREEN color
 * - Clean, modern, and scalable
 */
export default function Logo({ scrolled = false, size = 'default' }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
  }

  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
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

      <div className="flex flex-col leading-tight">
        <span className={`font-display font-bold ${textSizes[size]} text-black transition-colors duration-300`}>
          SELAM
        </span>
        <span className={`font-display font-bold ${textSizes[size]} text-amber-400 transition-colors duration-300`}>
          NURU YA JAMII
        </span>
        <span className={`font-display font-bold ${textSizes[size]} text-emerald-600 transition-colors duration-300`}>
          INITIATIVE
        </span>
      </div>
    </Link>
  )
}
