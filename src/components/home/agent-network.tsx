'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Node = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean }
type Pulse = { from: number; to: number; t: number; speed: number }

const LIME = '167, 210, 109'
const LINK_DISTANCE = 150

/**
 * Background of the hero: a field of AI agents (nodes) that pass tasks to each
 * other (pulses of light travelling along the links). Hubs glow brighter.
 * Drawn on a canvas so it stays cheap; static frame when motion is reduced.
 */
export function AgentNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let frame = 0
    const pointer = { x: -9999, y: -9999 }

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(90, Math.max(28, (width * height) / 14000)))
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hub: i % 9 === 0,
        r: i % 9 === 0 ? 2.6 : 1.2 + Math.random() * 0.8,
      }))
      pulses = []
    }

    const neighbours = (i: number) => {
      const out: number[] = []
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) out.push(j)
      }
      return out
    }

    const spawnPulse = (from: number) => {
      const near = neighbours(from)
      if (!near.length) return
      const to = near[Math.floor(Math.random() * near.length)]
      pulses.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.012 })
    }

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height)

      if (animate) {
        for (const n of nodes) {
          // Agents drift and lean slightly towards the pointer.
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d2 = dx * dx + dy * dy
          if (d2 < 220 * 220) {
            n.vx += dx * 0.00002
            n.vy += dy * 0.00002
          }
          n.vx = Math.max(-0.4, Math.min(0.4, n.vx))
          n.vy = Math.max(-0.4, Math.min(0.4, n.vy))
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK_DISTANCE * LINK_DISTANCE) continue
          const alpha = (1 - Math.sqrt(d2) / LINK_DISTANCE) * 0.18
          ctx.strokeStyle = `rgba(${LIME}, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      if (animate) {
        // Hubs hand out tasks; a finished pulse sometimes relays onwards.
        if (frame % 14 === 0 && pulses.length < 26) {
          const hubs = nodes.map((n, i) => (n.hub ? i : -1)).filter((i) => i >= 0)
          spawnPulse(hubs[Math.floor(Math.random() * hubs.length)] ?? 0)
        }
        pulses = pulses.filter((p) => {
          p.t += p.speed
          if (p.t >= 1) {
            if (Math.random() < 0.55) spawnPulse(p.to)
            return false
          }
          return true
        })
        for (const p of pulses) {
          const a = nodes[p.from]
          const b = nodes[p.to]
          const x = a.x + (b.x - a.x) * p.t
          const y = a.y + (b.y - a.y) * p.t
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 10)
          glow.addColorStop(0, `rgba(${LIME}, 0.9)`)
          glow.addColorStop(1, `rgba(${LIME}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(x, y, 10, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      for (const n of nodes) {
        if (n.hub) {
          const breathe = animate ? 0.5 + 0.5 * Math.sin(frame * 0.03 + n.x) : 0.6
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16)
          halo.addColorStop(0, `rgba(${LIME}, ${0.25 * breathe + 0.1})`)
          halo.addColorStop(1, `rgba(${LIME}, 0)`)
          ctx.fillStyle = halo
          ctx.beginPath()
          ctx.arc(n.x, n.y, 16, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(${LIME}, ${n.hub ? 0.95 : 0.55})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    let visible = true
    const loop = () => {
      frame++
      if (visible) draw(true)
      raf = requestAnimationFrame(loop)
    }

    seed()
    if (reduce) draw(false)
    else raf = requestAnimationFrame(loop)

    const onResize = () => {
      seed()
      if (reduce) draw(false)
    }
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    observer.observe(canvas)
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
