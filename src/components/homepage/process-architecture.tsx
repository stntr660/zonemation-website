'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const STEPS = [
  { number: '01', label: 'Diagnostic', desc: 'Audit 360 de votre ecosysteme digital' },
  { number: '02', label: 'Strategie', desc: 'Feuille de route avec ROI projete' },
  { number: '03', label: 'Architecture', desc: 'Design de solutions sur mesure' },
  { number: '04', label: 'Execution', desc: 'Deploiement agile et transfert' },
  { number: '05', label: 'Mesure', desc: 'Dashboards et optimisation continue' },
]

export function ProcessArchitecture() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 })

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.p className="font-mono text-xs tracking-[0.15em] uppercase text-[#a7d26d] mb-4"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} />
        <motion.h2 className="font-light text-3xl lg:text-5xl tracking-wider text-slate-300/80 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} >
          De la vision a l'impact
        </motion.h2>
        <motion.p className="text-lg text-white/35 max-w-xl mb-14 md:mb-20 leading-relaxed font-light"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} >
          Une methodologie eprouvee qui transforme la complexite en resultats tangibles.
        </motion.p>

        {/* Desktop */}
        <div className="hidden md:block">
          <svg className="w-full max-w-4xl mx-auto" viewBox="0 0 1000 180" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {STEPS.slice(0, -1).map((_, i) => (
              <motion.line key={i} x1={100 + i * 200 + 28} y1="60" x2={100 + (i + 1) * 200 - 28} y2="60"
                stroke="rgba(167,210,109,0.12)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
              />
            ))}

            {isInView && (
              <motion.circle r="3" fill="#a7d26d" filter="url(#dot-glow)"
                initial={{ cx: 100, cy: 60, opacity: 0 }}
                animate={{ cx: [100, 300, 500, 700, 900], cy: 60, opacity: [0, 1, 1, 1, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: 'linear', delay: 2 }}
              />
            )}

            {STEPS.map((step, i) => {
              const cx = 100 + i * 200
              return (
                <g key={step.number}>
                  <motion.circle cx={cx} cy={60} r={24}
                    fill="rgba(167,210,109,0.03)" stroke="rgba(167,210,109,0.2)" strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 + i * 0.1 }}
                    style={{ transformOrigin: `${cx}px 60px` }}
                  />
                  <motion.text x={cx} y={65} textAnchor="middle"
                    fill="#a7d26d" fontFamily="'JetBrains Mono', monospace" fontSize="13"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 + i * 0.1 }}
                  >{step.number}</motion.text>
                  <motion.text x={cx} y={110} textAnchor="middle"
                    fill="rgba(255,255,255,0.7)" fontFamily="'Poppins', sans-serif" fontSize="14" fontWeight="300"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 + i * 0.1 }}
                  >{step.label}</motion.text>
                  <motion.text x={cx} y={130} textAnchor="middle"
                    fill="rgba(255,255,255,0.2)" fontFamily="'JetBrains Mono', monospace" fontSize="8"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 + i * 0.1 }}
                  >{step.desc}</motion.text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          {STEPS.map((step, i) => (
            <motion.div key={step.number} className="flex gap-5 items-start"
              initial={{ opacity: 0, x: -15 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#a7d26d]/20 bg-[#a7d26d]/5 flex items-center justify-center shrink-0">
                  <span className="text-[#a7d26d] text-base font-mono">{step.number}</span>
                </div>
                {i < STEPS.length - 1 && <div className="w-px h-10 bg-[#a7d26d]/10" />}
              </div>
              <div className="pb-10 pt-2">
                <h4 className="text-white/70 text-xl font-light mb-1">{step.label}</h4>
                <p className="text-white/25 text-base leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
