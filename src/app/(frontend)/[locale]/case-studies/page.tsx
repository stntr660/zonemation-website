import { Link } from '@/i18n/routing'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function getPayloadClient() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  return getPayload({ config })
}

export const metadata = {
  title: 'Case Studies - Zonemation',
  description: 'Impact mesurable, projet apres projet. Decouvrez comment nous aidons nos clients a depasser leurs objectifs.',
}

export default async function CaseStudiesPage() {
  const payload = await getPayloadClient()

  const { docs: caseStudies } = await payload.find({
    collection: 'case-studies',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit: 24,
    depth: 2,
  })

  const featured = caseStudies.filter((cs) => cs.featured)
  const rest = caseStudies.filter((cs) => !cs.featured)

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-4">
            IMPACT MESURABLE
          </p>
          <h1 className="font-light text-4xl lg:text-6xl tracking-wider text-slate-300/80 mb-4">
            Case Studies
          </h1>
          <p className="text-[1rem] text-white/35 max-w-xl leading-relaxed font-light">
            Comment nous aidons nos clients a depasser leurs objectifs de transformation.
          </p>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-px bg-white/[0.03] mb-12">
            {featured.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} large />
            ))}
          </div>
        )}

        {/* All */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
          {rest.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </div>
    </main>
  )
}

function CaseStudyCard({ cs, large }: { cs: any; large?: boolean }) {
  const clientLabel = cs.clientDisplay === 'named' ? cs.clientName : cs.clientAnonymous

  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className={`group block bg-[#181a0e] hover:bg-[#1e2112] transition-colors duration-300 ${large ? 'min-h-[400px]' : ''}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#a7d26d] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />

      {cs.coverImage && typeof cs.coverImage === 'object' && (
        <div className={`relative overflow-hidden ${large ? 'h-64' : 'h-48'}`}>
          <Image
            src={cs.coverImage.url || ''}
            alt={cs.coverImage.alt || cs.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-[#181a0e]/40" />
        </div>
      )}

      <div className="p-8">
        {clientLabel && (
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-3">
            {clientLabel}
          </p>
        )}
        <h2 className={`font-light text-white/70 tracking-wider leading-snug mb-3 group-hover:text-[#a7d26d] transition-colors duration-300 ${large ? 'text-[1.4rem]' : 'text-[1.1rem]'}`}>
          {cs.title}
        </h2>
        <p className="text-white/25 text-[0.85rem] leading-relaxed line-clamp-2 mb-5">
          {cs.excerpt}
        </p>

        {/* Headline metrics */}
        {cs.headlineMetrics && cs.headlineMetrics.length > 0 && (
          <div className="flex gap-6 pt-4 border-t border-white/[0.06]">
            {cs.headlineMetrics.slice(0, 3).map((m: any, i: number) => (
              <div key={i}>
                <span className="text-[#a7d26d] text-[1.2rem] font-light">{m.value}</span>
                <span className="text-white/25 text-[0.7rem] font-mono ml-1.5">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
