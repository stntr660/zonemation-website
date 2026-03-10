import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Capabilities - Zonemation',
  description: 'Our capabilities span strategy, digital transformation, operations, and beyond.',
}

export default async function CapabilitiesPage() {
  const payload = await getPayload({ config })

  const { docs: capabilities } = await payload.find({
    collection: 'capabilities',
    sort: 'order',
    limit: 50,
  })

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="caption text-gray-600 dark:text-gray-400 mb-4">WHAT WE DO</p>
          <h1 className="heading-h1 text-gray-900 dark:text-white mb-6">Capabilities</h1>
          <p className="body-large text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive capabilities to drive lasting transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability) => (
            <Link
              key={capability.id}
              href={`/capabilities/${capability.slug}`}
              className="group card p-0"
            >
              {capability.coverImage && typeof capability.coverImage === 'object' && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={capability.coverImage.url || ''}
                    alt={capability.coverImage.alt || capability.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="heading-h3 text-gray-900 dark:text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {capability.name}
                </h2>
                {capability.description && (
                  <p className="body-base text-gray-600 dark:text-gray-400 text-clamp-3">
                    {capability.description}
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
