'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from './animated-logo'

interface LoadingControllerProps {
  children: React.ReactNode
  simulateLoading?: boolean
  loadingDuration?: number
}

export const LoadingController = ({ 
  children, 
  simulateLoading = true,
  loadingDuration = 3000 
}: LoadingControllerProps) => {
  const [isLoading, setIsLoading] = useState(simulateLoading)
  const [showContent, setShowContent] = useState(!simulateLoading)

  useEffect(() => {
    if (simulateLoading) {
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
      }, loadingDuration)

      return () => clearTimeout(timer)
    }
  }, [simulateLoading, loadingDuration])

  // Communicate loading state to AnimatedFavicon via window event
  useEffect(() => {
    const event = new CustomEvent('faviconLoadingState', { 
      detail: { isLoading } 
    })
    window.dispatchEvent(event)
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="mb-4">
            <AnimatedLogo 
              size={120} 
              isLoading={true}
              loop={true}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            Powering up Zonemation...
          </div>
        </div>
      </div>
    )
  }

  return showContent ? <>{children}</> : null
}

export default LoadingController