'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'What We Do', href: '/what-we-do' },
  { name: 'Partners', href: '/partners' },
  { name: 'Join Us', href: '/join-us' },
]

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo scrolled={scrolled || isOpen} />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link font-medium transition-colors duration-200 ${
                    scrolled 
                      ? pathname === item.href ? 'nav-link-active' : 'text-gray-700 hover:text-emerald-600'
                      : pathname === item.href ? 'text-white' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Hamburger Button (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 md:hidden transition-all duration-300 ${
                isOpen ? 'hamburger-open' : ''
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className={`hamburger-line ${isOpen ? 'bg-white' : scrolled ? 'bg-gray-900' : 'bg-white'}`} />
              <span className={`hamburger-line ${isOpen ? 'bg-white' : scrolled ? 'bg-gray-900' : 'bg-white'}`} />
              <span className={`hamburger-line ${isOpen ? 'bg-white' : scrolled ? 'bg-gray-900' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop with blur */}
        <div 
          className="absolute inset-0 menu-backdrop"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm mobile-menu-panel shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-8">
            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-4 px-6 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:bg-white/10 ${
                    pathname === item.href ? 'bg-white/20 nav-link-active' : 'nav-link'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideInRight 0.4s ease-out forwards' : 'none'
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {pathname === item.href && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4">Get in touch</p>
              <a 
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-white font-semibold hover:text-green-300 transition-colors duration-200"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Navigation)
