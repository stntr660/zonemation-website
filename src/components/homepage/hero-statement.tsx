'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface HeroStatementProps {
  heading: string
  subheading: string
}

export function HeroStatement({ heading, subheading }: HeroStatementProps) {
  const words = heading.split(' ')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(167,210,109,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,210,109,0.025)_0%,transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center gap-16 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <motion.path
              d="M16 18h32M48 18L16 46M16 46h32"
              fill="none" stroke="#a7d26d" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            />
            {[[16, 18], [48, 18], [16, 46], [48, 46]].map(([cx, cy], i) => (
              <motion.circle key={i} cx={cx} cy={cy} r="2" fill="#a7d26d"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 1.2 + i * 0.1, type: 'spring', stiffness: 300, damping: 15 }}
              />
            ))}
          </svg>
        </motion.div>

        <div className="space-y-8">
          <h1 className="font-thin text-6xl lg:text-8xl tracking-wider text-slate-300/80">
            {words.map((word, i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div className="w-16 h-px bg-[#a7d26d] mx-auto"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 + words.length * 0.1, ease: 'easeOut' }}
            style={{ transformOrigin: 'center' }}
          />

          <motion.p
            className="font-mono text-[0.8rem] tracking-[0.15em] uppercase text-white/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 + words.length * 0.1 }}
          >
            {subheading}
          </motion.p>
        </div>
      </div>

      <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2.5 }, y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ChevronDown className="w-5 h-5 text-white/20" />
      </motion.div>
    </section>
  )
}
