"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function BrandTheme() {
  const pathname = usePathname()

  useEffect(() => {
    const el = document.documentElement
    if (pathname && pathname !== '/') {
      el.classList.add('brand-theme')
      el.classList.remove('homepage')
    } else {
      el.classList.remove('brand-theme')
      el.classList.add('homepage')
    }
  }, [pathname])

  return null
}
