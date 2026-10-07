'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { BrainCircuit, ChartLine, Blocks } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const PILLARS = [
  { key: 'ai', icon: BrainCircuit },
  { key: 'data', icon: ChartLine },
  { key: 'web3', icon: Blocks },
] as const

export function Pillars() {
  const t = useTranslations('home.pillars')

  return (
    <section className="relative px-6 py-28 lg:py-36">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-thin text-white/90 tracking-wide max-w-md leading-snug">{t('title')}</h2>
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#a7d26d]/80">{t('eyebrow')}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
          className="grid md:grid-cols-3 border-t border-white/10"
        >
          {PILLARS.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }}
              className={`group relative pt-10 pb-12 md:pb-4 md:px-8 first:md:ps-0 last:md:pe-0 ${i > 0 ? 'border-t md:border-t-0 md:border-s border-white/10' : ''}`}
            >
              {/* Hairline that draws across the top on hover. */}
              <span className="absolute top-[-1px] start-0 h-px w-0 bg-[#a7d26d] transition-all duration-700 ease-out group-hover:w-full" />

              <div className="flex items-start justify-between mb-8">
                <span className="relative flex items-center justify-center w-14 h-14 rounded-2xl border border-[#a7d26d]/25 bg-[#a7d26d]/[0.06] text-[#a7d26d] transition-colors duration-500 group-hover:bg-[#a7d26d] group-hover:text-[#181a0e]">
                  <span className="absolute inset-0 rounded-2xl bg-[#a7d26d]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon className="relative w-6 h-6" strokeWidth={1.5} />
                </span>
                <span className="font-thin text-white/20 text-sm tabular-nums">0{i + 1}</span>
              </div>

              <h3 className="text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-2 transition-transform duration-700 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {t(`${key}.term`)}
              </h3>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#a7d26d]/80 mb-5">{t(`${key}.label`)}</p>
              <p className="text-white/55 font-light leading-relaxed max-w-[16rem]">{t(`${key}.text`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
