'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  Tags,
  Image,
  Video,
  BookOpen,
  TrendingUp,
  LogOut
} from 'lucide-react'
import { motion } from 'framer-motion'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { 
    name: 'Content', 
    icon: FileText,
    children: [
      { name: 'All Content', href: '/admin/content' },
      { name: 'Articles', href: '/admin/content?type=article' },
      { name: 'Blogs', href: '/admin/content?type=blog' },
      { name: 'Case Studies', href: '/admin/content?type=case_study' },
      { name: 'Reports', href: '/admin/content?type=report' },
      { name: 'Videos', href: '/admin/content?type=video' },
      { name: 'Podcasts', href: '/admin/content?type=podcast' }
    ]
  },
  { name: 'Capabilities', href: '/admin/capabilities', icon: BarChart3 },
  { name: 'Industries', href: '/admin/industries', icon: TrendingUp },
  { name: 'Authors', href: '/admin/authors', icon: Users },
  { name: 'Tags', href: '/admin/tags', icon: Tags },
  { name: 'Media Library', href: '/admin/media', icon: Image },
  { name: 'Settings', href: '/admin/settings', icon: Settings }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = React.useState<string[]>(['Content'])

  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 shadow-lg">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Zonemation CMS
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                          isActive(item.href)
                            ? 'bg-[#a7d26d] text-black'
                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleSection(item.name)}
                          className={`group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                            openSections.includes(item.name)
                              ? 'bg-gray-50 dark:bg-gray-800 text-black dark:text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                          <motion.div
                            animate={{ rotate: openSections.includes(item.name) ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-auto"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        </button>
                        
                        <motion.div
                          initial={false}
                          animate={{
                            height: openSections.includes(item.name) ? 'auto' : 0,
                            opacity: openSections.includes(item.name) ? 1 : 0
                          }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-1 px-2 space-y-1">
                            {item.children?.map((child) => (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  className={`group flex gap-x-3 rounded-md py-2 pl-8 pr-2 text-sm leading-6 transition-colors ${
                                    isActive(child.href)
                                      ? 'bg-[#a7d26d] text-black font-semibold'
                                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </li>
            
            {/* User section */}
            <li className="mt-auto">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-x-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="h-8 w-8 rounded-full bg-[#a7d26d] flex items-center justify-center">
                    <span className="text-black font-semibold">A</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Admin User</p>
                    <p className="text-xs text-gray-500">admin@zonemation.com</p>
                  </div>
                </div>
                <button className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <LogOut className="h-5 w-5 shrink-0" />
                  Sign out
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}