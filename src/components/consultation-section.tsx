'use client'

import React, { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

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

export function ConsultationSection() {
  const [selectedCapability, setSelectedCapability] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [capabilityOpen, setCapabilityOpen] = useState(false)
  const [industryOpen, setIndustryOpen] = useState(false)

  return (
    <section className="relative py-20 bg-white dark:bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <div className="relative w-full h-full">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#a7d26d]/20 dark:bg-[#a7d26d]/10 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-40 w-48 h-48 bg-[#a7d26d]/30 dark:bg-[#a7d26d]/15 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute top-1/2 right-10 w-32 h-32 bg-[#a7d26d]/40 dark:bg-[#a7d26d]/20 rounded-full opacity-25 blur-xl"></div>
            
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

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light leading-tight text-gray-900 dark:text-white mb-6">
              How can we assist you today?
            </h2>
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
              Learn more about our core areas of expertise by selecting your topic of interest.
            </p>

            {/* Dropdown Controls */}
            <div className="space-y-6">
              {/* Capabilities Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => {
                    setCapabilityOpen(!capabilityOpen)
                    setIndustryOpen(false)
                  }}
                  className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-5 text-left flex items-center justify-between hover:border-[#a7d26d] dark:hover:border-[#a7d26d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a7d26d] focus:border-transparent shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                    {selectedCapability || 'Select Capability'}
                  </span>
                  <motion.div
                    animate={{ rotate: capabilityOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </motion.button>

                {/* Capabilities Dropdown Menu */}
                {capabilityOpen && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-20 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="py-2 max-h-64 overflow-y-auto">
                      {capabilities.map((capability, index) => (
                        <motion.button
                          key={capability}
                          onClick={() => {
                            setSelectedCapability(capability)
                            setCapabilityOpen(false)
                          }}
                          className="w-full text-left px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-[#a7d26d]/10 dark:hover:bg-[#a7d26d]/20 hover:text-[#7cb747] dark:hover:text-[#a7d26d] transition-all duration-300 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          whileHover={{ x: 8 }}
                        >
                          {capability}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Industries Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => {
                    setIndustryOpen(!industryOpen)
                    setCapabilityOpen(false)
                  }}
                  className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-5 text-left flex items-center justify-between hover:border-[#a7d26d] dark:hover:border-[#a7d26d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a7d26d] focus:border-transparent shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                    {selectedIndustry || 'Select Industry'}
                  </span>
                  <motion.div
                    animate={{ rotate: industryOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </motion.button>

                {/* Industries Dropdown Menu */}
                {industryOpen && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-20 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="py-2 max-h-64 overflow-y-auto">
                      {industries.map((industry, index) => (
                        <motion.button
                          key={industry}
                          onClick={() => {
                            setSelectedIndustry(industry)
                            setIndustryOpen(false)
                          }}
                          className="w-full text-left px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-[#a7d26d]/10 dark:hover:bg-[#a7d26d]/20 hover:text-[#7cb747] dark:hover:text-[#a7d26d] transition-all duration-300 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          whileHover={{ x: 8 }}
                        >
                          {industry}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <motion.button 
                  className="inline-flex items-center bg-[#a7d26d] hover:bg-[#95c255] text-black font-semibold py-5 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={!selectedCapability && !selectedIndustry}
                  whileHover={selectedCapability || selectedIndustry ? { scale: 1.05, y: -2 } : {}}
                  whileTap={selectedCapability || selectedIndustry ? { scale: 0.95 } : {}}
                >
                  Explore Solutions
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-full h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a7d26d]/20 to-[#7cb747]/30 rounded-3xl opacity-60"></div>
                <div className="absolute inset-4 bg-gradient-to-tr from-[#a7d26d]/10 to-transparent rounded-2xl"></div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute top-8 right-8 w-16 h-16 bg-[#a7d26d] rounded-2xl opacity-80"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-12 left-12 w-12 h-12 bg-[#7cb747] rounded-full opacity-70"
                  animate={{ 
                    y: [0, 8, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-8 w-8 h-8 bg-[#a7d26d] rounded-lg opacity-60"
                  animate={{ 
                    x: [0, 10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}