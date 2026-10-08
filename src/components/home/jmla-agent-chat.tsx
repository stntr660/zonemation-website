'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, Loader2, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

/*
 * The JMLA Pro agent conversation, ported from the hero of jmlapro.com
 * (components/marketing/sections/agent-chat-demo.tsx) so the card wears the
 * product's own brand, not Zonemation's. Same script and timings; it only
 * plays while on screen.
 */

const BRAND_GRADIENT = 'bg-[linear-gradient(135deg,hsl(0_72%_51%),hsl(18_85%_55%))]'
const INK = 'text-[hsl(20_14%_12%)]'
const MUTED = 'text-[hsl(20_8%_42%)]'
const LINE = 'border-[hsl(20_12%_88%)]'
const SOFT = 'bg-[hsl(24_24%_97%)]'

type ChatItem =
  | { kind: 'user'; text: string }
  | { kind: 'tools'; labels: string[] }
  | { kind: 'agent'; text: string }
  | { kind: 'order' }
  | { kind: 'typing' }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function JmlaAgentChat() {
  const t = useTranslations('products.jmlapro.agent')
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<ChatItem[]>([])

  useEffect(() => {
    const script: ChatItem[] = [
      { kind: 'user', text: t('askBalance') },
      { kind: 'tools', labels: [t('tools.resolveClient'), t('tools.clientBalance')] },
      { kind: 'agent', text: t('answerBalance') },
      { kind: 'user', text: t('makeOrder') },
      { kind: 'tools', labels: [t('tools.checkStock'), t('tools.createOrder')] },
      { kind: 'order' },
      { kind: 'agent', text: t('done') },
    ]

    if (reduce) {
      setItems(script)
      return
    }
    if (!inView) return

    let cancelled = false
    async function run() {
      while (!cancelled) {
        setItems([])
        await sleep(700)
        for (const item of script) {
          if (cancelled) return
          if (item.kind === 'agent' || item.kind === 'order') {
            setItems((v) => [...v, { kind: 'typing' }])
            await sleep(item.kind === 'order' ? 850 : 1000)
            if (cancelled) return
            setItems((v) => [...v.slice(0, -1), item])
            await sleep(item.kind === 'order' ? 1600 : 1200)
          } else if (item.kind === 'tools') {
            setItems((v) => [...v, item])
            await sleep(1600)
          } else {
            setItems((v) => [...v, item])
            await sleep(950)
          }
        }
        await sleep(4000)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [reduce, inView, t])

  // Keep the latest message in view as the conversation grows.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items])

  // The island widens into a live activity while the agent is working.
  const last = items[items.length - 1]
  const busy = !reduce && (last?.kind === 'typing' || last?.kind === 'tools')

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[14.5rem]">
      {/* Side buttons */}
      <span className="absolute -start-[3px] top-24 h-7 w-[3px] rounded-s bg-[#2a2a2c]" />
      <span className="absolute -start-[3px] top-36 h-12 w-[3px] rounded-s bg-[#2a2a2c]" />
      <span className="absolute -start-[3px] top-[13.5rem] h-12 w-[3px] rounded-s bg-[#2a2a2c]" />
      <span className="absolute -end-[3px] top-40 h-16 w-[3px] rounded-e bg-[#2a2a2c]" />

      {/* Titanium frame */}
      <div className="rounded-[2.6rem] bg-gradient-to-b from-[#3a3a3c] via-[#1c1c1e] to-[#2c2c2e] p-[3px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
        <div className="rounded-[2.45rem] bg-black p-[7px]">
          <div className="relative flex h-[28rem] flex-col overflow-hidden rounded-[2rem] bg-white">
            {/* Status bar */}
            <div className={`relative flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-[13px] font-semibold ${INK}`} dir="ltr">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 18 12" className="h-2.5 w-4" fill="currentColor" aria-hidden>
                  <rect x="0" y="8" width="3" height="4" rx="1" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                  <rect x="10" y="3" width="3" height="9" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 0 0 8 .4 10.3 10.3 0 0 0 .8 3.3L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4a6.7 6.7 0 0 0-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3ZM8 9.4 9.9 7.4a2.8 2.8 0 0 0-3.8 0L8 9.4Z" />
                </svg>
                <span className="relative ms-0.5 flex h-[11px] w-[22px] items-center rounded-[3px] border border-current/40 p-[1.5px]">
                  <span className="h-full w-[80%] rounded-[1.5px] bg-current" />
                </span>
              </span>

              {/* Dynamic Island */}
              <motion.div
                className="absolute start-1/2 top-2 flex h-[26px] -translate-x-1/2 items-center justify-between overflow-hidden rounded-full bg-black px-2"
                initial={false}
                animate={{ width: busy ? 118 : 88 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <AnimatePresence>
                  {busy && (
                    <motion.span
                      key="busy"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${BRAND_GRADIENT}`}
                    >
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {busy && (
                    <motion.span
                      key="wave"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-[2px]"
                    >
                      {[0, 1, 2, 3, 4].map((b) => (
                        <motion.span
                          key={b}
                          className="w-[2px] rounded-full bg-[hsl(18_85%_55%)]"
                          animate={{ height: [4, 11, 4] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: b * 0.1, ease: 'easeInOut' }}
                        />
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* App header */}
            <div className={`flex shrink-0 items-center gap-3 border-b ${LINE} px-4 pb-3 pt-1`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${BRAND_GRADIENT} text-white`}>
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${INK}`}>{t('header')}</div>
                <div className={`flex items-center gap-1.5 text-xs ${MUTED}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t('status')}
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-3.5 py-4">
              <AnimatePresence initial={false}>
                {items.map((item, i) => (
                  <ChatRow key={`${i}-${item.kind}`} item={item} reduce={!!reduce} />
                ))}
              </AnimatePresence>
            </div>

            <div className={`flex shrink-0 items-center gap-2 border-t ${LINE} px-3.5 pb-2 pt-3`}>
              <div className={`flex-1 truncate rounded-full ${SOFT} px-4 py-2 text-[13px] ${MUTED}`}>{t('inputPlaceholder')}</div>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${BRAND_GRADIENT} text-white`}>
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>
            {/* Home indicator */}
            <div className="flex shrink-0 justify-center pb-2 pt-1">
              <span className="h-[4px] w-24 rounded-full bg-black/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatRow({ item, reduce }: { item: ChatItem; reduce: boolean }) {
  const t = useTranslations('products.jmlapro.agent')
  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      }

  if (item.kind === 'user') {
    return (
      <motion.div
        {...motionProps}
        className={`max-w-[85%] self-end rounded-2xl rounded-ee-md ${BRAND_GRADIENT} px-4 py-2.5 text-sm leading-relaxed text-white`}
      >
        {item.text}
      </motion.div>
    )
  }

  if (item.kind === 'agent') {
    return (
      <motion.div
        {...motionProps}
        className={`max-w-[85%] self-start rounded-2xl rounded-ss-md border ${LINE} bg-white px-4 py-2.5 text-sm leading-relaxed ${INK}`}
      >
        {item.text}
      </motion.div>
    )
  }

  if (item.kind === 'typing') {
    return (
      <motion.div
        {...motionProps}
        className={`flex max-w-[85%] self-start items-center gap-1.5 rounded-2xl rounded-ss-md border ${LINE} bg-white px-4 py-3`}
      >
        <Dot delay={0} reduce={reduce} />
        <Dot delay={0.15} reduce={reduce} />
        <Dot delay={0.3} reduce={reduce} />
      </motion.div>
    )
  }

  if (item.kind === 'tools') {
    return (
      <motion.div {...motionProps} className="flex flex-col gap-1.5 self-start">
        {item.labels.map((label, i) => (
          <ToolChip key={label} label={label} index={i} reduce={reduce} />
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      {...motionProps}
      className="max-w-[90%] self-start rounded-2xl border border-[hsl(0_72%_51%/0.3)] bg-[hsl(0_72%_51%/0.04)] p-3"
    >
      <div className={`mb-2 text-xs font-semibold ${INK}`}>{t('orderSummaryTitle')}</div>
      <div className={`rounded-lg bg-white px-3 py-2 text-sm ${INK}`}>{t('orderLine')}</div>
      <div className={`mt-2 text-sm font-semibold ${INK}`}>{t('orderTotal')}</div>
      <div className={`mt-3 text-xs ${MUTED}`}>{t('confirmQuestion')}</div>
      <div className="mt-2 flex gap-2">
        <span className={`flex-1 rounded-full ${BRAND_GRADIENT} px-3 py-2 text-center text-xs font-semibold text-white`}>
          {t('confirmYes')}
        </span>
        <span className={`rounded-full border ${LINE} bg-white px-3 py-2 text-center text-xs font-medium ${MUTED}`}>
          {t('confirmNo')}
        </span>
      </div>
    </motion.div>
  )
}

function ToolChip({ label, index, reduce }: { label: string; index: number; reduce: boolean }) {
  const [done, setDone] = useState(reduce)
  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setDone(true), 500 + index * 550)
    return () => clearTimeout(id)
  }, [index, reduce])

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border ${LINE} ${SOFT} px-3 py-1.5 text-xs ${MUTED}`}>
      {done ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-[hsl(0_72%_51%)]" />
      )}
      {label}
    </div>
  )
}

function Dot({ delay, reduce }: { delay: number; reduce: boolean }) {
  if (reduce) return <span className="h-1.5 w-1.5 rounded-full bg-[hsl(20_8%_42%)]" />
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-[hsl(20_8%_42%)]"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}
