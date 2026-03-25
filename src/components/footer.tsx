'use client'

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { 
  Linkedin, 
  Facebook, 
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'

export function Footer() {
  const { theme } = useTheme()

  const footerLinks = [
    { name: 'PRIVACY POLICY', href: '/privacy-policy' },
    { name: 'TERMS OF USE', href: '/terms-of-use' },
    { name: 'COOKIE POLICY', href: '/cookie-policy' },
    { name: 'MENTIONS LEGALES', href: '/legal' },
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          
          {/* Logo Only */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center lg:justify-start">
              <Image
                src={theme === 'dark' ? '/Zonemation Logo Dark Mode.png' : '/Zonemation Logo.png'}
                alt="Zonemation"
                width={80}
                height={80}
                className="h-8 w-auto"
              />
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
              {footerLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 underline decoration-1 underline-offset-2 whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="hidden lg:inline text-gray-400 dark:text-gray-600 text-xs">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Language and Social */}
          <div className="flex-shrink-0 flex flex-row items-center gap-3">
            {/* Follow Us Label */}
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              <span className="text-gray-500 dark:text-gray-400">FOLLOW US</span>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300">
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">FR</span>
              <span className="text-gray-400 dark:text-gray-600">|</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">EN</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Equal Opportunity Statement */}
        <div className="mb-3">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Zonemation is an Equal Opportunity Employer. All qualified applicants will receive consideration for employment without regard to race, color, age, religion, sex, sexual orientation, gender identity / expression, national origin, or any other characteristic protected under applicable law.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Zonemation Consulting Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}