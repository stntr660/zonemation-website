import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args) {
  try {
    const { slug } = await params
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'industries',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const industry = docs[0]
    if (!industry) return {}
    return {
      title: `${industry.name} - Zonemation`,
      description: industry.description,
    }
  } catch {
    return {}
  }
}

export default async function IndustryPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const industry = docs[0]
  if (!industry) notFound()

  const { docs: relatedInsights } = await payload.find({
    collection: 'insights',
    where: {
      industries: { contains: industry.id },
      status: { equals: 'published' },
    },
    limit: 6,
  })

  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <div className="relative h-[400px] mb-16">
        {industry.coverImage && typeof industry.coverImage === 'object' && (
          <Image
            src={industry.coverImage.url || ''}
            alt={industry.coverImage.alt || industry.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-12 w-full">
            <p className="caption text-white/70 mb-4">INDUSTRY</p>
            <h1 className="heading-display text-white">{industry.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {industry.description && (
          <p className="body-large text-gray-600 dark:text-gray-400 max-w-3xl mb-12">
            {industry.description}
          </p>
        )}

        {industry.content && (
          <div className="prose dark:prose-invert max-w-3xl mb-16">
            <RichText data={industry.content} />
          </div>
        )}

        {relatedInsights.length > 0 && (
          <section>
            <h2 className="heading-h2 text-gray-900 dark:text-white mb-8">Related Insights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedInsights.map((insight) => (
                <a
                  key={insight.id}
                  href={`/insights/${insight.slug}`}
                  className="card p-6 group"
                >
                  <p className="caption text-primary-400 mb-2">{insight.type}</p>
                  <h3 className="heading-h4 text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors mb-2">
                    {insight.title}
                  </h3>
                  <p className="body-small text-gray-600 dark:text-gray-400 text-clamp-2">
                    {insight.excerpt}
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
