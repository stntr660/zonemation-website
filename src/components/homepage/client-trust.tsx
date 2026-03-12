'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface Client {
  id: string
  name: string
  logo: { url: string; alt?: string }
}

interface ClientTrustProps {
  clients: Client[]
}

export function ClientTrust({ clients }: ClientTrustProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 })

  const showBrands = process.env.NEXT_PUBLIC_SHOW_BRANDS === 'true'
  if (!showBrands || !clients?.length) return null

  const useMarquee = clients.length > 6

  return (
    <section ref={ref} className="py-20 px-6 md:px-12 border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <motion.p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-white/15 text-center mb-12"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
        >
          Ils nous font confiance
        </motion.p>

        {useMarquee ? (
          <div className="overflow-hidden">
            <motion.div className="flex gap-16 items-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1, x: [0, -(clients.length * 140)] } : {}}
              transition={{ opacity: { duration: 0.5 }, x: { duration: clients.length * 3, repeat: Infinity, ease: 'linear' } }}
            >
              {[...clients, ...clients].map((c, i) => (
                <div key={`${c.id}-${i}`}
                  className="shrink-0 h-8 w-28 relative opacity-30 hover:opacity-80 transition-opacity duration-300"
                >
                  <Image src={c.logo.url} alt={c.name} fill className="object-contain brightness-0 invert" />
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-14">
            {clients.map((c, i) => (
              <motion.div key={c.id}
                className="h-8 w-28 relative opacity-25 hover:opacity-70 transition-opacity duration-300"
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 0.25, y: 0 } : {}}
                whileHover={{ opacity: 0.7 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Image src={c.logo.url} alt={c.name} fill className="object-contain brightness-0 invert" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
