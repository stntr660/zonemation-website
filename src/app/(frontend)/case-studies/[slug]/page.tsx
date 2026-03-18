import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

async function getPayloadClient() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  return getPayload({ config })
}

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args) {
  try {
    const { slug } = await params
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const cs = docs[0]
    if (!cs) return {}
    return {
      title: cs.seo?.metaTitle || `${cs.title} - Zonemation`,
      description: cs.seo?.metaDescription || cs.excerpt,
    }
  } catch {
    return {}
  }
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 3,
  })

  const cs = docs[0] as any
  if (!cs) notFound()

  const clientLabel = cs.clientDisplay === 'named' ? cs.clientName : cs.clientAnonymous
  const isPreview = cs.accessLevel === 'preview'

  const author = cs.author && typeof cs.author === 'object' ? cs.author : null
  const publishedDate = cs.publishedDate
    ? new Date(cs.publishedDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  // Related case studies
  const { docs: related } = await payload.find({
    collection: 'case-studies',
    where: {
      id: { not_equals: cs.id },
      status: { equals: 'published' },
    },
    limit: 3,
    sort: '-publishedDate',
  })

  return (
    <main className="pt-24 pb-20">
      {/* ─── HERO ─── */}
      <div className="relative h-[500px] mb-0">
        {cs.coverImage && typeof cs.coverImage === 'object' && (
          <Image
            src={cs.coverImage.url || ''}
            alt={cs.coverImage.alt || cs.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181a0e] via-[#181a0e]/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-12 w-full">
            {clientLabel && (
              <p className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-4">
                {clientLabel}
              </p>
            )}
            <h1 className="font-light text-3xl lg:text-5xl tracking-wider text-white/90 max-w-3xl leading-snug">
              {cs.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ─── META BAR ─── */}
      <div className="bg-[#181a0e] border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center gap-6 text-[0.75rem]">
          {author && (
            <div className="flex items-center gap-3">
              {author.photo && typeof author.photo === 'object' && (
                <Image src={author.photo.url || ''} alt={author.name} width={32} height={32} className="rounded-full" />
              )}
              <div>
                <span className="text-white/60">{author.name}</span>
                {author.role && <span className="text-white/25 ml-2">{author.role}</span>}
              </div>
            </div>
          )}
          {publishedDate && <span className="text-white/25 font-mono">{publishedDate}</span>}
          {cs.readTime && <span className="text-white/25 font-mono">{cs.readTime} min de lecture</span>}

          {/* Industry/capability tags */}
          <div className="flex gap-2 ml-auto">
            {cs.industries?.map((ind: any) => {
              const industry = typeof ind === 'object' ? ind : null
              if (!industry) return null
              return (
                <span key={industry.id} className="px-2 py-1 bg-white/[0.04] text-white/30 text-[0.65rem] font-mono">
                  {industry.name}
                </span>
              )
            })}
            {cs.capabilities?.map((cap: any) => {
              const capability = typeof cap === 'object' ? cap : null
              if (!capability) return null
              return (
                <span key={capability.id} className="px-2 py-1 bg-[#a7d26d]/10 text-[#a7d26d]/50 text-[0.65rem] font-mono">
                  {capability.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── HEADLINE METRICS ─── */}
      {cs.headlineMetrics && cs.headlineMetrics.length > 0 && (
        <div className="bg-[#181a0e]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(cs.headlineMetrics.length, 4)} gap-8`}>
              {cs.headlineMetrics.map((m: any, i: number) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-[#a7d26d] text-[2.5rem] md:text-[3rem] font-thin tracking-wider">{m.value}</p>
                  <p className="text-white/40 text-[0.85rem] font-light">{m.label}</p>
                  {m.context && <p className="text-white/15 text-[0.7rem] font-mono mt-1">{m.context}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── EXCERPT ─── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="max-w-3xl py-12">
          <p className="text-white/50 text-[1.1rem] leading-relaxed font-light">
            {cs.excerpt}
          </p>
        </div>

        {/* ─── GATED CONTENT CHECK ─── */}
        {isPreview ? (
          <div className="max-w-3xl pb-20">
            <div className="border border-white/[0.06] p-10 text-center">
              <p className="text-white/40 text-[1rem] mb-6">
                Pour lire l'etude de cas complete, contactez-nous.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#a7d26d] text-[#0C130B] px-8 py-4 text-[0.95rem] font-medium tracking-wide hover:shadow-[0_0_40px_rgba(167,210,109,0.2)] transition-all duration-300"
              >
                Continuer la lecture
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* ─── 1. SITUATION ─── */}
            {cs.situation && (
              <NarrativeSection
                number="01"
                heading={cs.situationHeading || 'Situation'}
                content={cs.situation}
              />
            )}

            {/* ─── 2. CHALLENGE ─── */}
            {cs.challenge && (
              <NarrativeSection
                number="02"
                heading={cs.challengeHeading || 'Challenge'}
                content={cs.challenge}
                image={cs.challengeImage}
                imageCaption={cs.challengeImageCaption}
              />
            )}

            {/* ─── 3. APPROACH ─── */}
            {cs.approach && (
              <NarrativeSection
                number="03"
                heading={cs.approachHeading || 'Approach'}
                content={cs.approach}
              >
                {/* Approach diagrams */}
                {cs.approachDiagrams && cs.approachDiagrams.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {cs.approachDiagrams.map((d: any, i: number) => {
                      const img = typeof d.image === 'object' ? d.image : null
                      if (!img) return null
                      return (
                        <figure key={i}>
                          <div className="relative aspect-[16/10] bg-white/[0.02] border border-white/[0.06]">
                            <Image src={img.url || ''} alt={d.caption || ''} fill className="object-contain p-2" />
                          </div>
                          {d.caption && <figcaption className="text-white/20 text-[0.7rem] font-mono mt-2">{d.caption}</figcaption>}
                        </figure>
                      )
                    })}
                  </div>
                )}
              </NarrativeSection>
            )}

            {/* ─── 4. RESULTS ─── */}
            {cs.results && (
              <NarrativeSection
                number="04"
                heading={cs.resultsHeading || 'Results'}
                content={cs.results}
                image={cs.resultsImage}
                imageCaption={cs.resultsImageCaption}
              >
                {/* Detailed metrics table */}
                {cs.detailedMetrics && cs.detailedMetrics.length > 0 && (
                  <div className="mt-10 border border-white/[0.06]">
                    {cs.detailedMetrics.map((m: any, i: number) => (
                      <div key={i} className={`flex items-baseline gap-6 p-5 ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}>
                        {m.category && <span className="text-white/15 text-[0.7rem] font-mono w-24 shrink-0">{m.category}</span>}
                        <span className="text-[#a7d26d] text-[1.3rem] font-light">{m.value}</span>
                        <span className="text-white/50 text-[0.85rem]">{m.label}</span>
                        {m.description && <span className="text-white/20 text-[0.75rem] ml-auto">{m.description}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Before/After */}
                {cs.beforeAfter?.beforeImage && cs.beforeAfter?.afterImage && (
                  <div className="mt-10">
                    <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-4">Avant / Apres</p>
                    <div className="grid md:grid-cols-2 gap-px bg-white/[0.03]">
                      <BeforeAfterPanel
                        label="Avant"
                        image={cs.beforeAfter.beforeImage}
                        caption={cs.beforeAfter.beforeCaption}
                      />
                      <BeforeAfterPanel
                        label="Apres"
                        image={cs.beforeAfter.afterImage}
                        caption={cs.beforeAfter.afterCaption}
                      />
                    </div>
                  </div>
                )}
              </NarrativeSection>
            )}

            {/* ─── TESTIMONIAL ─── */}
            {cs.testimonial?.quote && (
              <div className="max-w-3xl py-12 border-t border-white/[0.06]">
                <blockquote className="text-white/50 text-[1.2rem] font-light leading-relaxed italic mb-6">
                  &ldquo;{cs.testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  {cs.testimonial.photo && typeof cs.testimonial.photo === 'object' && (
                    <Image src={cs.testimonial.photo.url || ''} alt={cs.testimonial.author || ''} width={40} height={40} className="rounded-full" />
                  )}
                  <div>
                    <p className="text-white/60 text-[0.9rem]">{cs.testimonial.author}</p>
                    <p className="text-white/25 text-[0.75rem]">
                      {cs.testimonial.role}
                      {cs.testimonial.company && `, ${cs.testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── GALLERY ─── */}
            {cs.gallery && cs.gallery.length > 0 && (
              <div className="py-12 border-t border-white/[0.06]">
                <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-6">Documentation</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cs.gallery.map((item: any, i: number) => {
                    const img = typeof item.image === 'object' ? item.image : null
                    if (!img) return null
                    return (
                      <figure key={i} className="bg-white/[0.02] border border-white/[0.06]">
                        <div className="relative aspect-[4/3]">
                          <Image src={img.url || ''} alt={item.caption || ''} fill className="object-cover" />
                        </div>
                        {item.caption && (
                          <figcaption className="p-3 text-white/20 text-[0.7rem] font-mono">{item.caption}</figcaption>
                        )}
                      </figure>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ─── PDF DOWNLOAD ─── */}
            {cs.downloadablePdf && (
              <div className="py-8 border-t border-white/[0.06]">
                <Link
                  href={`/api/case-study-pdf/${cs.slug}`}
                  className="inline-flex items-center gap-3 text-[#a7d26d] text-[0.85rem] font-mono hover:text-[#a7d26d]/80 transition-colors"
                >
                  Telecharger en PDF
                </Link>
              </div>
            )}
          </>
        )}

        {/* ─── RELATED ─── */}
        {related.length > 0 && (
          <div className="py-16 border-t border-white/[0.06]">
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#a7d26d] mb-6">
              Etudes de cas associees
            </p>
            <div className="grid md:grid-cols-3 gap-px bg-white/[0.03]">
              {related.map((r: any) => (
                <Link
                  key={r.id}
                  href={`/case-studies/${r.slug}`}
                  className="block bg-[#181a0e] hover:bg-[#1e2112] transition-colors duration-300 p-8 group"
                >
                  <h3 className="text-white/70 text-[1rem] font-light mb-2 group-hover:text-[#a7d26d] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-white/25 text-[0.8rem] line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── CTA ─── */}
        <div className="py-16 border-t border-white/[0.06] text-center">
          <p className="text-white/40 text-[1.1rem] font-light mb-6">
            Vous faites face a un defi similaire ?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#a7d26d] text-[#0C130B] px-8 py-4 text-[0.95rem] font-medium tracking-wide hover:shadow-[0_0_40px_rgba(167,210,109,0.2)] transition-all duration-300"
          >
            Parlons de votre projet
          </Link>
        </div>
      </div>
    </main>
  )
}

// ─── NARRATIVE SECTION COMPONENT ───
function NarrativeSection({
  number,
  heading,
  content,
  image,
  imageCaption,
  children,
}: {
  number: string
  heading: string
  content: any
  image?: any
  imageCaption?: string
  children?: React.ReactNode
}) {
  const img = image && typeof image === 'object' ? image : null

  return (
    <div className="max-w-3xl py-12 border-t border-white/[0.06]">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-[#a7d26d] text-[0.75rem] font-mono">{number}</span>
        <h2 className="text-white/70 text-[1.6rem] font-light tracking-wider">{heading}</h2>
      </div>
      <div className="prose prose-invert prose-sm max-w-none
        prose-p:text-white/40 prose-p:font-light prose-p:leading-relaxed
        prose-headings:text-white/60 prose-headings:font-light prose-headings:tracking-wider
        prose-li:text-white/40 prose-strong:text-white/60
      ">
        <RichText data={content} />
      </div>
      {img && (
        <figure className="mt-8">
          <div className="relative aspect-[16/9] bg-white/[0.02] border border-white/[0.06]">
            <Image src={img.url || ''} alt={imageCaption || ''} fill className="object-contain p-2" />
          </div>
          {imageCaption && <figcaption className="text-white/20 text-[0.7rem] font-mono mt-2">{imageCaption}</figcaption>}
        </figure>
      )}
      {children}
    </div>
  )
}

// ─── BEFORE/AFTER PANEL ───
function BeforeAfterPanel({ label, image, caption }: { label: string; image: any; caption?: string }) {
  const img = typeof image === 'object' ? image : null
  if (!img) return null

  return (
    <div className="bg-[#181a0e] p-4">
      <p className="text-white/25 text-[0.7rem] font-mono mb-3">{label}</p>
      <div className="relative aspect-[16/10]">
        <Image src={img.url || ''} alt={caption || label} fill className="object-contain" />
      </div>
      {caption && <p className="text-white/15 text-[0.65rem] font-mono mt-2">{caption}</p>}
    </div>
  )
}
