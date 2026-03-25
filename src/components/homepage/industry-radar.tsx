'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const INDUSTRIES = [
  { name: 'Finance', value: 88, desc: 'Banque digitale, paiement mobile, conformite' },
  { name: 'Industrie', value: 76, desc: 'Usine 4.0, IoT industriel, supply chain' },
  { name: 'Sante', value: 68, desc: 'Telemedicine, dossier patient numerique' },
  { name: 'Retail', value: 92, desc: 'Commerce omnicanal, CX, logistique' },
  { name: 'Telecom', value: 82, desc: 'Infrastructure 5G, monetisation data' },
  { name: 'Secteur Public', value: 64, desc: 'E-gouvernement, smart city' },
]

function polar(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export function IndustryRadar() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 })
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const cx = 250, cy = 250, maxR = 170
  const sides = INDUSTRIES.length, step = 360 / sides
  const rings = [0.25, 0.5, 0.75, 1]

  const getPoints = useCallback(() =>
    INDUSTRIES.map((ind, i) => polar(cx, cy, (ind.value / 100) * maxR, i * step))
  , [])

  const polyPoints = getPoints().map(p => `${p.x},${p.y}`).join(' ')

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.p className="font-mono text-xs tracking-[0.15em] uppercase text-[#a7d26d] mb-4"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} >
          Expertise Sectorielle
        </motion.p>
        <motion.h2 className="font-light text-3xl lg:text-5xl tracking-wider text-slate-300/80 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} >
          Expertise approfondie, secteur par secteur
        </motion.h2>
        <motion.p className="text-lg text-white/35 max-w-xl mb-14 md:mb-20 leading-relaxed font-light"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} >
          Nous accompagnons les leaders de chaque industrie avec une connaissance intime de leurs enjeux.
        </motion.p>

        {/* Desktop */}
        <div className="hidden md:flex justify-center">
          <svg viewBox="0 0 500 500" className="w-full max-w-lg">
            {rings.map((scale, ri) => {
              const pts = Array.from({ length: sides }, (_, i) => {
                const p = polar(cx, cy, maxR * scale, i * step)
                return `${p.x},${p.y}`
              }).join(' ')
              return (
                <motion.polygon key={ri} points={pts}
                  fill="none" stroke="rgba(167,210,109,0.05)" strokeWidth="0.5"
                  initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + ri * 0.08 }}
                />
              )
            })}

            {INDUSTRIES.map((_, i) => {
              const p = polar(cx, cy, maxR, i * step)
              return (
                <motion.line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
                  stroke="rgba(167,210,109,0.06)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                />
              )
            })}

            <motion.polygon points={polyPoints}
              fill="rgba(167,210,109,0.06)" stroke="rgba(167,210,109,0.5)" strokeWidth="1.5" strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {INDUSTRIES.map((ind, i) => {
              const dp = getPoints()[i]
              const lp = polar(cx, cy, maxR + 36, i * step)
              const isH = hoveredIdx === i
              return (
                <g key={ind.name} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="cursor-pointer">
                  <circle cx={dp.x} cy={dp.y} r="24" fill="transparent" />
                  {isH && <line x1={cx} y1={cy} x2={polar(cx, cy, maxR, i * step).x} y2={polar(cx, cy, maxR, i * step).y} stroke="rgba(167,210,109,0.2)" strokeWidth="1" />}
                  <motion.circle cx={dp.x} cy={dp.y} r={isH ? 6 : 3.5}
                    fill={isH ? '#a7d26d' : 'rgba(167,210,109,0.6)'}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + i * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ transformOrigin: `${dp.x}px ${dp.y}px` }}
                  />
                  <motion.text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
                    fill={isH ? '#a7d26d' : 'rgba(255,255,255,0.45)'}
                    fontFamily="'Poppins', sans-serif" fontSize="11" fontWeight={isH ? 400 : 300}
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.1 + i * 0.05 }}
                  >{ind.name}</motion.text>
                  {isH && (
                    <text x={lp.x} y={lp.y + 14} textAnchor="middle"
                      fill="rgba(167,210,109,0.5)" fontFamily="'JetBrains Mono', monospace" fontSize="9"
                    >{ind.value}%</text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-5">
          {INDUSTRIES.map((ind, i) => (
            <motion.div key={ind.name}
              initial={{ opacity: 0, x: -15 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-white/60 text-lg">{ind.name}</span>
                <span className="text-[#a7d26d] text-base font-mono">{ind.value}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#a7d26d]/35 rounded-full"
                  initial={{ width: 0 }} animate={isInView ? { width: `${ind.value}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                />
              </div>
              <p className="text-white/15 text-sm mt-1.5">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
