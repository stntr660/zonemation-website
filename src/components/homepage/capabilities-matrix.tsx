'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface Capability { id: string; name: string; slug: string; description?: string }
interface CapabilitiesMatrixProps { capabilities: Capability[] }

export function CapabilitiesMatrix({ capabilities }: CapabilitiesMatrixProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 })
  if (!capabilities?.length) return null

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-4"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} >
          Expertises
        </motion.p>
        <motion.h2 className="font-light text-3xl lg:text-5xl tracking-wider text-slate-300/80 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} >
          Des solutions pour chaque defi
        </motion.h2>
        <motion.p className="text-[1rem] text-white/35 max-w-xl mb-14 md:mb-20 leading-relaxed font-light"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} >
          De la strategie a l'execution, une expertise profonde sur les leviers qui comptent.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
          {capabilities.slice(0, 6).map((cap, i) => (
            <motion.div key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            >
              <Link href={`/capabilities/${cap.slug}`}
                className="group block p-8 bg-[#181a0e] hover:bg-[#1e2112] transition-colors duration-300 h-full"
              >
                <h4 className="text-white/70 text-[1.1rem] font-light mb-2 group-hover:text-[#a7d26d] transition-colors duration-300">
                  {cap.name}
                </h4>
                {cap.description && (
                  <p className="text-white/25 text-[0.85rem] leading-relaxed line-clamp-2 mb-5">{cap.description}</p>
                )}
                <div className="flex items-center gap-2 text-[#a7d26d] text-[0.8rem] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
