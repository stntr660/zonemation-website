'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface Insight {
  id: string
  title: string
  slug: string
  type: string
  excerpt: string
  publishedDate: string
  readTime?: number
  coverImage: { url: string; alt?: string }
}

interface ThinkingSectionProps {
  insights: Insight[]
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return dateStr }
}

export function ThinkingSection({ insights }: ThinkingSectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 })
  if (!insights?.length) return null

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-4"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} />
        <motion.h2 className="font-light text-3xl lg:text-5xl tracking-wider text-slate-300/80 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Insights pour decideurs
        </motion.h2>
        <motion.p className="text-[1rem] text-white/35 max-w-xl mb-14 md:mb-20 leading-relaxed font-light"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
        >
          Analyses et points de vue pour anticiper les mutations de votre secteur.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.03]">
          {insights.slice(0, 3).map((insight, i) => (
            <motion.div key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <Link href={`/insights/${insight.slug}`}
                className="group block bg-[#181a0e] hover:bg-[#1e2112] transition-colors duration-300 h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
                  <Image src={insight.coverImage.url} alt={insight.coverImage.alt || insight.title}
                    fill className="object-cover group-hover:brightness-110 transition-all duration-300" />
                </div>
                <div className="p-8">
                  <span className="inline-block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-3">
                    {insight.type}
                  </span>
                  <h3 className="text-white/70 text-[1.1rem] font-light mb-2 line-clamp-2 leading-snug group-hover:text-[#a7d26d] transition-colors duration-300">
                    {insight.title}
                  </h3>
                  <p className="text-white/25 text-[0.85rem] leading-relaxed line-clamp-2 mb-4">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-white/15 text-[0.75rem] font-mono">
                    <span>{formatDate(insight.publishedDate)}</span>
                    {insight.readTime && (
                      <><span>|</span><span>{insight.readTime} min</span></>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
