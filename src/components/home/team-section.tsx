'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const EASE = [0.22, 1, 0.36, 1] as const

// Names stay in Latin script in every locale; roles and bios are translated.
const TEAM = [
  { key: 'aymane', name: 'Aymane Ait Malek', initials: 'AA', orbit: 18 },
  { key: 'ahmed', name: 'Ahmed B.', initials: 'AB', orbit: 24 },
  { key: 'amine', name: 'Amine M.', initials: 'AM', orbit: 21 },
  { key: 'ilyas', name: 'Ilyas', initials: 'IL', orbit: 27 },
  { key: 'domingues', name: 'Domingues I.', initials: 'DI', orbit: 20 },
  { key: 'omar', name: 'Omar J.', initials: 'OJ', orbit: 25 },
] as const

/** Matching stylised avatar: initials in a glowing core with an orbiting agent. */
function Avatar({ initials, orbit, index }: { initials: string; orbit: number; index: number }) {
  const reduce = useReducedMotion()
  const id = `avatar-${index}`

  return (
    <div className="relative h-20 w-20 shrink-0">
      <div className="absolute inset-0 rounded-full bg-[#a7d26d]/20 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <svg viewBox="0 0 80 80" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={id} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#2f3519" />
            <stop offset="100%" stopColor="#14160b" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="28" fill={`url(#${id})`} stroke="rgba(167,210,109,0.45)" strokeWidth="1" />
        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(167,210,109,0.18)" strokeWidth="0.75" strokeDasharray="2 4" />
        <text
          x="40"
          y="40"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#a7d26d"
          fontSize="17"
          fontWeight="300"
          letterSpacing="1.5"
        >
          {initials}
        </text>
      </svg>
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: index * 60 }}
        animate={reduce ? undefined : { rotate: index * 60 + 360 }}
        transition={{ duration: orbit, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-[4%] -translate-x-1/2 h-2 w-2 rounded-full bg-[#a7d26d] shadow-[0_0_10px_#a7d26d]" />
      </motion.div>
    </div>
  )
}

export function TeamSection() {
  const t = useTranslations('home.team')

  return (
    <section id="team" className="relative scroll-mt-8 px-6 py-28 lg:py-36 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[#a7d26d]/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl lg:text-4xl font-thin text-white/90 tracking-wide leading-snug">{t('title')}</h2>
            <p className="text-white/55 font-light leading-relaxed">{t('subtitle')}</p>
          </div>
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#a7d26d]/80">{t('eyebrow')}</p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM.map(({ key, name, initials, orbit }, i) => (
            <motion.li
              key={key}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-[#a7d26d]/40 hover:bg-[#a7d26d]/[0.04]"
            >
              {/* Hairline that draws across the top on hover. */}
              <span className="absolute top-0 start-0 h-px w-0 bg-[#a7d26d] transition-all duration-700 ease-out group-hover:w-full" />

              <div className="flex items-center gap-5 mb-6">
                <Avatar initials={initials} orbit={orbit} index={i} />
                <div className="min-w-0">
                  <h3 className="text-xl font-medium text-white" dir="ltr">{name}</h3>
                  <p className="mt-1 inline-flex rounded-full border border-[#a7d26d]/30 px-2.5 py-0.5 text-xs tracking-wide text-[#a7d26d]">
                    {t(`members.${key}.badge`)}
                  </p>
                </div>
              </div>

              <p className="text-sm font-medium text-white/85 leading-snug mb-3">{t(`members.${key}.role`)}</p>
              <p className="text-sm text-white/55 font-light leading-relaxed">{t(`members.${key}.bio`)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
