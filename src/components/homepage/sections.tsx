'use client'

import { HeroStatement } from './hero-statement'
import { ImpactStats } from './impact-stats'
import { StrategicQuadrant } from './strategic-quadrant'
import { CaseStudies } from './case-studies'
import { ProcessArchitecture } from './process-architecture'
import { IndustryRadar } from './industry-radar'
import { CapabilitiesMatrix } from './capabilities-matrix'
import { ThinkingSection } from './thinking-section'
import { ClientTrust } from './client-trust'
import { CTASection } from './cta-section'

interface HomepageSectionsProps {
  homepage: any
  capabilities: any[]
  caseStudies: any[]
  clients: any[]
  featuredInsights: any[]
}

export function HomepageSections({
  homepage,
  capabilities,
  caseStudies,
  clients,
  featuredInsights,
}: HomepageSectionsProps) {
  const heroHeading = homepage?.heroHeading || 'Nous accompagnons les audacieux qui transforment le monde'
  const heroSubheading = homepage?.heroSubheading || 'Transformation Digitale & Conseil Strategique'
  const stats = homepage?.stats || []
  const ctaHeading = homepage?.ctaHeading || 'Les grandes transformations commencent par une conversation.'
  const ctaButtonText = homepage?.ctaButtonText || 'Parlons de votre projet'
  const ctaButtonLink = homepage?.ctaButtonLink || '/contact'

  const transformedCaseStudies = caseStudies
    .filter((cs: any) => cs.coverImage)
    .map((cs: any) => ({
      id: cs.id,
      title: cs.title,
      slug: cs.slug,
      client: cs.clientDisplay === 'named' ? cs.clientName : cs.clientAnonymous,
      excerpt: cs.excerpt,
      coverImage: {
        url: typeof cs.coverImage === 'object' ? cs.coverImage.url : cs.coverImage,
        alt: typeof cs.coverImage === 'object' ? cs.coverImage.alt : cs.title,
      },
      stats: cs.headlineMetrics,
    }))

  const transformedInsights = featuredInsights
    .filter((i: any) => i.coverImage)
    .map((i: any) => ({
      id: i.id,
      title: i.title,
      slug: i.slug,
      type: i.type,
      excerpt: i.excerpt,
      publishedDate: i.publishedDate,
      readTime: i.readTime,
      coverImage: {
        url: typeof i.coverImage === 'object' ? i.coverImage.url : i.coverImage,
        alt: typeof i.coverImage === 'object' ? i.coverImage.alt : i.title,
      },
    }))

  const transformedClients = clients
    .filter((c: any) => c.logo)
    .map((c: any) => ({
      id: c.id,
      name: c.name,
      logo: {
        url: typeof c.logo === 'object' ? c.logo.url : c.logo,
        alt: c.name,
      },
    }))

  const transformedCapabilities = capabilities.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
  }))

  return (
    <>
      <HeroStatement heading={heroHeading} subheading={heroSubheading} />
      <ImpactStats stats={stats} />
      <StrategicQuadrant />
      {transformedCaseStudies.length > 0 && <CaseStudies projects={transformedCaseStudies} />}
      <ProcessArchitecture />
      <IndustryRadar />
      {transformedCapabilities.length > 0 && <CapabilitiesMatrix capabilities={transformedCapabilities} />}
      {transformedInsights.length > 0 && <ThinkingSection insights={transformedInsights} />}
      <ClientTrust clients={transformedClients} />
      <CTASection heading={ctaHeading} buttonText={ctaButtonText} buttonLink={ctaButtonLink} />
    </>
  )
}
