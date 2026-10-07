'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { StoreBadges, type Store } from './store-badges'

const EASE = [0.22, 1, 0.36, 1] as const

export type StoryStep = { kind: 'user' | 'agent' | 'chip'; text: string }

export interface ProductStageProps {
  id?: string
  eyebrow: string
  title: string
  text: string
  features: { icon: ReactNode; label: string }[]
  url: string
  domain: string
  image: string
  imageAlt: string
  cta: string
  stores: { store: Store; href: string }[]
  story?: StoryStep[]
  storyTitle?: string
  /** Replaces the default story card, e.g. a product's own branded demo. */
  overlay?: ReactNode
  /** Size and position classes of the floating card on desktop. */
  overlayClass?: string
  reverse?: boolean
  /** Decoration that animates in around the frame (e.g. channel icons). */
  orbit?: ReactNode
  /** Full-width content under the section, e.g. a workflow. */
  after?: ReactNode
}

/** Plays the steps one by one while visible, then starts over. */
function Story({ steps, title }: { steps: StoryStep[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? steps.length : 0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (reduce || !inView) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)))

    ;(async () => {
      while (!cancelled) {
        setShown(0)
        await wait(600)
        for (let i = 0; i < steps.length && !cancelled; i++) {
          if (steps[i].kind === 'agent') {
            setTyping(true)
            await wait(1300)
            setTyping(false)
          }
          setShown(i + 1)
          await wait(steps[i].kind === 'chip' ? 900 : 1500)
        }
        await wait(4500)
      }
    })()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [inView, reduce, steps])

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-[#1e2112]/90 backdrop-blur-md p-4 shadow-2xl shadow-black/40 space-y-2.5 min-h-[13rem]"
    >
      <p className="flex items-center gap-2 text-xs text-white/40 pb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#a7d26d] animate-pulse" />
        {title}
      </p>
      <AnimatePresence initial={false}>
        {steps.slice(0, shown).map((step, i) => (
          <motion.div
            key={`${i}-${step.text}`}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={
              step.kind === 'user'
                ? 'ms-auto max-w-[85%] rounded-2xl rounded-ee-sm bg-white/10 px-3.5 py-2 text-sm text-white'
                : step.kind === 'agent'
                  ? 'max-w-[90%] rounded-2xl rounded-es-sm bg-[#a7d26d] px-3.5 py-2 text-sm text-[#181a0e]'
                  : 'inline-flex items-center gap-1.5 rounded-full border border-[#a7d26d]/40 px-3 py-1 text-xs text-[#a7d26d]'
            }
          >
            {step.kind === 'chip' && <span>&#10003;</span>}
            {step.text}
          </motion.div>
        ))}
        {typing && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex gap-1 rounded-2xl bg-[#a7d26d]/20 px-3.5 py-3"
          >
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="w-1.5 h-1.5 rounded-full bg-[#a7d26d]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BrowserFrame({ url, domain, image, imageAlt }: { url: string; domain: string; image: string; imageAlt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Tilted back while entering the screen, flat once centred.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scrollTilt = useTransform(scrollYProgress, [0, 1], [24, 0])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [0.88, 1])

  // Follows the mouse a little on desktop.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(mx, { stiffness: 120, damping: 18 })
  const rotateX = useSpring(my, { stiffness: 120, damping: 18 })

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }

  return (
    <div ref={ref} style={{ perspective: 1600 }}>
      <motion.div style={reduce ? undefined : { rotateX: scrollTilt, scale: scrollScale, transformOrigin: 'center bottom' }}>
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={onMove}
          onMouseLeave={() => {
            mx.set(0)
            my.set(0)
          }}
          style={reduce ? undefined : { rotateX, rotateY }}
          className="group block rounded-xl border border-white/10 bg-[#1e2112] overflow-hidden shadow-[0_40px_120px_-30px_rgba(167,210,109,0.25)] hover:border-[#a7d26d]/50 transition-colors duration-300"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5" dir="ltr">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="rounded-md bg-white/5 px-4 py-0.5 text-xs text-white/50 group-hover:text-[#a7d26d] transition-colors">
                {domain}
              </span>
            </div>
            <span className="w-12" />
          </div>
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </motion.a>
      </motion.div>
    </div>
  )
}

export function ProductStage(props: ProductStageProps) {
  const { id, eyebrow, title, text, features, url, domain, image, imageAlt, cta, stores, story, storyTitle, overlay, overlayClass, reverse, orbit, after } = props

  return (
    <section id={id} className="relative px-6 py-16 lg:py-20 scroll-mt-8">
      <div className={`max-w-5xl mx-auto grid gap-12 lg:gap-10 items-center ${reverse ? 'lg:grid-cols-[7fr_3fr]' : 'lg:grid-cols-[3fr_7fr]'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`space-y-5 ${reverse ? 'lg:order-2' : ''}`}
        >
          <p className="text-[#a7d26d] text-sm tracking-[0.25em] uppercase">{eyebrow}</p>
          <h2 className="text-3xl lg:text-[2.1rem] font-light text-white leading-tight">{title}</h2>
          <p className="text-base text-white/55 font-light leading-relaxed">{text}</p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
            className="space-y-3 pt-2"
          >
            {features.map((f) => (
              <motion.li
                key={f.label}
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3 text-white/80"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#a7d26d]/10 text-[#a7d26d]">{f.icon}</span>
                {f.label}
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#a7d26d] px-6 py-3 text-[#181a0e] font-medium hover:bg-white transition-colors duration-300"
            >
              {cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">&rarr;</span>
            </a>
          </div>
          <StoreBadges stores={stores} />
        </motion.div>

        <div className={`relative ${reverse ? 'lg:order-1' : ''}`}>
          {orbit}
          <BrowserFrame url={url} domain={domain} image={image} imageAlt={imageAlt} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className={`relative mt-6 lg:absolute lg:mt-0 z-10 ${overlayClass ?? `lg:-bottom-12 lg:w-80 ${reverse ? 'lg:-start-10' : 'lg:-end-10'}`}`}
          >
            {overlay ?? (story && <Story steps={story} title={storyTitle ?? ''} />)}
          </motion.div>
        </div>
      </div>
      {after && <div className="max-w-5xl mx-auto mt-24 lg:mt-32">{after}</div>}
    </section>
  )
}
