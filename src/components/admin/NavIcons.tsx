'use client'

import { useEffect, useCallback } from 'react'
import {
  FileText,
  Users,
  Briefcase,
  Tags,
  Receipt,
  Settings,
  ImageIcon,
  BookOpen,
  Building2,
  Layers,
  UserCircle,
  Handshake,
  MessageSquare,
  Globe,
  Navigation,
  Home,
} from 'lucide-react'
import { renderToString } from 'react-dom/server'

const GROUP_ICONS: Record<string, React.ComponentType<any>> = {
  'Content': FileText,
  'People': Users,
  'Taxonomy': Tags,
  'Operations': Briefcase,
  'System': Settings,
  'Settings': Settings,
}

const COLLECTION_ICONS: Record<string, React.ComponentType<any>> = {
  'Pages': FileText,
  'Case Studies': BookOpen,
  'Insights': Globe,
  'Team': UserCircle,
  'Clients': Handshake,
  'Industries': Building2,
  'Capabilities': Layers,
  'Invoices': Receipt,
  'Facturation': Receipt,
  'Contact Submissions': MessageSquare,
  'Users': Users,
  'Media': ImageIcon,
}

const GLOBAL_ICONS: Record<string, React.ComponentType<any>> = {
  'Site Settings': Settings,
  'Navigation': Navigation,
  'Homepage': Home,
}

function renderIcon(Icon: React.ComponentType<any>, size: number) {
  return renderToString(
    <Icon size={size} strokeWidth={2} />
  )
}

export default function NavIcons() {
  const inject = useCallback(() => {
    // Group toggle icons (bigger, 18px)
    document.querySelectorAll('.nav-group__toggle').forEach((toggle) => {
      if (toggle.getAttribute('data-icon-injected')) return
      toggle.setAttribute('data-icon-injected', 'true')

      const text = toggle.textContent?.trim() || ''
      const Icon = GROUP_ICONS[text]
      if (!Icon) return

      const wrapper = document.createElement('span')
      wrapper.className = 'zm-nav-group-icon'
      wrapper.innerHTML = renderIcon(Icon, 15)
      toggle.prepend(wrapper)
    })

    // Collection link icons (16px)
    document.querySelectorAll('a[href*="/admin/collections/"]').forEach((link) => {
      if (link.getAttribute('data-icon-injected')) return
      link.setAttribute('data-icon-injected', 'true')

      const span = link.querySelector('span')
      const text = span?.textContent?.trim() || link.textContent?.trim() || ''
      const Icon = COLLECTION_ICONS[text]
      if (!Icon) return

      const wrapper = document.createElement('span')
      wrapper.className = 'zm-nav-link-icon'
      wrapper.innerHTML = renderIcon(Icon, 18)
      if (span) {
        span.parentElement?.insertBefore(wrapper, span)
      } else {
        link.prepend(wrapper)
      }
    })

    // Global link icons (16px)
    document.querySelectorAll('a[href*="/admin/globals/"]').forEach((link) => {
      if (link.getAttribute('data-icon-injected')) return
      link.setAttribute('data-icon-injected', 'true')

      const span = link.querySelector('span')
      const text = span?.textContent?.trim() || link.textContent?.trim() || ''
      const Icon = GLOBAL_ICONS[text]
      if (!Icon) return

      const wrapper = document.createElement('span')
      wrapper.className = 'zm-nav-link-icon'
      wrapper.innerHTML = renderIcon(Icon, 18)
      if (span) {
        span.parentElement?.insertBefore(wrapper, span)
      } else {
        link.prepend(wrapper)
      }
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(inject, 300)

    const observer = new MutationObserver(() => {
      setTimeout(inject, 50)
    })

    const nav = document.querySelector('nav, .nav')
    if (nav) {
      observer.observe(nav, { childList: true, subtree: true })
    } else {
      // Nav might not be ready, retry
      const retryTimer = setInterval(() => {
        const n = document.querySelector('nav, .nav')
        if (n) {
          observer.observe(n, { childList: true, subtree: true })
          inject()
          clearInterval(retryTimer)
        }
      }, 500)
      // Stop retrying after 10s
      setTimeout(() => clearInterval(retryTimer), 10000)
    }

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [inject])

  return null
}
