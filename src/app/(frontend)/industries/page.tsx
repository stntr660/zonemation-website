import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Industries - Zonemation',
  description: 'Explore the industries we serve with deep expertise and transformative solutions.',
}

export default async function IndustriesPage() {
  const payload = await getPayload({ config })

  const { docs: industries } = await payload.find({
    collection: 'industries',
    sort: 'order',
    limit: 50,
  })

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="caption text-gray-600 dark:text-gray-400 mb-4">OUR EXPERTISE</p>
          <h1 className="heading-h1 text-gray-900 dark:text-white mb-6">Industries</h1>
          <p className="body-large text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Deep expertise across the industries that shape the future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className="group card p-0"
            >
              {industry.coverImage && typeof industry.coverImage === 'object' && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={industry.coverImage.url || ''}
                    alt={industry.coverImage.alt || industry.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="heading-h3 text-gray-900 dark:text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {industry.name}
                </h2>
                {industry.description && (
                  <p className="body-base text-gray-600 dark:text-gray-400 text-clamp-3">
                    {industry.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
