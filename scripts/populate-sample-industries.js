const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Sample industries structure
const industries = [
  {
    name: 'Technology',
    slug: 'technology',
    description: 'Technology companies and digital innovation',
    children: [
      { name: 'Software & Services', slug: 'software-services', description: 'Software companies and IT services' },
      { name: 'Semiconductors', slug: 'semiconductors', description: 'Semiconductor and hardware companies' },
      { name: 'Fintech', slug: 'fintech', description: 'Financial technology companies' },
      { name: 'EdTech', slug: 'edtech', description: 'Educational technology companies' }
    ]
  },
  {
    name: 'Financial Services',
    slug: 'financial-services',
    description: 'Banking, insurance, and financial institutions',
    children: [
      { name: 'Banking', slug: 'banking', description: 'Commercial and retail banking' },
      { name: 'Insurance', slug: 'insurance', description: 'Insurance and risk management' },
      { name: 'Asset Management', slug: 'asset-management', description: 'Investment and wealth management' },
      { name: 'Capital Markets', slug: 'capital-markets', description: 'Investment banking and capital markets' }
    ]
  },
  {
    name: 'Healthcare & Life Sciences',
    slug: 'healthcare-life-sciences',
    description: 'Healthcare systems and life sciences',
    children: [
      { name: 'Pharmaceuticals', slug: 'pharmaceuticals', description: 'Pharmaceutical companies and drug development' },
      { name: 'Medical Devices', slug: 'medical-devices', description: 'Medical device and technology companies' },
      { name: 'Healthcare Providers', slug: 'healthcare-providers', description: 'Hospitals and healthcare services' },
      { name: 'Biotechnology', slug: 'biotechnology', description: 'Biotech and life sciences companies' }
    ]
  },
  {
    name: 'Energy & Utilities',
    slug: 'energy-utilities',
    description: 'Energy sector and utilities',
    children: [
      { name: 'Oil & Gas', slug: 'oil-gas', description: 'Oil and gas companies' },
      { name: 'Renewable Energy', slug: 'renewable-energy', description: 'Solar, wind, and renewable energy' },
      { name: 'Electric Utilities', slug: 'electric-utilities', description: 'Electric power generation and distribution' },
      { name: 'Energy Storage', slug: 'energy-storage', description: 'Battery and energy storage solutions' }
    ]
  },
  {
    name: 'Manufacturing & Industrial',
    slug: 'manufacturing-industrial',
    description: 'Manufacturing and industrial companies',
    children: [
      { name: 'Automotive', slug: 'automotive', description: 'Automotive manufacturing and suppliers' },
      { name: 'Aerospace & Defense', slug: 'aerospace-defense', description: 'Aerospace and defense contractors' },
      { name: 'Industrial Equipment', slug: 'industrial-equipment', description: 'Industrial machinery and equipment' },
      { name: 'Chemical & Materials', slug: 'chemical-materials', description: 'Chemical and materials companies' }
    ]
  },
  {
    name: 'Consumer & Retail',
    slug: 'consumer-retail',
    description: 'Consumer products and retail',
    children: [
      { name: 'Retail', slug: 'retail', description: 'Retail and e-commerce companies' },
      { name: 'Consumer Goods', slug: 'consumer-goods', description: 'Consumer products and brands' },
      { name: 'Food & Beverage', slug: 'food-beverage', description: 'Food and beverage companies' },
      { name: 'Fashion & Luxury', slug: 'fashion-luxury', description: 'Fashion and luxury brands' }
    ]
  },
  {
    name: 'Media & Telecommunications',
    slug: 'media-telecommunications',
    description: 'Media, entertainment, and telecom',
    children: [
      { name: 'Telecommunications', slug: 'telecommunications', description: 'Telecom service providers' },
      { name: 'Media & Entertainment', slug: 'media-entertainment', description: 'Media and entertainment companies' },
      { name: 'Gaming', slug: 'gaming', description: 'Gaming and interactive entertainment' },
      { name: 'Publishing', slug: 'publishing', description: 'Publishing and content companies' }
    ]
  },
  {
    name: 'Transportation & Logistics',
    slug: 'transportation-logistics',
    description: 'Transportation and logistics services',
    children: [
      { name: 'Airlines', slug: 'airlines', description: 'Airlines and aviation services' },
      { name: 'Shipping & Logistics', slug: 'shipping-logistics', description: 'Shipping and logistics companies' },
      { name: 'Rail & Transit', slug: 'rail-transit', description: 'Rail and public transit systems' },
      { name: 'Freight & Cargo', slug: 'freight-cargo', description: 'Freight and cargo services' }
    ]
  }
]

async function populateIndustries() {
  try {
    console.log('🏭 Starting industries population...')
    
    for (const industry of industries) {
      // Insert parent industry
      const parentResult = await pool.query(`
        INSERT INTO industries (name, slug, description, sort_order, is_active) 
        VALUES ($1, $2, $3, $4, true) 
        RETURNING id
      `, [industry.name, industry.slug, industry.description, industries.indexOf(industry) + 1])
      
      const parentId = parentResult.rows[0].id
      console.log(`✅ Added industry: ${industry.name}`)
      
      // Insert children industries
      for (const child of industry.children) {
        await pool.query(`
          INSERT INTO industries (name, slug, description, parent_id, sort_order, is_active) 
          VALUES ($1, $2, $3, $4, $5, true)
        `, [child.name, child.slug, child.description, parentId, industry.children.indexOf(child) + 1])
        
        console.log(`  ↳ Added sub-industry: ${child.name}`)
      }
    }
    
    console.log('🎉 Successfully populated all industries!')
    
    // Show summary
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM industries')
    const parentResult = await pool.query('SELECT COUNT(*) as parents FROM industries WHERE parent_id IS NULL')
    const childResult = await pool.query('SELECT COUNT(*) as children FROM industries WHERE parent_id IS NOT NULL')
    
    console.log(`📊 Summary:`)
    console.log(`   Total industries: ${totalResult.rows[0].total}`)
    console.log(`   Parent industries: ${parentResult.rows[0].parents}`)
    console.log(`   Sub-industries: ${childResult.rows[0].children}`)
    
  } catch (error) {
    console.error('❌ Error populating industries:', error.message)
  } finally {
    await pool.end()
  }
}

populateIndustries()