'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface Stat { value: string; label: string }
interface ImpactStatsProps { stats: Stat[] }

const FALLBACK_STATS: Stat[] = [
  { value: '150+', label: 'Projets livres' },
  { value: '40+', label: 'Clients actifs' },
  { value: '95%', label: 'Taux de satisfaction' },
  { value: '12', label: 'Secteurs couverts' },
]

function Counter({ value, isInView }: { value: string; isInView: boolean }) {
  const [display, setDisplay] = useState('0')
  const num = value.replace(/[^0-9.]/g, '')
  const suffix = value.replace(/[0-9.]/g, '')
  const target = parseFloat(num) || 0

  const go = useCallback(() => {
    if (!isInView || !target) { setDisplay(isInView ? value : '0'); return }
    const steps = 60
    let step = 0
    const timer = setInterval(() => {
      step++
      const eased = target * (1 - Math.pow(1 - step / steps, 3))
      setDisplay(`${Number.isInteger(target) ? Math.round(eased) : eased.toFixed(1)}${suffix}`)
      if (step >= steps) { clearInterval(timer); setDisplay(value) }
    }, 2000 / steps)
    return () => clearInterval(timer)
  }, [isInView, target, value, suffix])

  useEffect(() => { return go() }, [go])
  return <span>{display}</span>
}

export function ImpactStats({ stats }: ImpactStatsProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 })
  const items = stats?.length ? stats : FALLBACK_STATS

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <svg className="w-full h-px mb-14" viewBox="0 0 1000 1" preserveAspectRatio="none">
          <motion.line x1="0" y1="0.5" x2="1000" y2="0.5"
            stroke="#a7d26d" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.2 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((stat, i) => (
            <motion.div key={i}
              className="group text-center py-10 px-4 border-r border-b border-white/[0.04] last:border-r-0 lg:[&:nth-child(n+3)]:border-b-0 lg:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="font-thin text-6xl md:text-7xl text-[#a7d26d] tracking-tight">
                <Counter value={stat.value} isInView={isInView} />
              </div>
              <div className="font-mono text-xs tracking-[0.12em] uppercase text-white/25 mt-4">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
