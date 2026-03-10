import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
      limit: 100,
    })
    return docs.map((doc) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const project = docs[0]
  if (!project) return {}
  return {
    title: `${project.title} - Zonemation`,
    description: project.excerpt,
  }
}

export default async function ProjectPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <div className="relative h-[500px] mb-12">
        {project.coverImage && typeof project.coverImage === 'object' && (
          <Image
            src={project.coverImage.url || ''}
            alt={project.coverImage.alt || project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-12 w-full">
            {project.client && (
              <p className="caption text-white/70 mb-4">{project.client}</p>
            )}
            <h1 className="heading-display text-white max-w-3xl">{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl">
            {project.stats.map((stat: { value: string; label: string }, i: number) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-primary-400 mb-2">{stat.value}</p>
                <p className="caption text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl">
          <p className="body-large text-gray-700 dark:text-gray-300 mb-8 font-medium">
            {project.excerpt}
          </p>

          {project.content && (
            <div className="prose dark:prose-invert prose-lg max-w-none mb-16">
              <RichText data={project.content} />
            </div>
          )}
        </div>

        {/* Testimonial */}
        {project.testimonial?.quote && (
          <div className="max-w-3xl bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-16">
            <blockquote className="text-xl text-gray-700 dark:text-gray-300 italic mb-4">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {project.testimonial.author}
              </p>
              {project.testimonial.role && (
                <p className="body-small text-gray-500">{project.testimonial.role}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
