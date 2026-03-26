import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function getPayloadClient() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  return getPayload({ config })
}

export default async function UpdateDemarusPage() {
  const payload = await getPayloadClient()

  await payload.update({
    collection: 'case-studies',
    id: 4,
    data: {
      title: 'Data-Driven Product Intelligence for a Motorcycle Aftermarket Platform',
      excerpt: 'How we designed a data-centric product enrichment strategy that turns a single image into a complete, market-ready listing -- cutting manual effort by 80%, enabling predictive design insights, and building a self-growing product taxonomy that compounds competitive advantage over time.',

      clientIndustryContext: 'Demarus is a Moroccan motorcycle decoration kit e-commerce platform with a rapidly growing catalog of 500+ designs. Operating in the North African aftermarket, the business needed to scale product operations without scaling headcount -- and build the data foundation for predictive design and intelligent merchandising.',

      headlineMetrics: [
        { value: '-80%', label: 'Operational overhead', context: 'Product listing time reduced from 5+ min to under 30 seconds' },
        { value: '50:3', label: 'Products per session', context: '50 products enriched in 3 minutes vs. a full day manually' },
        { value: 'Self-growing', label: 'Product taxonomy', context: 'Catalog structure expands automatically with each new product' },
        { value: 'Predictive', label: 'Design intelligence', context: 'Data foundation for trend forecasting and AI-assisted creation' },
      ],

      situationHeading: 'Situation',
      situation: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'Demarus was growing fast. Dozens of new kit designs arrived weekly, but every product required manual enrichment -- identifying the motorcycle, writing descriptions, tagging colors, categorizing by segment, and optimizing images. Each listing took 5-7 minutes of skilled operator time.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The real cost was not just time. It was inconsistency. Different operators described the same motorcycle differently, used different color vocabularies, and produced varying quality copy. The catalog lacked a unified data architecture -- making filtering, search, and recommendation impossible at scale.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'More critically, the business was sitting on untapped intelligence. Every product image contained rich signals -- design patterns, color trends, brand inspiration, market positioning -- but none of this data was being captured or structured. Without it, decisions about which designs to produce next were based on intuition rather than evidence.', version: 1 }], version: 1 },
          ],
          direction: 'ltr', format: '', indent: 0, version: 1,
        },
      },

      challengeHeading: 'The Strategic Challenge',
      challenge: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'The challenge was not simply about speed -- it was about building a data asset. Demarus needed three things simultaneously:', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'First, an intelligent product enrichment system that could extract structured data from visual inputs -- motorcycle identification, color analysis, design characteristics, and market-relevant metadata -- without requiring specialized operators.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Second, a self-growing taxonomy. Every new product should expand the knowledge base rather than require manual classification. The system needed to learn and organize autonomously, building a compounding data advantage.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Third, a data foundation for predictive intelligence. Which design aesthetics resonate with buyers? Which color combinations trend seasonally? Which brand-inspired styles command premium pricing? The answers existed in the product data -- but only if that data was structured, consistent, and rich enough to analyze.', version: 1 }], version: 1 },
          ],
          direction: 'ltr', format: '', indent: 0, version: 1,
        },
      },

      approachHeading: 'Our Approach',
      approach: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'We designed a data-centric product intelligence pipeline that treats every product image as a source of strategic insight -- not just a listing to publish.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'At its core, an AI vision system analyzes each product image through a multi-stage process: identifying the vehicle, extracting the color palette, quantifying design characteristics (aggressiveness, density, visual style), and detecting which consumer brands inspired the design aesthetic. A kit featuring racing stripes and gradient patterns inspired by Nike Air Max TN is tagged as such -- creating a data layer that powers marketing, collections, and recommendations.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The system then generates market-ready French copy that follows a structured SEO framework, drawing on the extracted design intelligence to create compelling product narratives. Rather than generic descriptions, each listing tells a story rooted in the actual design DNA of the product.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Critically, the taxonomy is self-expanding. When the system encounters a motorcycle model not yet in the database, it creates the appropriate classification automatically. The catalog structure grows organically -- no manual maintenance, no data gaps, no inconsistencies.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The bulk processing pipeline handles up to 200 products per session. Images are analyzed, enriched data is presented for human validation, and approved products are published with optimized assets. The entire flow is designed around a human-in-the-loop model: AI handles the data extraction and structuring, operators focus on quality assurance and editorial judgment.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The deeper strategic value lies in what this data enables downstream. With every product enriched with structured design attributes, color profiles, and brand inspiration references, the platform builds a living dataset that feeds into predictive design intelligence -- informing which kits to produce next, which aesthetics are trending, and which market segments are underserved.', version: 1 }], version: 1 },
          ],
          direction: 'ltr', format: '', indent: 0, version: 1,
        },
      },

      resultsHeading: 'Impact',
      results: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'The platform transformed from a manually operated catalog into a data-driven product engine. What previously consumed a full day of operator time now runs in minutes -- with richer, more consistent data output.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The self-growing taxonomy eliminated a category of operational work entirely. New motorcycle models, color classifications, and design categories are created automatically as the catalog expands. The data infrastructure compounds -- every product processed makes the system smarter and the catalog more navigable.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'The design inspiration detection -- identifying that a kit draws from Nike, Monster Energy, or racing livery aesthetics -- opened entirely new merchandising strategies. "Nike-inspired kits" became a browsable collection. Trend analytics revealed which brand aesthetics drive the highest conversion. Customer targeting became design-aware.', version: 1 }], version: 1 },
            { type: 'paragraph', children: [{ type: 'text', text: 'Most importantly, the structured data foundation positions Demarus for the next phase: predictive design intelligence. With hundreds of products tagged with quantified design attributes, color profiles, and market performance data, the platform can now inform design decisions -- moving from reactive ("what sold") to predictive ("what will sell").', version: 1 }], version: 1 },
          ],
          direction: 'ltr', format: '', indent: 0, version: 1,
        },
      },

      detailedMetrics: [
        { category: 'Operations', value: '-80%', label: 'Manual effort reduction', description: 'Product enrichment time reduced from 5+ minutes to under 30 seconds per listing' },
        { category: 'Operations', value: '50 in 3 min', label: 'Bulk enrichment capacity', description: 'Full AI analysis, human review, and publication in a single session' },
        { category: 'Data', value: 'Self-growing', label: 'Autonomous taxonomy', description: 'Vehicle models, color classifications, and design categories created automatically' },
        { category: 'Data', value: '14 colors', label: 'Unified color system', description: 'Consistent palette taxonomy enabling meaningful filtering across 500+ products' },
        { category: 'Strategy', value: 'Predictive', label: 'Design intelligence', description: 'Structured data foundation for trend forecasting and AI-assisted design decisions' },
        { category: 'Strategy', value: 'Brand-aware', label: 'Inspiration tracking', description: 'Consumer brand influence detection powering targeted merchandising and collections' },
      ],

      testimonial: {
        quote: 'Avant ce projet, ajouter 50 produits prenait une journee entiere. Aujourd\'hui, c\'est fait en 10 minutes -- et la qualite des donnees est incomparablement meilleure. Mais ce qui a vraiment change la donne, c\'est qu\'on sait maintenant quels designs creer. On ne devine plus, on decide.',
        author: 'Fondateur',
        role: 'CEO & Fondateur',
        company: 'Demarus',
      },

      seo: {
        metaTitle: 'Demarus: Data-Driven Product Intelligence for E-commerce | Zonemation',
        metaDescription: 'How Zonemation designed a data-centric product enrichment strategy that cut manual effort by 80% and built the foundation for predictive design intelligence.',
      },
    },
  })

  redirect('/fr/case-studies/demarus-ai-product-pipeline')
}
