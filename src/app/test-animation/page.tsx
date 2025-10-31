'use client'

import { useState } from 'react'
import { AnimatedLogo } from '@/components/animated-logo'
import { LoadingController } from '@/components/loading-controller'

export default function TestAnimationPage() {
  const [showLoading, setShowLoading] = useState(false)
  const [logoSize, setLogoSize] = useState(120)
  const [logoLoading, setLogoLoading] = useState(true)
  const [logoLoop, setLogoLoop] = useState(false)

  const restartFaviconAnimation = () => {
    // Dispatch custom event to restart favicon animation
    const event = new CustomEvent('faviconLoadingState', { 
      detail: { isLoading: true } 
    })
    window.dispatchEvent(event)
    
    // Stop after 3 seconds
    setTimeout(() => {
      const stopEvent = new CustomEvent('faviconLoadingState', { 
        detail: { isLoading: false } 
      })
      window.dispatchEvent(stopEvent)
    }, 3000)
  }

  if (showLoading) {
    return (
      <LoadingController 
        simulateLoading={true} 
        loadingDuration={3000}
      >
        <div className="min-h-screen p-8">
          <h1 className="text-3xl font-bold mb-4">Loading Complete!</h1>
          <button 
            onClick={() => setShowLoading(false)}
            className="px-4 py-2 bg-[#a7d26d] text-black rounded hover:bg-[#95c255] transition-colors"
          >
            Go Back to Test Page
          </button>
        </div>
      </LoadingController>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Zonemation Circuit Animation Test
        </h1>
        
        {/* Favicon Controls */}
        <div className="mb-12 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Favicon Animation</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Check your browser tab to see the favicon animation. Click the button below to restart it.
          </p>
          <button 
            onClick={restartFaviconAnimation}
            className="px-6 py-3 bg-[#a7d26d] text-black rounded-lg hover:bg-[#95c255] transition-colors font-medium"
          >
            Restart Favicon Animation
          </button>
        </div>

        {/* Logo Component Demo */}
        <div className="mb-12 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">AnimatedLogo Component</h2>
          
          <div className="flex justify-center mb-6">
            <AnimatedLogo 
              size={logoSize}
              isLoading={logoLoading}
              loop={logoLoop}
              onAnimationComplete={() => console.log('Logo animation complete!')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Size: {logoSize}px
              </label>
              <input 
                type="range" 
                min="32" 
                max="200" 
                value={logoSize}
                onChange={(e) => setLogoSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={logoLoading}
                  onChange={(e) => setLogoLoading(e.target.checked)}
                  className="rounded"
                />
                <span>Is Loading</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={logoLoop}
                  onChange={(e) => setLogoLoop(e.target.checked)}
                  className="rounded"
                />
                <span>Loop Animation</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setLogoLoading(!logoLoading)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Toggle Animation
            </button>
            
            <button 
              onClick={() => {
                setLogoLoading(false)
                setTimeout(() => setLogoLoading(true), 100)
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Restart Animation
            </button>
          </div>
        </div>

        {/* Loading Screen Demo */}
        <div className="mb-12 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Loading Screen Demo</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Click the button below to see a full-screen loading experience with the animated logo.
          </p>
          <button 
            onClick={() => setShowLoading(true)}
            className="px-6 py-3 bg-[#a7d26d] text-black rounded-lg hover:bg-[#95c255] transition-colors font-medium"
          >
            Show Loading Screen
          </button>
        </div>

        {/* Animation Details */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-4">Animation Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Circuit Effects</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Line tracing (stroke-dasharray animation)</li>
                <li>• Glow effects with blur filters</li>
                <li>• Data sparks traveling along paths</li>
                <li>• Progressive fill reveal</li>
                <li>• Continuous pulsing when active</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Technical Specs</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Duration: 1.5-2.3 seconds</li>
                <li>• Color: #a7d26d (Zonemation green)</li>
                <li>• GPU optimized animations</li>
                <li>• Responsive and accessible</li>
                <li>• Dark mode compatible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="text-[#a7d26d] hover:text-[#95c255] underline transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}