'use client'

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export function Footer() {
  const { theme } = useTheme()

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Leadership', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Locations', href: '#' },
        { name: 'Alumni', href: '#' },
        { name: 'News & Media', href: '#' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Strategy Consulting', href: '#' },
        { name: 'Digital Transformation', href: '#' },
        { name: 'Operations', href: '#' },
        { name: 'Technology', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'M&A Advisory', href: '#' }
      ]
    },
    {
      title: 'Industries',
      links: [
        { name: 'Technology', href: '#' },
        { name: 'Financial Services', href: '#' },
        { name: 'Healthcare', href: '#' },
        { name: 'Energy & Utilities', href: '#' },
        { name: 'Manufacturing', href: '#' },
        { name: 'Public Sector', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Insights', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Reports', href: '#' },
        { name: 'Webinars', href: '#' },
        { name: 'Events', href: '#' },
        { name: 'Blog', href: '#' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold mb-4">
                Stay ahead of the curve
              </h3>
              <p className="text-gray-400 text-lg">
                Subscribe to our newsletter for the latest insights and industry trends.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 dark:bg-black border border-gray-700 dark:border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
              </div>
              <button className="bg-primary-400 hover:bg-primary-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src={theme === 'light' ? '/Zonemation Logo Dark Mode.png' : '/Zonemation Logo Dark Mode.png'}
                alt="Zonemation"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Unlocking the potential of those who advance the world through innovative 
              consulting solutions and strategic partnerships.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3" />
                <span>info@zonemation.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3" />
                <span>Global Headquarters</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Accessibility
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Site Map
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Zonemation. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}