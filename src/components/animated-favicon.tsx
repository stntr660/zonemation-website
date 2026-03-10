'use client'

import { useEffect, useState } from 'react'

export function AnimatedFavicon() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!favicon) return

    // Temporarily use animated favicon
    const originalHref = favicon.href
    favicon.href = '/favicon-animated.svg'

    // Revert to static after animation completes
    const timer = setTimeout(() => {
      favicon.href = originalHref
    }, 2500)

    return () => clearTimeout(timer)
  }, [mounted])

  return null
}
