'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface CTASectionProps { heading: string; buttonText: string; buttonLink: string }

export function CTASection({ heading, buttonText, buttonLink }: CTASectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,210,109,0.03)_0%,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(167,210,109,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,210,109,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2 className="font-light text-2xl lg:text-4xl text-slate-300/80 tracking-wider leading-snug mb-10"
          initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        >{heading}</motion.h2>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <Link href={buttonLink}
            className="group inline-flex items-center gap-3 bg-[#a7d26d] text-[#0C130B] px-8 py-4 text-[0.95rem] font-medium tracking-wide hover:shadow-[0_0_40px_rgba(167,210,109,0.2)] transition-all duration-300"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.a href="tel:+212661903077"
          className="mt-8 inline-block font-mono text-[0.8rem] text-white/15 hover:text-[#a7d26d] transition-colors duration-300"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
        >+212 6 61 90 30 77</motion.a>
      </div>
    </section>
  )
}
