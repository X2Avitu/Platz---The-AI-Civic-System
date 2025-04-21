"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Home, Info, Sun, Moon, Map } from 'lucide-react'
import { useTheme } from 'next-themes'
// Ensure the correct path to HoverBorderGradient is used
import { HoverBorderGradient } from "./ui/hover-border-gradient";

// Import the logo
import PlatzLogo from '../PlatzLogo.svg'

// Replace text with icons and tooltips
const navItems= [
    { name: 'Home', href: '/home', icon: <Home className="w-5 h-5" /> },
    { name: 'About', href: '/about', icon: <Map className="w-5 h-5" /> },
]

// Theme toggle component
function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10"></div>
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-md w-10 h-10 flex items-center justify-center hover:bg-foreground/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  // Add scroll event listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    // Add event listener
    window.addEventListener('scroll', handleScroll)
    
    // Check initial scroll position
    handleScroll()
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
    
  return (
    <div 
      className="w-full fixed top-0 z-50 flex justify-center transition-all duration-500 ease-in-out"
      style={{
        padding: scrolled ? '0.75rem 1rem' : '0',
      }}
    >
      <nav 
        className="bg-background w-full transition-all duration-500 ease-out"
        style={{ 
          maxWidth: scrolled ? '64rem' : '100%',
          borderRadius: scrolled ? '0.75rem' : '0',
          borderWidth: scrolled ? '1px' : '0 0 2px 0',
          boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
        }}
      >
        <div 
          className="flex justify-between items-center text-sm transition-all duration-500 ease-in-out"
          style={{
            padding: scrolled ? '0.75rem 1.25rem' : '1rem 2rem',
          }}
        >
          <div className="flex items-center">
            {/* Replace text with logo */}
           <h1>
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold">Platz</span>
                    
                </Link>
           </h1>
          </div>
          <div className="flex gap-5 items-center font-semibold">
            <div className="flex items-center gap-4 pl-32">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative p-2 rounded-md hover:bg-foreground/10 transition-colors group"
                  aria-label={item.name}
                >
                  {item.icon}
                  <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link 
              href="/sign-in" 
              className="px-4 py-2 text-sm font-medium hover:text-foreground/80 transition-colors relative group"
            >
              Sign in
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/sign-up" 
              className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 text-sm font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}