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
      collection: 'insights',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const insight = docs[0]
    if (!insight) return {}
    return {
      title: `${insight.title} - Zonemation`,
      description: insight.seo?.metaDescription || insight.excerpt,
    }
  } catch {
    return {}
  }
}

export default async function InsightPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'insights',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const insight = docs[0]
  if (!insight) notFound()

  const { docs: related } = await payload.find({
    collection: 'insights',
    where: {
      id: { not_equals: insight.id },
      status: { equals: 'published' },
      type: { equals: insight.type },
    },
    limit: 3,
    sort: '-publishedDate',
  })

  const author = insight.author && typeof insight.author === 'object' ? insight.author : null
  const publishedDate = insight.publishedDate
    ? new Date(insight.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <main className="pt-24 pb-20">
      <div className="relative h-[500px] mb-12">
        {insight.coverImage && typeof insight.coverImage === 'object' && (
          <Image
            src={insight.coverImage.url || ''}
            alt={insight.coverImage.alt || insight.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-12 w-full">
            <span className="caption text-white/80 mb-4 inline-block">
              {insight.type?.toUpperCase()} {publishedDate && `\u2022 ${publishedDate}`}
            </span>
            <h1 className="heading-display text-white max-w-3xl">{insight.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {author && (
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              {author.photo && typeof author.photo === 'object' && (
                <Image
                  src={author.photo.url || ''}
                  alt={author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{author.name}</p>
                <p className="body-small text-gray-500">{author.role}</p>
              </div>
              {insight.readTime && (
                <span className="ml-auto caption text-gray-400">
                  {insight.readTime} MIN READ
                </span>
              )}
            </div>
          )}

          <p className="body-large text-gray-700 dark:text-gray-300 mb-8 font-medium">
            {insight.excerpt}
          </p>

          {insight.content && (
            <div className="prose dark:prose-invert prose-lg max-w-none mb-16">
              <RichText data={insight.content} />
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section className="border-t border-gray-200 dark:border-gray-800 pt-16">
            <h2 className="heading-h2 text-gray-900 dark:text-white mb-8">Related Insights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/insights/${item.slug}`}
                  className="card p-6 group"
                >
                  <p className="caption text-primary-400 mb-2">{item.type?.toUpperCase()}</p>
                  <h3 className="heading-h4 text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="body-small text-gray-600 dark:text-gray-400 text-clamp-2">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
