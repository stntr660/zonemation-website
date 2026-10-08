'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Bot, GitBranch, Hourglass, MessageSquareReply, PackageCheck, QrCode, Truck, Workflow } from 'lucide-react'
import { useTranslations } from 'next-intl'

/*
 * A promo poster turned into sales, as an Atrapa workflow on its canvas: the
 * poster's QR code is scanned, the AI sends the offer, an If/Else splits on
 * whether the customer ordered, and each branch runs its actions. Every node
 * is a real Atrapa block (qr_scanned, send_ai_response, if_else,
 * update_order_status, create_parcel, time_delay, send_whatsapp). The run
 * alternates between the two branches.
 */

const ORANGE = 'hsl(20 90% 50%)'
const INK = 'text-[hsl(20_14%_12%)]'
const MUTED = 'text-[hsl(20_8%_45%)]'

type NodeKey = 'trigger' | 'ai' | 'branch' | 'parcel' | 'tracking' | 'wait' | 'nudge'

// Canvas is 1000 x 320; nodes are 168 x 80, positioned by centre.
const NODES: Record<NodeKey, { x: number; y: number; icon: typeof Bot; tint: string }> = {
  trigger: { x: 95, y: 160, icon: QrCode, tint: '#f97316' },
  ai: { x: 300, y: 160, icon: Bot, tint: '#8b5cf6' },
  branch: { x: 505, y: 160, icon: GitBranch, tint: '#f59e0b' },
  parcel: { x: 710, y: 70, icon: PackageCheck, tint: '#0ea5e9' },
  tracking: { x: 905, y: 70, icon: Truck, tint: '#22c55e' },
  wait: { x: 710, y: 250, icon: Hourglass, tint: '#64748b' },
  nudge: { x: 905, y: 250, icon: MessageSquareReply, tint: '#22c55e' },
}

const W = 168
const H = 80
const EDGES: { from: NodeKey; to: NodeKey; label?: 'yes' | 'no' }[] = [
  { from: 'trigger', to: 'ai' },
  { from: 'ai', to: 'branch' },
  { from: 'branch', to: 'parcel', label: 'yes' },
  { from: 'parcel', to: 'tracking' },
  { from: 'branch', to: 'wait', label: 'no' },
  { from: 'wait', to: 'nudge' },
]

const RUNS: NodeKey[][] = [
  ['trigger', 'ai', 'branch', 'parcel', 'tracking'],
  ['trigger', 'ai', 'branch', 'wait', 'nudge'],
]

function edgePath(from: NodeKey, to: NodeKey) {
  const a = NODES[from]
  const b = NODES[to]
  const x1 = a.x + W / 2
  const x2 = b.x - W / 2
  if (a.y === b.y) return `M${x1},${a.y} L${x2},${b.y}`
  const mid = (x1 + x2) / 2
  return `M${x1},${a.y} C${mid},${a.y} ${mid},${b.y} ${x2},${b.y}`
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function AtrapaWorkflow() {
  const t = useTranslations('products.atrapa.workflow')
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [lit, setLit] = useState<NodeKey[]>(reduce ? RUNS[0] : [])

  useEffect(() => {
    if (reduce || !inView) return
    let cancelled = false
    ;(async () => {
      let run = 0
      while (!cancelled) {
        setLit([])
        await sleep(700)
        for (let i = 1; i <= RUNS[run].length && !cancelled; i++) {
          setLit(RUNS[run].slice(0, i))
          await sleep(900)
        }
        await sleep(2200)
        run = (run + 1) % RUNS.length
      }
    })()
    return () => {
      cancelled = true
    }
  }, [inView, reduce])

  const current = lit[lit.length - 1]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
    >
      {/* Builder toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-[hsl(20_12%_88%)] px-5 py-3">
        <div className={`flex items-center gap-2.5 text-sm font-semibold ${INK}`}>
          <span className="flex h-7 w-7 items-center justify-center rounded-md text-white" style={{ backgroundColor: ORANGE }}>
            <Workflow className="h-3.5 w-3.5" />
          </span>
          {t('name')}
        </div>
        <div className="flex items-center gap-3">
          <span className={`hidden text-xs sm:inline ${MUTED}`}>{t('runs')}</span>
          <span className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {t('published')}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div
        role="region"
        aria-label={t('name')}
        tabIndex={0}
        className="overflow-x-auto overscroll-x-contain focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-400"
      >
        <div
          className="relative aspect-[1000/320] min-w-[640px]"
          style={{ backgroundImage: 'radial-gradient(hsl(20 10% 82%) 1px, transparent 1px)', backgroundSize: '18px 18px', backgroundColor: 'hsl(30 20% 98.5%)' }}
          dir="ltr"
        >
          <svg viewBox="0 0 1000 320" className="absolute inset-0 h-full w-full" aria-hidden>
            {EDGES.map(({ from, to, label }) => {
              const on = lit.includes(from) && lit.includes(to)
              const d = edgePath(from, to)
              const b = NODES[to]
              return (
                <g key={`${from}-${to}`}>
                  <path d={d} fill="none" stroke="hsl(20 10% 80%)" strokeWidth="1.5" strokeDasharray="5 5" />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  {label && (
                    <text
                      x={NODES[from].x + W / 2 + 6}
                      y={NODES[from].y + (label === 'yes' ? -14 : 26)}
                      textAnchor="start"
                      className="text-[11px] font-semibold"
                      fill={label === 'yes' ? '#16a34a' : '#94a3b8'}
                    >
                      {t(label)}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {(Object.keys(NODES) as NodeKey[]).map((key) => {
            const n = NODES[key]
            const Icon = n.icon
            const on = lit.includes(key)
            const isCurrent = current === key
            return (
              <motion.div
                key={key}
                className="absolute flex items-center rounded-lg border bg-white px-2 shadow-sm"
                style={{
                  left: `${((n.x - W / 2) / 1000) * 100}%`,
                  top: `${((n.y - H / 2) / 320) * 100}%`,
                  width: `${(W / 1000) * 100}%`,
                  height: `${(H / 320) * 100}%`,
                  borderColor: on ? ORANGE : 'hsl(20 12% 88%)',
                }}
                animate={{ scale: isCurrent ? 1.06 : 1, boxShadow: isCurrent ? '0 10px 30px -10px hsl(20 90% 50% / 0.6)' : '0 1px 2px rgba(0,0,0,0.05)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="absolute -top-3 start-2 flex h-5 w-5 items-center justify-center rounded-md" style={{ backgroundColor: `${n.tint}1a`, color: n.tint }}>
                  <Icon className="h-3 w-3" />
                </span>
                <span className="min-w-0 pt-1">
                  <span className={`block text-[8px] font-medium uppercase tracking-wide ${MUTED}`}>{t(`${key}.kind`)}</span>
                  <span className={`block text-[11px] font-semibold leading-tight ${INK}`}>{t(`${key}.label`)}</span>
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
