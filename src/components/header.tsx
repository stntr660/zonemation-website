'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { useTheme } from 'next-themes'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme } = useTheme()

  const navigationItems = [
    {
      name: 'Industries',
      href: '#',
      dropdown: [
        'Technology',
        'Financial Services',
        'Healthcare',
        'Energy',
        'Consumer Products'
      ]
    },
    {
      name: 'Capabilities',
      href: '#',
      dropdown: [
        'Strategy',
        'Digital Transformation',
        'Operations',
        'Marketing & Sales',
        'Technology'
      ]
    },
    {
      name: 'Insights',
      href: '#',
      dropdown: [
        'Featured Articles',
        'Latest Research',
        'Case Studies',
        'Reports',
        'Podcasts'
      ]
    },
    {
      name: 'About',
      href: '#',
      dropdown: [
        'Our Story',
        'Leadership',
        'Careers',
        'Locations',
        'Alumni'
      ]
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <Image
                src={theme === 'dark' ? '/Zonemation Logo Dark Mode.png' : '/Zonemation Logo.png'}
                alt="Zonemation"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                {activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 py-2 animate-fade-in">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-primary-400 transition-colors"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <ThemeToggle />
            <button className="hidden md:block bg-primary-400 hover:bg-primary-500 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
              {navigationItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <button
                    className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors font-medium"
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {activeDropdown === item.name && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <button className="w-full bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}