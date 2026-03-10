import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Projects - Zonemation',
  description: 'Explore our portfolio of transformative projects and client success stories.',
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    limit: 24,
  })

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="caption text-gray-600 dark:text-gray-400 mb-4">OUR WORK</p>
          <h1 className="heading-h1 text-gray-900 dark:text-white mb-6">Projects</h1>
          <p className="body-large text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-world impact through strategic transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group card p-0 overflow-hidden"
            >
              {project.coverImage && typeof project.coverImage === 'object' && (
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.coverImage.url || ''}
                    alt={project.coverImage.alt || project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                {project.client && (
                  <p className="caption text-primary-400 mb-2">{project.client}</p>
                )}
                <h2 className="heading-h3 text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors mb-2">
                  {project.title}
                </h2>
                <p className="body-base text-gray-600 dark:text-gray-400 text-clamp-2">
                  {project.excerpt}
                </p>
                {project.stats && project.stats.length > 0 && (
                  <div className="flex gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {project.stats.slice(0, 3).map((stat: { value: string; label: string }, i: number) => (
                      <div key={i}>
                        <p className="text-xl font-bold text-primary-400">{stat.value}</p>
                        <p className="caption text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
