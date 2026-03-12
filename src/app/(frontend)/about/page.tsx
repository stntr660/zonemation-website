import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function getPayloadClient() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  return getPayload({ config })
}

export const metadata = {
  title: 'About - Zonemation',
  description: 'Learn about Zonemation, our mission, leadership, and commitment to transformation.',
}

export default async function AboutPage() {
  const payload = await getPayloadClient()

  const { docs: team } = await payload.find({
    collection: 'team',
    sort: 'order',
    limit: 50,
  })

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <p className="caption text-gray-600 dark:text-gray-400 mb-4">ABOUT US</p>
          <h1 className="heading-h1 text-gray-900 dark:text-white mb-6">
            Unlocking the Potential of Those Who Advance the World
          </h1>
          <p className="body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We are a consulting firm dedicated to helping organizations navigate complex
            challenges and seize transformative opportunities.
          </p>
        </div>

        {/* Team */}
        {team.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="heading-h2 text-gray-900 dark:text-white mb-4">Our Leadership</h2>
              <p className="body-large text-gray-600 dark:text-gray-400">
                Meet the team driving transformation.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="card p-6 text-center">
                  {member.photo && typeof member.photo === 'object' && (
                    <Image
                      src={member.photo.url || ''}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto mb-4 object-cover w-[120px] h-[120px]"
                    />
                  )}
                  <h3 className="heading-h4 text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="body-small text-primary-400 mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="body-small text-gray-600 dark:text-gray-400 text-clamp-3">
                      {member.bio}
                    </p>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-primary-400 hover:text-primary-500 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
