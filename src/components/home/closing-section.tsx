'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function ClosingSection() {
  const t = useTranslations('underConstruction')
  const h = useTranslations('home.closing')
  const quotes = [t('quote1'), t('quote2'), t('quote3')]
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setQuoteIndex((prev) => (prev + 1) % quotes.length), 4500)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <section className="relative px-6 py-24 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <p className="text-[#a7d26d] text-sm tracking-[0.25em] uppercase">{h('eyebrow')}</p>
        <h2 className="text-4xl lg:text-5xl font-light text-white">{t('cta')}</h2>
        <a
          href="tel:+212661903077"
          className="inline-flex items-center gap-3 text-[#a7d26d] hover:text-white transition-colors duration-300"
        >
          <span className="flex items-center justify-center w-11 h-11 rounded-full border border-current">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </span>
          <span className="text-3xl font-light" dir="ltr">{t('phone')}</span>
        </a>
        <div className="h-16 flex items-center justify-center pt-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-white/35 font-light italic"
            >
              &ldquo;{quotes[quoteIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
