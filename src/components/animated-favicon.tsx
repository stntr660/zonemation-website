'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function AnimatedFavicon() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Function to update favicon with animation
    const updateFavicon = (isAnimated: boolean = false) => {
      // Remove existing favicons
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
      existingFavicons.forEach(favicon => favicon.remove())

      // Create new favicon link
      const favicon = document.createElement('link')
      favicon.rel = 'icon'
      favicon.type = 'image/svg+xml'
      
      if (isAnimated) {
        // Use animated SVG
        favicon.href = '/favicon-animated.svg'
      } else {
        // Use static SVG based on theme
        favicon.href = '/favicon.svg'
      }

      document.head.appendChild(favicon)
    }

    // Start with animated favicon
    updateFavicon(true)

    // Switch to static after animation completes (2.5 seconds)
    const timer = setTimeout(() => {
      updateFavicon(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [mounted, theme])

  // This component doesn't render anything visible
  return null
}