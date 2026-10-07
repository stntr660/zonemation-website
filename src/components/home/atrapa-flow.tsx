'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { MapPin, MessageCircle, QrCode } from 'lucide-react'
import { useTranslations } from 'next-intl'
import QRCode from 'qrcode'

/*
 * A promo poster's QR code (an Atrapa tracking link) being scanned: WhatsApp
 * opens with the message already written, the Atrapa AI answers with the
 * offer, and the lead is recorded against the poster it came from. Drawn in
 * Atrapa's orange, with the app's square-ish corners.
 */

const ORANGE = 'hsl(20 90% 50%)'
const INK = 'text-[hsl(20_14%_12%)]'
const MUTED = 'text-[hsl(20_8%_45%)]'
const LINE = 'border-[hsl(20_12%_88%)]'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function AtrapaFlow() {
  const t = useTranslations('products.atrapa.qr')
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [qr, setQr] = useState('')
  // 0 scanning, 1 customer message, 2 AI typing, 3 AI reply
  const [stage, setStage] = useState(reduce ? 3 : 0)

  useEffect(() => {
    QRCode.toString('https://atrapa.io', { type: 'svg', margin: 0, color: { dark: '#1f1611', light: '#00000000' } })
      .then(setQr)
      .catch(() => setQr(''))
  }, [])

  useEffect(() => {
    if (reduce || !inView) return
    let cancelled = false
    ;(async () => {
      while (!cancelled) {
        setStage(0)
        await sleep(2000)
        for (const s of [1, 2, 3]) {
          if (cancelled) return
          setStage(s)
          await sleep(s === 2 ? 1100 : 1400)
        }
        await sleep(3800)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [inView, reduce])

  return (
    <div ref={ref} className={`rounded-xl border ${LINE} bg-white p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]`}>
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex items-center gap-2 text-sm font-semibold ${INK}`}>
          <span className="flex h-7 w-7 items-center justify-center rounded-md text-white" style={{ backgroundColor: ORANGE }}>
            <QrCode className="h-3.5 w-3.5" />
          </span>
          {t('title')}
        </div>
        <span className={`text-[11px] ${MUTED}`}>{t('caption')}</span>
      </div>

      <div className="flex gap-3">
        <div className={`relative h-[6.5rem] w-[6.5rem] shrink-0 overflow-hidden rounded-md border ${LINE} bg-white p-2`}>
          <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qr }} />
          {!reduce && stage === 0 && (
            <motion.span
              className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-[hsl(20_90%_50%/0.4)] to-transparent"
              animate={{ top: ['-30%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-md bg-[#efeae2] p-2">
          <div className={`flex items-center gap-1.5 border-b border-black/5 pb-1.5 text-[11px] font-medium ${INK}`}>
            <MessageCircle className="h-3 w-3 text-[#25D366]" />
            WhatsApp
          </div>
          <AnimatePresence initial={false}>
            {stage >= 1 && (
              <motion.div
                key="ask"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`ms-auto max-w-[92%] rounded-md rounded-ee-none bg-[#d9fdd3] px-2 py-1 text-[11px] leading-snug ${INK}`}
              >
                {t('ask')}
              </motion.div>
            )}
            {stage === 2 && (
              <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-10 gap-1 rounded-md bg-white px-2 py-1.5">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1 w-1 rounded-full bg-neutral-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
            {stage >= 3 && (
              <motion.div
                key="reply"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`max-w-[92%] rounded-md rounded-es-none bg-white px-2 py-1 text-[11px] leading-snug ${INK}`}
              >
                <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>
                  {t('aiLabel')}
                </span>
                {t('reply')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 4 }}
        transition={{ duration: 0.4 }}
        className={`mt-3 flex items-center gap-1.5 border-t ${LINE} pt-2.5 text-[11px] ${MUTED}`}
      >
        <MapPin className="h-3 w-3" style={{ color: ORANGE }} />
        {t('source')}
      </motion.div>
    </div>
  )
}
