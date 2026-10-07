'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const EASE = [0.22, 1, 0.36, 1] as const

function Words({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i}>
          <motion.span
            className={`inline-block ${className ?? ''}`}
            initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
          >
            {word}
          </motion.span>{' '}
        </span>
      ))}
    </>
  )
}

export function HomeHero() {
  const t = useTranslations('home.hero')
  const products = useTranslations('products')
  const lead = t('titleLead')
  const accent = t('titleAccent')
  const accentDelay = 0.2 + lead.split(' ').length * 0.08

  return (
    <section className="relative overflow-hidden px-6 pt-6 pb-6 lg:pt-8 lg:pb-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 start-1/4 w-[32rem] h-[32rem] bg-[#a7d26d]/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-10 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto space-y-3 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#a7d26d]/30 px-4 py-1.5 text-sm text-[#a7d26d] tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#a7d26d] animate-pulse" />
          {t('eyebrow')}
        </motion.p>

        <h1 className="text-[1.875rem]/[1.15] md:text-[2.25rem]/[1.15] lg:text-[2.75rem]/[1.15] font-light text-white">
          <Words text={lead} delay={0.2} />
          <Words text={accent} delay={accentDelay} className="text-[#a7d26d]" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: accentDelay + 0.4, ease: EASE }}
          className="mx-auto max-w-xl text-base text-white/55 font-light leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: accentDelay + 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {(['jmlapro', 'atrapa'] as const).map((product, index) => (
            <a
              key={product}
              href={`#${product}`}
              aria-label={products(`${product}.cta`)}
              className={`group inline-flex min-h-11 items-center gap-3 rounded-full border px-5 py-3 text-base font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400 ${
                index === 0
                  ? 'border-primary-400 bg-primary-400 text-surface hover:border-primary-300 hover:bg-primary-300'
                  : 'border-primary-400/60 text-primary-400 hover:border-primary-400 hover:bg-primary-400/10'
              }`}
            >
              {products(`${product}.name`)}
              <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">&darr;</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
