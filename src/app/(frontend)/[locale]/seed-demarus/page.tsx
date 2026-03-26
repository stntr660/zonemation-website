import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function getPayloadClient() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  return getPayload({ config })
}

async function createIfMissing(
  payload: any,
  collection: string,
  where: Record<string, any>,
  data: Record<string, any>,
) {
  const { docs } = await payload.find({ collection, where, limit: 1 })
  if (docs.length > 0) {
    console.log(`  Exists: ${collection} "${data.name || data.title || data.slug}"`)
    return docs[0]
  }
  const doc = await payload.create({ collection, data })
  console.log(`  Created: ${collection} "${data.name || data.title || data.slug}" (${doc.id})`)
  return doc
}

export default async function SeedDemarusPage() {
  const payload = await getPayloadClient()

  // Industries
  const industries = [
    { name: 'E-commerce', slug: 'e-commerce', order: 1 },
    { name: 'Finance', slug: 'finance', order: 2 },
    { name: 'Industrie', slug: 'industrie', order: 3 },
    { name: 'Sante', slug: 'sante', order: 4 },
    { name: 'Telecom', slug: 'telecom', order: 5 },
    { name: 'Secteur Public', slug: 'secteur-public', order: 6 },
    { name: 'Retail', slug: 'retail', order: 7 },
    { name: 'Automobile', slug: 'automobile', order: 8 },
  ]

  const indMap: Record<string, number> = {}
  for (const ind of industries) {
    const doc = await createIfMissing(payload, 'industries', { slug: { equals: ind.slug } }, ind)
    indMap[ind.slug] = doc.id
  }

  // Capabilities
  const capabilities = [
    { name: 'AI & Machine Learning', slug: 'ai-machine-learning', order: 1 },
    { name: 'Digital Transformation', slug: 'digital-transformation', order: 2 },
    { name: 'Cloud & Infrastructure', slug: 'cloud-infrastructure', order: 3 },
    { name: 'Data & Analytics', slug: 'data-analytics', order: 4 },
    { name: 'UX & Product Design', slug: 'ux-product-design', order: 5 },
    { name: 'E-commerce Solutions', slug: 'e-commerce-solutions', order: 6 },
    { name: 'Process Automation', slug: 'process-automation', order: 7 },
    { name: 'SEO & Content Strategy', slug: 'seo-content-strategy', order: 8 },
    { name: 'Cybersecurite', slug: 'cybersecurite', order: 9 },
  ]

  const capMap: Record<string, number> = {}
  for (const cap of capabilities) {
    const doc = await createIfMissing(payload, 'capabilities', { slug: { equals: cap.slug } }, cap)
    capMap[cap.slug] = doc.id
  }

  // Client
  await createIfMissing(payload, 'clients', { name: { equals: 'Demarus' } }, {
    name: 'Demarus',
    email: 'contact@demarus.ma',
    address: 'Casablanca',
    city: 'Casablanca',
    order: 1,
  })

  // Team member: Aymane
  const aymane = await createIfMissing(payload, 'team', { slug: { equals: 'aymane-ait-malek' } }, {
    name: 'Aymane Ait Malek',
    slug: 'aymane-ait-malek',
    role: 'Founder & Lead Consultant',
    bio: 'Digital transformation strategist specializing in AI-powered solutions for Moroccan and North African businesses.',
    order: 1,
  })

  // Case Study
  const existing = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: 'demarus-ai-product-pipeline' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return (
      <div style={{ padding: 40, color: 'white', background: '#181a0e', minHeight: '100vh' }}>
        <h1>Already seeded</h1>
        <p>Case study exists: {existing.docs[0].title}</p>
        <a href="/admin/collections/case-studies" style={{ color: '#a7d26d' }}>Go to admin</a>
      </div>
    )
  }

  await payload.create({
    collection: 'case-studies',
    data: {
      title: 'AI-Powered Product Creation Pipeline for E-commerce',
      slug: 'demarus-ai-product-pipeline',
      excerpt: 'How we built an AI vision system that transforms a single product image into a fully enriched, SEO-optimized listing in under 30 seconds -- replacing a manual process that took 5+ minutes per product. 80% reduction in data entry, $0.002 per product, 50 items bulk-processed in 3 minutes.',
      clientDisplay: 'named',
      clientName: 'Demarus',
      clientIndustryContext: 'Demarus is a Moroccan motorcycle decoration kit (vinyl wrap) e-commerce platform operating on Medusa.js v2. Growing catalog of 500+ unique kit designs targeting the Moroccan and North African motorcycle aftermarket.',

      headlineMetrics: [
        { value: '-80%', label: 'Manual data entry', context: 'From 5+ min to <30s per product' },
        { value: '$0.002', label: 'Cost per product', context: 'Gemini API processing cost' },
        { value: '3 min', label: '50 products bulk', context: 'vs 4+ hours manual process' },
        { value: '-60%', label: 'Image storage', context: 'WebP optimization pipeline' },
      ],

      situationHeading: 'Situation',
      situation: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'Demarus operates in the fast-growing Moroccan motorcycle aftermarket, selling custom vinyl decoration kits. Their catalog was expanding rapidly -- dozens of new kit designs arriving weekly from designers -- but every single product required manual data entry: identifying the motorcycle model, writing French SEO descriptions, tagging colors, categorizing by segment, and optimizing images.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Each product listing took 5-7 minutes of skilled operator time. With a target of 50+ new products per week, the content bottleneck was becoming the primary growth constraint. The team was spending more time on data entry than on marketing, customer acquisition, or design.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Beyond speed, consistency was a problem. Different operators described the same motorcycle differently, used inconsistent color names, and produced varying quality SEO copy. The catalog lacked the unified taxonomy needed for meaningful filtering and search.', version: 1 }], version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },

      challengeHeading: 'Challenge',
      challenge: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'The core challenge was threefold:', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'First, visual intelligence -- a kit design image contains layered information: the motorcycle brand (molded into the bodywork), the decorative sticker brands (Nike, Monster Energy), the color palette, and design characteristics. No off-the-shelf solution could extract all of this.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Second, catalog intelligence -- the platform needed a self-growing vehicle taxonomy. When the AI identifies a motorcycle not yet in the database, it should auto-create the brand, model, and generation hierarchy rather than flagging it for manual entry.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Third, content quality at scale -- AI-generated French descriptions needed to follow a strict 6-part SEO framework while weaving in design inspiration references naturally. Generic AI copy would not suffice.', version: 1 }], version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },

      approachHeading: 'Approach',
      approach: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'We designed a 7-stage AI forensic pipeline powered by Google Gemini 2.5 Pro Vision that extracts structured data from a single product image:', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: '1. Logo Detection -- Distinguishes motorcycle manufacturer logos (molded metal/plastic) from decorative sticker brands (vinyl graphics). This innovation enables design inspiration tracking.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: '2. Vehicle Identification -- Extracts brand, model series, exact motorcycle name, and manufacturing year range with confidence scoring.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: '3. Color Palette Extraction -- Identifies dominant colors with French names, hex codes, and dominance percentages. Maps to a unified 14-color taxonomy for storefront filtering.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: '4. Design DNA Analysis -- Quantifies aggressiveness (0-100), density, contrast, and classifies the vibe (Racing, Street, Tribal) and style (Geometric, Organic, Typography).', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: '5. Design Inspiration Detection -- Identifies which consumer brands inspired the kit design (e.g., Nike Air Max Plus TN Hyper Blue), including specific visual elements borrowed.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: '6. SEO Copy Generation -- A second Gemini call generates title, 150-250 word French description following the 6-part SEO framework, long-tail tags, and URL handle.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: '7. Bulk Processing Pipeline -- Upload up to 200 images, AI analyzes with rate limiting, admin reviews, then batch image optimization and product creation. Pre-fetches full catalog context to reduce 150 DB queries to just 3.', version: 1 }], version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },

      resultsHeading: 'Results',
      results: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'The AI pipeline transformed Demarus from a content-bottlenecked operation into a scalable product machine. 50 new products in 3 minutes of AI time plus brief human review, compared to 4+ hours of manual work previously.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The self-growing bike catalog eliminated manual taxonomy maintenance -- new motorcycle models are automatically added as products are processed. The unified 14-color taxonomy enabled meaningful filtering across 500+ products for the first time.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The design inspiration detection feature opened new marketing angles: collection clustering ("Nike-inspired kits"), targeted recommendations, and trend analytics tracking which brand aesthetics sell best.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'At $0.002 per product via Gemini API, the cost is 1000x cheaper than manual listing creation, making it economically viable to maintain rich, SEO-optimized descriptions across the entire catalog.', version: 1 }], version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },

      detailedMetrics: [
        { category: 'Efficiency', value: '-80%', label: 'Manual data entry reduction', description: 'From 5+ minutes to <30 seconds per product with full metadata extraction' },
        { category: 'Efficiency', value: '-70%', label: 'Copywriting review time', description: 'AI-enforced 6-part SEO framework produces consistent French copy' },
        { category: 'Cost', value: '$0.002', label: 'Per product processing cost', description: 'Gemini 2.5 Pro Vision + Text API combined cost' },
        { category: 'Scale', value: '50 in 3min', label: 'Bulk processing capacity', description: 'vs 4+ hours manual process' },
        { category: 'Storage', value: '-60%', label: 'Image size reduction', description: 'Sharp.js: WebP, 2000px max, quality 82, EXIF stripping' },
        { category: 'Data', value: '7 stages', label: 'AI extraction pipeline', description: 'Logo, vehicle ID, colors, design DNA, inspiration, SEO, bulk' },
      ],

      testimonial: {
        quote: 'Avant Zonemation, ajouter 50 produits prenait une journee entiere. Maintenant c\'est fait en 10 minutes. Le systeme detecte meme les inspirations de design -- nos clients adorent quand on leur dit "ce kit est inspire du style Nike TN". Ca change completement notre storytelling.',
        author: 'Fondateur',
        role: 'CEO & Fondateur',
        company: 'Demarus',
      },

      industries: [indMap['e-commerce']].filter(Boolean),
      capabilities: [
        capMap['ai-machine-learning'],
        capMap['e-commerce-solutions'],
        capMap['seo-content-strategy'],
        capMap['digital-transformation'],
      ].filter(Boolean),

      author: aymane.id,
      status: 'published',
      featured: true,
      publishedDate: '2026-03-25',
      readTime: 8,
      accessLevel: 'full',
      downloadablePdf: false,

      seo: {
        metaTitle: 'Demarus: AI-Powered E-commerce Product Pipeline | Zonemation',
        metaDescription: 'How Zonemation built an AI vision pipeline that creates fully enriched product listings from a single image in 30 seconds. 80% less manual work, $0.002 per product.',
      },
    },
  })

  redirect('/admin/collections/case-studies')
}
