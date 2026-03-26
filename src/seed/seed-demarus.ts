// Run via: npx tsx src/seed/seed-demarus.ts
// Requires: DATABASE_URL in .env.local, server running on :3000

const API = 'http://localhost:3000/api'

async function login() {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'aymanemlk99@gmail.com', password: 'Admin123!@#' }),
  })
  const data = await res.json()
  if (!data.token) throw new Error('Login failed - check credentials')
  return data.token
}

async function create(token: string, collection: string, payload: Record<string, unknown>) {
  const res = await fetch(`${API}/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (data.errors) {
    console.error(`Failed to create ${collection}:`, data.errors)
    // Try to find existing
    const search = await fetch(`${API}/${collection}?limit=100`, {
      headers: { Authorization: `JWT ${token}` },
    })
    const existing = await search.json()
    const match = existing.docs?.find((d: any) =>
      d.name === payload.name || d.slug === payload.slug || d.title === payload.title
    )
    if (match) {
      console.log(`  Found existing ${collection}: ${match.id}`)
      return match
    }
    return null
  }
  console.log(`Created ${collection}: ${data.doc?.id || data.id}`)
  return data.doc || data
}

async function main() {
  console.log('Logging in...')
  const token = await login()
  console.log('Authenticated.\n')

  // ── Industries ──
  console.log('Creating industries...')
  const industries = [
    { name: 'E-commerce', slug: 'e-commerce', icon: 'ShoppingCart', order: 1 },
    { name: 'Finance', slug: 'finance', icon: 'DollarSign', order: 2 },
    { name: 'Industrie', slug: 'industrie', icon: 'Factory', order: 3 },
    { name: 'Sante', slug: 'sante', icon: 'Heart', order: 4 },
    { name: 'Telecom', slug: 'telecom', icon: 'Radio', order: 5 },
    { name: 'Secteur Public', slug: 'secteur-public', icon: 'Building', order: 6 },
    { name: 'Retail', slug: 'retail', icon: 'Store', order: 7 },
    { name: 'Automobile', slug: 'automobile', icon: 'Car', order: 8 },
  ]

  const industryMap: Record<string, number> = {}
  for (const ind of industries) {
    const doc = await create(token, 'industries', ind)
    if (doc) industryMap[ind.slug] = doc.id
  }

  // ── Capabilities ──
  console.log('\nCreating capabilities...')
  const capabilities = [
    { name: 'AI & Machine Learning', slug: 'ai-machine-learning', icon: 'Brain', order: 1 },
    { name: 'Digital Transformation', slug: 'digital-transformation', icon: 'Zap', order: 2 },
    { name: 'Cloud & Infrastructure', slug: 'cloud-infrastructure', icon: 'Cloud', order: 3 },
    { name: 'Data & Analytics', slug: 'data-analytics', icon: 'BarChart', order: 4 },
    { name: 'UX & Product Design', slug: 'ux-product-design', icon: 'Palette', order: 5 },
    { name: 'E-commerce Solutions', slug: 'e-commerce-solutions', icon: 'ShoppingBag', order: 6 },
    { name: 'Process Automation', slug: 'process-automation', icon: 'Cog', order: 7 },
    { name: 'SEO & Content Strategy', slug: 'seo-content-strategy', icon: 'Search', order: 8 },
    { name: 'Cybersecurite', slug: 'cybersecurite', icon: 'Shield', order: 9 },
  ]

  const capMap: Record<string, number> = {}
  for (const cap of capabilities) {
    const doc = await create(token, 'capabilities', cap)
    if (doc) capMap[cap.slug] = doc.id
  }

  // ── Client: Demarus ──
  console.log('\nCreating Demarus client...')
  const demarusClient = await create(token, 'clients', {
    name: 'Demarus',
    email: 'contact@demarus.ma',
    address: 'Casablanca',
    city: 'Casablanca',
    ice: '',
    order: 1,
  })

  // ── Case Study ──
  console.log('\nCreating Demarus case study...')
  const caseStudy = await create(token, 'case-studies', {
    title: 'AI-Powered Product Creation Pipeline for E-commerce',
    slug: 'demarus-ai-product-pipeline',
    excerpt: 'How we built an AI vision system that transforms a single product image into a fully enriched, SEO-optimized listing in under 30 seconds -- replacing a manual process that took 5+ minutes per product. 80% reduction in data entry, $0.002 per product, 50 items bulk-processed in 3 minutes.',
    clientDisplay: 'named',
    clientName: 'Demarus',
    clientIndustryContext: 'Demarus is a Moroccan motorcycle decoration kit (vinyl wrap) e-commerce platform operating on Medusa.js v2. Growing catalog of 500+ unique kit designs targeting the Moroccan and North African motorcycle aftermarket.',

    // Metrics
    headlineMetrics: [
      { value: '-80%', label: 'Manual data entry', context: 'From 5+ min to <30s per product' },
      { value: '$0.002', label: 'Cost per product', context: 'Gemini API processing cost' },
      { value: '3 min', label: '50 products bulk', context: 'vs 4+ hours manual process' },
      { value: '-60%', label: 'Image storage', context: 'WebP optimization pipeline' },
    ],

    // Situation
    situationHeading: 'Situation',
    situation: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Demarus operates in the fast-growing Moroccan motorcycle aftermarket, selling custom vinyl decoration kits. Their catalog was expanding rapidly -- dozens of new kit designs arriving weekly from designers -- but every single product required manual data entry: identifying the motorcycle model, writing French SEO descriptions, tagging colors, categorizing by segment, and optimizing images.' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Each product listing took 5-7 minutes of skilled operator time. With a target of 50+ new products per week, the content bottleneck was becoming the primary growth constraint. The team was spending more time on data entry than on marketing, customer acquisition, or design.' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Beyond speed, consistency was a problem. Different operators described the same motorcycle differently, used inconsistent color names, and produced varying quality SEO copy. The catalog lacked the unified taxonomy needed for meaningful filtering and search.' }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },

    // Challenge
    challengeHeading: 'Challenge',
    challenge: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The core challenge was threefold:' }],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'First, ', format: 0 },
              { type: 'text', text: 'visual intelligence', format: 1 },
              { type: 'text', text: ' -- a kit design image contains layered information: the motorcycle brand (molded into the bodywork), the decorative sticker brands (Nike, Monster Energy), the color palette, and design characteristics (aggressive vs. subtle). No off-the-shelf solution could extract all of this.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Second, ', format: 0 },
              { type: 'text', text: 'catalog intelligence', format: 1 },
              { type: 'text', text: ' -- the platform needed a self-growing vehicle taxonomy. When the AI identifies a motorcycle not yet in the database, it should auto-create the brand, model, and generation hierarchy rather than flagging it for manual entry.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Third, ', format: 0 },
              { type: 'text', text: 'content quality at scale', format: 1 },
              { type: 'text', text: ' -- AI-generated French descriptions needed to follow a strict 6-part SEO framework (hook, identity, features, differentiator, CTA, keyword tail) while weaving in design inspiration references naturally. Generic AI copy would not suffice.' },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },

    // Approach
    approachHeading: 'Approach',
    approach: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'We designed a 7-stage AI forensic pipeline powered by Google Gemini 2.5 Pro Vision that extracts structured data from a single product image:' }],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '1. Logo Detection', format: 1 },
              { type: 'text', text: ' -- Distinguishes motorcycle manufacturer logos (molded metal/plastic) from decorative sticker brands (vinyl graphics). This innovation enables design inspiration tracking.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '2. Vehicle Identification', format: 1 },
              { type: 'text', text: ' -- Extracts brand, model series, exact motorcycle name, and manufacturing year range with confidence scoring.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '3. Color Palette Extraction', format: 1 },
              { type: 'text', text: ' -- Identifies dominant colors with French names, hex codes, and dominance percentages. Maps to a unified 14-color taxonomy for storefront filtering.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '4. Design DNA Analysis', format: 1 },
              { type: 'text', text: ' -- Quantifies aggressiveness (0-100), density, contrast, and classifies the vibe (Racing, Street, Tribal) and style (Geometric, Organic, Typography).' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '5. Design Inspiration Detection', format: 1 },
              { type: 'text', text: ' -- Identifies which consumer brands inspired the kit design (e.g., Nike Air Max Plus TN Hyper Blue), including specific visual elements borrowed.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '6. SEO Copy Generation', format: 1 },
              { type: 'text', text: ' -- A second Gemini call generates title (max 70 chars), 150-250 word French description following the 6-part SEO framework, 12-15 long-tail tags, and URL handle.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '7. Bulk Processing Pipeline', format: 1 },
              { type: 'text', text: ' -- Upload up to 200 images, analyze with 4-second rate limiting, admin review dashboard for approve/reject/edit, then batch image optimization (Sharp.js: WebP, 2000px max, quality 82) and product creation.' },
            ],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The system pre-fetches the entire bike catalog, vehicle taxonomy, and recent product titles before bulk analysis -- reducing 150 potential DB queries to just 3.' }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },

    // Results
    resultsHeading: 'Results',
    results: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The AI pipeline transformed Demarus from a content-bottlenecked operation into a scalable product machine. The platform now processes 50 new products in 3 minutes of AI time plus brief human review, compared to 4+ hours of manual work previously.' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The self-growing bike catalog eliminated the need for manual taxonomy maintenance -- new motorcycle models are automatically added as products are processed. The unified 14-color taxonomy enabled meaningful filtering across 500+ products for the first time.' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The design inspiration detection feature -- identifying that a kit\'s visual language is inspired by Nike Air Max Plus TN or Monster Energy aesthetics -- opened new marketing angles: collection clustering ("Nike-inspired kits"), targeted recommendations (Nike fans see Nike-inspired kits), and trend analytics (which brand aesthetics sell best).' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'At $0.002 per product via Gemini API, the cost is 1000x cheaper than manual listing creation, making it economically viable to maintain rich, SEO-optimized descriptions across the entire catalog.' }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },

    detailedMetrics: [
      { category: 'Efficiency', value: '-80%', label: 'Manual data entry reduction', description: 'From 5+ minutes to <30 seconds per product with full metadata extraction' },
      { category: 'Efficiency', value: '-70%', label: 'Copywriting review time', description: 'AI-enforced 6-part SEO framework produces consistent, publish-ready French copy' },
      { category: 'Cost', value: '$0.002', label: 'Per product processing cost', description: 'Gemini 2.5 Pro Vision + Text API combined cost per product listing' },
      { category: 'Scale', value: '50 in 3min', label: 'Bulk processing capacity', description: 'Upload ZIP, AI analyzes, admin reviews, batch import -- vs 4+ hours manual' },
      { category: 'Storage', value: '-60%', label: 'Image size reduction', description: 'Sharp.js pipeline: WebP format, 2000px max, quality 82, EXIF stripping' },
      { category: 'Data', value: '7 stages', label: 'AI extraction pipeline', description: 'Logo detection, vehicle ID, color palette, design DNA, inspiration, SEO copy, bulk processing' },
    ],

    // Testimonial
    testimonial: {
      quote: 'Avant Zonemation, ajouter 50 produits prenait une journee entiere. Maintenant c\'est fait en 10 minutes. Le systeme detecte meme les inspirations de design -- nos clients adorent quand on leur dit "ce kit est inspire du style Nike TN". Ca change completement notre storytelling.',
      author: 'Fondateur',
      role: 'CEO & Fondateur',
      company: 'Demarus',
    },

    // Taxonomy
    industries: industryMap['e-commerce'] ? [industryMap['e-commerce']] : [],
    capabilities: [
      capMap['ai-machine-learning'],
      capMap['e-commerce-solutions'],
      capMap['seo-content-strategy'],
      capMap['digital-transformation'],
    ].filter(Boolean),

    // Author
    author: 1, // Aymane

    // Publishing
    status: 'published',
    featured: true,
    publishedDate: '2026-03-25',
    readTime: 8,
    accessLevel: 'full',
    downloadablePdf: false,

    // SEO
    seo: {
      metaTitle: 'Demarus: AI-Powered E-commerce Product Pipeline | Zonemation Case Study',
      metaDescription: 'How Zonemation built an AI vision pipeline that creates fully enriched product listings from a single image in 30 seconds. 80% less manual work, $0.002 per product.',
    },
  })

  console.log('\n--- DONE ---')
  console.log('Case study ID:', caseStudy?.id)
  console.log('\nImages you need to add in admin:')
  console.log('  1. Cover Image -- hero banner for the case study (16:9, e.g. Demarus dashboard screenshot)')
  console.log('  2. Situation Image -- e.g. screenshot of the old manual workflow')
  console.log('  3. Challenge Image -- e.g. diagram showing the 3 challenges')
  console.log('  4. Approach Diagrams -- the 7-stage pipeline flow diagram, architecture diagram')
  console.log('  5. Results Image -- e.g. before/after comparison of a product listing')
  console.log('  6. Before/After -- old manual listing vs AI-generated listing side by side')
  console.log('  7. Gallery -- Demarus admin UI screenshots, bulk import dashboard, color palette system')
  console.log('  8. Client Logo -- Demarus logo')
  console.log('  9. Testimonial Photo -- optional headshot')
}

main().catch(console.error)
