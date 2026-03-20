import { Link } from '@/i18n/routing'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function getPayloadClient() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  return getPayload({ config })
}

export const metadata = {
  title: 'Insights - Zonemation',
  description: 'Latest articles, reports, case studies, and thought leadership from Zonemation.',
}

export default async function InsightsPage() {
  const payload = await getPayloadClient()

  const { docs: insights } = await payload.find({
    collection: 'insights',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit: 24,
  })

  const featured = insights.filter((i) => i.featured)
  const rest = insights.filter((i) => !i.featured)

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="caption text-gray-600 dark:text-gray-400 mb-4">THOUGHT LEADERSHIP</p>
          <h1 className="heading-h1 text-gray-900 dark:text-white mb-6">Insights</h1>
          <p className="body-large text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert perspectives on the challenges and opportunities shaping business today.
          </p>
        </div>

        {/* Featured insights */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featured.map((insight) => (
              <Link
                key={insight.id}
                href={`/insights/${insight.slug}`}
                className="group card p-0 overflow-hidden"
              >
                {insight.coverImage && typeof insight.coverImage === 'object' && (
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={insight.coverImage.url || ''}
                      alt={insight.coverImage.alt || insight.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="caption text-white/80 mb-2 inline-block">
                        {insight.type?.toUpperCase()}
                      </span>
                      <h2 className="heading-h3 text-white">
                        {insight.title}
                      </h2>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <p className="body-base text-gray-600 dark:text-gray-400 text-clamp-2">
                    {insight.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* All insights grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((insight) => (
            <Link
              key={insight.id}
              href={`/insights/${insight.slug}`}
              className="group card p-0"
            >
              {insight.coverImage && typeof insight.coverImage === 'object' && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={insight.coverImage.url || ''}
                    alt={insight.coverImage.alt || insight.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="caption text-primary-400">{insight.type?.toUpperCase()}</span>
                  {insight.readTime && (
                    <span className="caption text-gray-400">{insight.readTime} MIN READ</span>
                  )}
                </div>
                <h3 className="heading-h4 text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors mb-2">
                  {insight.title}
                </h3>
                <p className="body-small text-gray-600 dark:text-gray-400 text-clamp-2">
                  {insight.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
