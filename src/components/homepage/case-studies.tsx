'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface Project {
  id: string
  title: string
  slug: string
  client?: string
  excerpt: string
  coverImage: { url: string; alt?: string }
  stats?: Array<{ label: string; value: string }>
}

interface CaseStudiesProps {
  projects: Project[]
}

export function CaseStudies({ projects }: CaseStudiesProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 })
  if (!projects?.length) return null

  const [featured, ...rest] = projects

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-4"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} />
        <motion.h2 className="font-light text-3xl lg:text-5xl tracking-wider text-slate-300/80 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Impact mesurable, projet apres projet
        </motion.h2>
        <motion.p className="text-[1rem] text-white/35 max-w-xl mb-14 md:mb-20 leading-relaxed font-light"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
        >
          Comment nous aidons nos clients a depasser leurs objectifs de transformation.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.03]">
          <motion.div className="md:row-span-2"
            initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card project={featured} large />
          </motion.div>
          {rest.slice(0, 2).map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
            >
              <Card project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ project, large }: { project: Project; large?: boolean }) {
  return (
    <Link href={`/case-studies/${project.slug}`}
      className={`group relative block overflow-hidden bg-[#181a0e] hover:bg-[#1e2112] transition-colors duration-300 ${large ? 'h-full min-h-[420px] md:min-h-0' : 'h-[280px]'}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#a7d26d] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />
      <div className="absolute inset-0">
        <Image src={project.coverImage.url} alt={project.coverImage.alt || project.title}
          fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-[#181a0e]/75 group-hover:bg-[#181a0e]/65 transition-colors duration-300" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        {project.client && (
          <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-3">{project.client}</span>
        )}
        <h3 className={`font-light text-white/70 tracking-wider leading-snug mb-3 group-hover:text-[#a7d26d] transition-colors duration-300 ${large ? 'text-[1.4rem] md:text-[1.6rem]' : 'text-[1.1rem]'}`}>
          {project.title}
        </h3>
        {project.stats && project.stats.length > 0 && (
          <div className="flex gap-8 mt-2">
            {project.stats.slice(0, 3).map((s, i) => (
              <div key={i}>
                <span className="text-[#a7d26d] text-[1.4rem] font-light">{s.value}</span>
                <span className="text-white/25 text-[0.75rem] font-mono ml-2">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
