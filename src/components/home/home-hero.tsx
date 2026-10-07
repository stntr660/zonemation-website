'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { AnimatedLogo } from '@/components/under-construction'

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
  const lead = t('titleLead')
  const accent = t('titleAccent')
  const accentDelay = 0.2 + lead.split(' ').length * 0.08
  const facts = [t('fact1'), t('fact2'), t('fact3')]

  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 start-1/4 w-[32rem] h-[32rem] bg-[#a7d26d]/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-10 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#a7d26d]/30 px-4 py-1.5 text-sm text-[#a7d26d] tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#a7d26d] animate-pulse" />
            {t('eyebrow')}
          </motion.p>

          <h1 className="text-4xl/[1.15] md:text-5xl/[1.15] lg:text-[3.4rem]/[1.15] font-light text-white">
            <Words text={lead} delay={0.2} />
            <Words text={accent} delay={accentDelay} className="text-[#a7d26d]" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: accentDelay + 0.4, ease: EASE }}
            className="text-lg text-white/55 font-light leading-relaxed max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: accentDelay + 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-3 rounded-full bg-[#a7d26d] px-7 py-3.5 text-[#181a0e] font-medium hover:bg-white transition-colors duration-300"
            >
              {t('ctaProducts')}
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
            </a>
            <a
              href="tel:+212661903077"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-white/80 hover:border-[#a7d26d] hover:text-[#a7d26d] transition-colors duration-300"
            >
              {t('ctaCall')}
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: accentDelay + 0.9 } } }}
            className="flex flex-wrap gap-x-8 gap-y-3 pt-4"
          >
            {facts.map((fact) => (
              <motion.li
                key={fact}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2 text-white/45 text-sm"
              >
                <span className="text-[#a7d26d]">&#10003;</span>
                {fact}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="hidden lg:flex justify-center"
        >
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <AnimatedLogo className="w-60 h-60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
