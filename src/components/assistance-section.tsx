'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const capabilities = [
  'Strategy Consulting',
  'Digital Transformation',
  'Operations Excellence',
  'Marketing & Sales',
  'Technology Implementation',
  'Change Management',
  'Financial Advisory',
  'Sustainability Consulting'
]

const industries = [
  'Technology',
  'Financial Services',
  'Healthcare & Life Sciences',
  'Energy & Utilities',
  'Consumer Products',
  'Manufacturing',
  'Transportation',
  'Public Sector'
]

export function AssistanceSection() {
  const [selectedCapability, setSelectedCapability] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [capabilityOpen, setCapabilityOpen] = useState(false)
  const [industryOpen, setIndustryOpen] = useState(false)

  return (
    <section className="relative py-20 gradient-secondary dark:bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full">
          {/* Abstract geometric shapes similar to BCG's design */}
          <div className="relative w-full h-full">
            <div className="absolute top-20 right-20 w-64 h-64 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-40 w-48 h-48 bg-primary-300 dark:bg-primary-700 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute top-1/2 right-10 w-32 h-32 bg-primary-400 dark:bg-primary-600 rounded-full opacity-25 blur-xl"></div>
            
            {/* Abstract curved lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" fill="none">
              <path
                d="M200 0C300 100 350 200 300 300C250 400 200 500 300 600"
                stroke="url(#gradient1)"
                strokeWidth="2"
                opacity="0.3"
              />
              <path
                d="M250 0C350 80 400 180 350 280C300 380 250 480 350 580"
                stroke="url(#gradient2)"
                strokeWidth="1.5"
                opacity="0.2"
              />
              <path
                d="M300 50C400 120 450 220 400 320C350 420 300 520 400 600"
                stroke="url(#gradient3)"
                strokeWidth="1"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a7d26d" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7cb747" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7cb747" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a7d26d" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a7d26d" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7cb747" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="mb-12 lg:mb-0">
            <h2 className="heading-h1 text-gray-900 dark:text-white spacing-medium">
              How can we assist you today?
            </h2>
            <p className="body-large text-gray-700 dark:text-gray-300 spacing-large">
              Learn more about our core areas of expertise by selecting your topic of interest.
            </p>

            {/* Dropdown Controls */}
            <div className="space-y-4">
              {/* Capabilities Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setCapabilityOpen(!capabilityOpen)
                    setIndustryOpen(false)
                  }}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-4 text-left flex items-center justify-between hover:border-primary-400 dark:hover:border-primary-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {selectedCapability || 'Capabilities'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${capabilityOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Capabilities Dropdown Menu */}
                {capabilityOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-20 animate-fade-in">
                    <div className="py-2 max-h-64 overflow-y-auto">
                      {capabilities.map((capability) => (
                        <button
                          key={capability}
                          onClick={() => {
                            setSelectedCapability(capability)
                            setCapabilityOpen(false)
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {capability}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Industries Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIndustryOpen(!industryOpen)
                    setCapabilityOpen(false)
                  }}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-4 text-left flex items-center justify-between hover:border-primary-400 dark:hover:border-primary-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {selectedIndustry || 'Industries'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${industryOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Industries Dropdown Menu */}
                {industryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-20 animate-fade-in">
                    <div className="py-2 max-h-64 overflow-y-auto">
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          onClick={() => {
                            setSelectedIndustry(industry)
                            setIndustryOpen(false)
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  className="bg-primary-400 hover:bg-primary-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={!selectedCapability && !selectedIndustry}
                >
                  Explore Solutions
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Placeholder for the abstract visual - similar to BCG's curved design */}
              <div className="w-full h-96 relative">
                {/* This would be replaced with the actual image or SVG design */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-500 rounded-2xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}