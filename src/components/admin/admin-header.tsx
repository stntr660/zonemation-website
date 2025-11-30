'use client'

import React from 'react'
import { Bell, Search, Menu, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export function AdminHeader() {
  const [isDark, setIsDark] = React.useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // In a real app, this would integrate with your theme system
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button className="lg:hidden -m-2.5 p-2.5 text-gray-700 dark:text-gray-300">
        <Menu className="h-6 w-6" />
      </button>

      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search */}
        <div className="relative flex flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="block w-full rounded-md border-0 bg-gray-50 dark:bg-gray-800 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#a7d26d] sm:text-sm sm:leading-6"
            placeholder="Search content, capabilities, industries..."
            type="search"
          />
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" />

          {/* Profile dropdown */}
          <div className="relative">
            <button className="flex items-center gap-x-2 text-sm leading-6 text-gray-900 dark:text-white">
              <div className="h-8 w-8 rounded-full bg-[#a7d26d] flex items-center justify-center">
                <span className="text-black font-semibold">A</span>
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span aria-hidden="true">Admin User</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}