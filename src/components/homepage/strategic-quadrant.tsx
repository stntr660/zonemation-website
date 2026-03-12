'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const QUADRANTS = [
  { label: 'Stabiliser', sub: 'Fondations & gouvernance', pos: 'bl' as const, opacity: 0.025 },
  { label: 'Optimiser', sub: 'Performance & efficience', pos: 'tl' as const, opacity: 0.04 },
  { label: 'Accelerer', sub: 'Innovation & croissance', pos: 'tr' as const, opacity: 0.06 },
  { label: 'Transformer', sub: 'Reinvention & disruption', pos: 'br' as const, opacity: 0.04 },
]

const DOTS = [
  { name: 'Cloud & Infrastructure', x: 74, y: 72 },
  { name: 'Data & Intelligence', x: 67, y: 82 },
  { name: 'Process Automation', x: 32, y: 66 },
  { name: 'Legacy Modernization', x: 20, y: 28 },
  { name: 'Digital Strategy', x: 82, y: 34 },
  { name: 'AI & Machine Learning', x: 86, y: 76 },
  { name: 'CRM & Experience', x: 36, y: 60 },
  { name: 'Cybersecurite', x: 26, y: 42 },
  { name: 'Commerce Digital', x: 73, y: 38 },
  { name: 'ERP & Operations', x: 56, y: 54 },
]

const W = 700, H = 520, P = 80
const L = P, R = W - P, T = P, B = H - P
const MX = (L + R) / 2, MY = (T + B) / 2

function toSvg(xPct: number, yPct: number) {
  return { x: L + (xPct / 100) * (R - L), y: B - (yPct / 100) * (B - T) }
}

const RECTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  tl: { x: L, y: T, w: MX - L, h: MY - T },
  tr: { x: MX, y: T, w: R - MX, h: MY - T },
  bl: { x: L, y: MY, w: MX - L, h: B - MY },
  br: { x: MX, y: MY, w: R - MX, h: B - MY },
}

export function StrategicQuadrant() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-4"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
        >
          Cadre Strategique
        </motion.p>
        <motion.h2 className="font-light text-3xl lg:text-5xl tracking-wider text-slate-300/80 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Ou se situe votre organisation ?
        </motion.h2>
        <motion.p className="text-[1rem] text-white/35 max-w-xl mb-14 md:mb-20 leading-relaxed font-light"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Notre matrice positionne chaque initiative selon son impact strategique et la maturite digitale requise.
        </motion.p>

        {/* Desktop */}
        <div className="hidden md:block">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-3xl mx-auto">
            {/* Quadrant fills */}
            {QUADRANTS.map((q, i) => {
              const r = RECTS[q.pos]
              return (
                <motion.rect key={q.label} x={r.x} y={r.y} width={r.w} height={r.h}
                  fill={`rgba(167,210,109,${q.opacity})`}
                  initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                />
              )
            })}

            {/* Fine grid */}
            {[0.25, 0.5, 0.75].map((pct) => {
              const x = L + pct * (R - L), y = T + pct * (B - T)
              return (
                <g key={pct} opacity="0.04">
                  <line x1={x} y1={T} x2={x} y2={B} stroke="#a7d26d" strokeWidth="0.5" />
                  <line x1={L} y1={y} x2={R} y2={y} stroke="#a7d26d" strokeWidth="0.5" />
                </g>
              )
            })}

            {/* Main axes */}
            <motion.line x1={L} y1={MY} x2={R} y2={MY} stroke="#a7d26d" strokeWidth="1" opacity="0.25"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.9, delay: 0.3 }} />
            <motion.line x1={MX} y1={B} x2={MX} y2={T} stroke="#a7d26d" strokeWidth="1" opacity="0.25"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.9, delay: 0.3 }} />

            {/* Arrows */}
            <path d={`M${R - 5},${MY - 3} L${R},${MY} L${R - 5},${MY + 3}`} fill="none" stroke="#a7d26d" strokeWidth="1" opacity="0.25" />
            <path d={`M${MX - 3},${T + 5} L${MX},${T} L${MX + 3},${T + 5}`} fill="none" stroke="#a7d26d" strokeWidth="1" opacity="0.25" />

            {/* Axis labels */}
            <motion.text x={R} y={MY + 18} textAnchor="end"
              fill="rgba(255,255,255,0.18)" fontFamily="'JetBrains Mono', monospace" fontSize="8"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
            >IMPACT STRATEGIQUE →</motion.text>
            <motion.text x={MX + 8} y={T + 4} textAnchor="start"
              fill="rgba(255,255,255,0.18)" fontFamily="'JetBrains Mono', monospace" fontSize="8"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
            >↑ MATURITE DIGITALE</motion.text>

            {/* Quadrant names */}
            {QUADRANTS.map((q, i) => {
              const r = RECTS[q.pos]
              const tx = r.x + r.w / 2, ty = r.y + r.h / 2
              return (
                <motion.g key={`ql-${i}`} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.85 + i * 0.05 }}>
                  <text x={tx} y={ty - 3} textAnchor="middle"
                    fill="rgba(255,255,255,0.07)" fontSize="16" fontWeight="200" letterSpacing="0.12em"
                    fontFamily="'Poppins', sans-serif"
                  >{q.label.toUpperCase()}</text>
                  <text x={tx} y={ty + 12} textAnchor="middle"
                    fill="rgba(255,255,255,0.04)" fontFamily="'JetBrains Mono', monospace" fontSize="7"
                  >{q.sub}</text>
                </motion.g>
              )
            })}

            {/* Dots */}
            {DOTS.map((dot, i) => {
              const p = toSvg(dot.x, dot.y)
              const isH = hovered === i
              return (
                <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                  <circle cx={p.x} cy={p.y} r="22" fill="transparent" />
                  <AnimatePresence>
                    {isH && (
                      <motion.circle cx={p.x} cy={p.y} r="16"
                        fill="none" stroke="#a7d26d" strokeWidth="0.5"
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.35, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.3 }} transition={{ duration: 0.25 }}
                        style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                      />
                    )}
                  </AnimatePresence>
                  {isH && (
                    <line x1={MX} y1={MY} x2={p.x} y2={p.y}
                      stroke="rgba(167,210,109,0.1)" strokeWidth="0.5" strokeDasharray="3 3" />
                  )}
                  <motion.circle cx={p.x} cy={p.y} r={isH ? 7 : 4.5}
                    fill={isH ? '#a7d26d' : 'rgba(167,210,109,0.35)'}
                    stroke={isH ? 'rgba(167,210,109,0.6)' : 'rgba(167,210,109,0.15)'} strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.1 + i * 0.06 }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  />
                  <AnimatePresence>
                    {isH && (
                      <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                        <rect x={p.x - 68} y={p.y - 32} width="136" height="24" rx="4"
                          fill="rgba(24,26,14,0.95)" stroke="rgba(167,210,109,0.2)" strokeWidth="0.5" />
                        <text x={p.x} y={p.y - 17} textAnchor="middle"
                          fill="white" fontSize="9" fontWeight="300" fontFamily="'Poppins', sans-serif"
                        >{dot.name}</text>
                      </motion.g>
                    )}
                  </AnimatePresence>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {DOTS.map((dot, i) => {
            const q = dot.x >= 50 ? (dot.y >= 50 ? 'Accelerer' : 'Transformer') : (dot.y >= 50 ? 'Optimiser' : 'Stabiliser')
            return (
              <motion.div key={i} className="space-y-1.5"
                initial={{ opacity: 0, x: -12 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-[0.85rem]">{dot.name}</span>
                  <span className="text-[#a7d26d]/35 text-[0.7rem] font-mono">{q}</span>
                </div>
                <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, rgba(167,210,109,0.2), rgba(167,210,109,0.5))' }}
                    initial={{ width: 0 }} animate={isInView ? { width: `${(dot.x + dot.y) / 2}%` } : {}}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.05 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
