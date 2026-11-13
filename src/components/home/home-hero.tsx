'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { AgentNetwork } from './agent-network'

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

const CHIPS = ['agents', 'data', 'governance'] as const

export function HomeHero() {
  const t = useTranslations('home.hero')
  const lead = t('titleLead')
  const accent = t('titleAccent')
  const accentDelay = 0.2 + lead.split(' ').length * 0.08

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden px-6 py-20 lg:py-24">
      <AgentNetwork className="absolute inset-0 h-full w-full" />
      {/* Vignette keeps the text readable over the network. */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(24,26,14,0.92)_0%,rgba(24,26,14,0.55)_45%,rgba(24,26,14,0)_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-b from-transparent to-[#181a0e]" />

      <div className="relative max-w-3xl mx-auto space-y-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#a7d26d]/30 bg-[#181a0e]/60 px-4 py-1.5 text-xs text-[#a7d26d] tracking-[0.25em] uppercase backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#a7d26d] animate-pulse" />
          {t('eyebrow')}
        </motion.p>

        <h1 className="text-[2.25rem]/[1.1] md:text-[3rem]/[1.1] lg:text-[3.75rem]/[1.08] font-light text-white">
          <Words text={lead} delay={0.2} />
          <Words text={accent} delay={accentDelay} className="text-[#a7d26d] [text-shadow:0_0_32px_rgba(167,210,109,0.35)]" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: accentDelay + 0.4, ease: EASE }}
          className="mx-auto max-w-2xl text-base lg:text-lg text-white/60 font-light leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: accentDelay + 0.55 } } }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {CHIPS.map((chip) => (
            <motion.li
              key={chip}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } } }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/70 backdrop-blur-sm"
            >
              {t(`chips.${chip}`)}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: accentDelay + 0.8, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="#products"
            className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-primary-400 bg-primary-400 px-6 py-3 text-base font-medium text-surface shadow-[0_0_40px_rgba(167,210,109,0.25)] transition-colors duration-300 hover:border-primary-300 hover:bg-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
          >
            {t('ctaSolutions')}
            <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">&darr;</span>
          </a>
          <a
            href="#team"
            className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-primary-400/60 px-6 py-3 text-base font-medium text-primary-400 transition-colors duration-300 hover:border-primary-400 hover:bg-primary-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
          >
            {t('ctaTeam')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
