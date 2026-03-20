import { notFound } from 'next/navigation'
import Image from 'next/image'
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
      collection: 'capabilities',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const capability = docs[0]
    if (!capability) return {}
    return {
      title: `${capability.name} - Zonemation`,
      description: capability.description,
    }
  } catch {
    return {}
  }
}

export default async function CapabilityPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'capabilities',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const capability = docs[0]
  if (!capability) notFound()

  const { docs: relatedCaseStudies } = await payload.find({
    collection: 'case-studies',
    where: {
      capabilities: { contains: capability.id },
      status: { equals: 'published' },
    },
    limit: 6,
  })

  return (
    <main className="pt-24 pb-20">
      <div className="relative h-[400px] mb-16">
        {capability.coverImage && typeof capability.coverImage === 'object' && (
          <Image
            src={capability.coverImage.url || ''}
            alt={capability.coverImage.alt || capability.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-12 w-full">
            <p className="caption text-white/70 mb-4">CAPABILITY</p>
            <h1 className="heading-display text-white">{capability.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {capability.description && (
          <p className="body-large text-gray-600 dark:text-gray-400 max-w-3xl mb-12">
            {capability.description}
          </p>
        )}

        {capability.content && (
          <div className="prose dark:prose-invert max-w-3xl mb-16">
            <RichText data={capability.content} />
          </div>
        )}

        {relatedCaseStudies.length > 0 && (
          <section>
            <h2 className="heading-h2 text-gray-900 dark:text-white mb-8">Related Case Studies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCaseStudies.map((cs) => (
                <a
                  key={cs.id}
                  href={`/case-studies/${cs.slug}`}
                  className="card p-6 group"
                >
                  <h3 className="heading-h4 text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors mb-2">
                    {cs.title}
                  </h3>
                  <p className="body-small text-gray-600 dark:text-gray-400 text-clamp-2">
                    {cs.excerpt}
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
