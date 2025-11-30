const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// BCG Capabilities structure from their website
const bcgCapabilities = [
  {
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description: 'AI strategy, implementation, and responsible AI practices',
    children: [
      { name: 'AI Agents', slug: 'ai-agents', description: 'Intelligent AI agent development and deployment' },
      { name: 'Generative AI', slug: 'generative-ai', description: 'GenAI implementation and use cases' },
      { name: 'Responsible AI', slug: 'responsible-ai', description: 'Ethical AI governance and risk management' }
    ]
  },
  {
    name: 'Business and Organizational Purpose',
    slug: 'business-organizational-purpose',
    description: 'Purpose-driven strategy and organizational transformation',
    children: []
  },
  {
    name: 'Business Resilience',
    slug: 'business-resilience',
    description: 'Strategies for navigating uncertain business landscapes',
    children: []
  },
  {
    name: 'Business Transformation',
    slug: 'business-transformation',
    description: 'Comprehensive business restructuring and transformation',
    children: [
      { name: 'Business Restructuring and Turnaround', slug: 'business-restructuring-turnaround', description: 'Corporate restructuring and turnaround management' },
      { name: 'Performance and Value Acceleration', slug: 'performance-value-acceleration', description: 'Performance improvement and value creation' }
    ]
  },
  {
    name: 'Climate Change and Sustainability',
    slug: 'climate-change-sustainability',
    description: 'Environmental sustainability and climate strategy',
    children: [
      { name: 'Climate Risk and Adaptation', slug: 'climate-risk-adaptation', description: 'Climate risk assessment and adaptation strategies' },
      { name: 'Decarbonization', slug: 'decarbonization', description: 'Carbon reduction and net-zero strategies' },
      { name: 'Green Growth Accelerator', slug: 'green-growth-accelerator', description: 'Sustainable business growth strategies' },
      { name: 'Nature-Based Solutions', slug: 'nature-based-solutions', description: 'Environmental solutions using natural systems' },
      { name: 'Sustainability Strategy', slug: 'sustainability-strategy', description: 'Comprehensive sustainability transformation' },
      { name: 'Sustainable Finance', slug: 'sustainable-finance', description: 'ESG investing and sustainable finance' },
      { name: 'Sustainable Operations', slug: 'sustainable-operations', description: 'Environmentally responsible operations' }
    ]
  },
  {
    name: 'Corporate Finance and Strategy',
    slug: 'corporate-finance-strategy',
    description: 'Strategic planning and corporate finance excellence',
    children: [
      { name: 'Business Strategy', slug: 'business-strategy', description: 'Business-level strategic planning' },
      { name: 'Corporate Strategy', slug: 'corporate-strategy', description: 'Corporate-level strategy and portfolio management' },
      { name: 'Family Business', slug: 'family-business', description: 'Family business governance and strategy' },
      { name: 'Finance Function Excellence', slug: 'finance-function-excellence', description: 'Finance organization optimization' },
      { name: 'Strategic Planning', slug: 'strategic-planning', description: 'Strategic planning processes and frameworks' },
      { name: 'Value Creation Strategy', slug: 'value-creation-strategy', description: 'Shareholder value creation strategies' }
    ]
  },
  {
    name: 'Cost Management',
    slug: 'cost-management',
    description: 'Cost optimization and efficiency improvement',
    children: [
      { name: 'Zero-Based Budgeting', slug: 'zero-based-budgeting', description: 'Zero-based budgeting methodology' }
    ]
  },
  {
    name: 'Customer Insights',
    slug: 'customer-insights',
    description: 'Customer analytics and experience optimization',
    children: [
      { name: 'Customer Data Analytics', slug: 'customer-data-analytics', description: 'Customer data analysis in emerging markets' },
      { name: 'Customer Demand', slug: 'customer-demand', description: 'Customer demand forecasting and analysis' },
      { name: 'Customer Experience', slug: 'customer-experience', description: 'Customer experience strategy and design' },
      { name: 'Customer Journey', slug: 'customer-journey', description: 'Customer journey mapping and optimization' }
    ]
  },
  {
    name: 'Digital, Technology, and Data',
    slug: 'digital-technology-data',
    description: 'Digital transformation and technology strategy',
    children: [
      { name: 'Agile at Scale', slug: 'agile-at-scale', description: 'Enterprise agile transformation' },
      { name: 'Augmented and Virtual Reality', slug: 'ar-vr', description: 'AR/VR implementation and strategy' },
      { name: 'Blockchain', slug: 'blockchain', description: 'Blockchain technology and applications' },
      { name: 'Build-Operate-Transfer', slug: 'build-operate-transfer', description: 'BOT technology delivery model' },
      { name: 'Cloud Computing', slug: 'cloud-computing', description: 'Cloud strategy and migration' },
      { name: 'Cybersecurity', slug: 'cybersecurity', description: 'Cybersecurity and digital risk strategy' },
      { name: 'Data and Analytics', slug: 'data-analytics', description: 'Data strategy and advanced analytics' },
      { name: 'Digital Ecosystems', slug: 'digital-ecosystems', description: 'Digital platform and ecosystem strategy' },
      { name: 'Digital Transformation', slug: 'digital-transformation', description: 'End-to-end digital transformation' },
      { name: 'Emerging Technologies', slug: 'emerging-technologies', description: 'Emerging technology adoption' },
      { name: 'Internet of Things', slug: 'iot', description: 'IoT strategy and implementation' },
      { name: 'Metaverse Services', slug: 'metaverse-services', description: 'Metaverse strategy and applications' },
      { name: 'Quantum Computing', slug: 'quantum-computing', description: 'Quantum computing applications' },
      { name: 'Synthetic Biology', slug: 'synthetic-biology', description: 'Synthetic biology and bioengineering' }
    ]
  },
  {
    name: 'Innovation Strategy and Delivery',
    slug: 'innovation-strategy-delivery',
    description: 'Innovation management and product development',
    children: [
      { name: 'Business Model Innovation', slug: 'business-model-innovation', description: 'New business model development' },
      { name: 'Corporate Venturing', slug: 'corporate-venturing', description: 'Corporate venture capital and innovation' },
      { name: 'Product Innovation', slug: 'product-innovation', description: 'Product innovation and engineering' }
    ]
  },
  {
    name: 'International Business',
    slug: 'international-business',
    description: 'Global business strategy and international expansion',
    children: [
      { name: 'Foreign Direct Investment', slug: 'foreign-direct-investment', description: 'FDI strategy and execution' },
      { name: 'Emerging Markets Strategy', slug: 'emerging-markets-strategy', description: 'Go-to-market strategy for emerging markets' },
      { name: 'International Trade', slug: 'international-trade', description: 'International trade and commerce' }
    ]
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Manufacturing excellence and Industry 4.0',
    children: [
      { name: 'Industry 4.0', slug: 'industry-4-0', description: 'Smart manufacturing and Industry 4.0' }
    ]
  },
  {
    name: 'Marketing and Sales',
    slug: 'marketing-sales',
    description: 'Marketing strategy and sales optimization',
    children: [
      { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Digital marketing strategy and execution' },
      { name: 'Digital Sales', slug: 'digital-sales', description: 'Digital sales transformation' },
      { name: 'E-Commerce', slug: 'e-commerce', description: 'E-commerce strategy and implementation' },
      { name: 'Marketing Function Excellence', slug: 'marketing-function-excellence', description: 'Marketing organization optimization' },
      { name: 'Personalization', slug: 'personalization', description: 'Customer personalization strategies' },
      { name: 'Sales Channel Strategy', slug: 'sales-channel-strategy', description: 'Sales channel optimization' }
    ]
  },
  {
    name: 'M&A, Transactions, and PMI',
    slug: 'ma-transactions-pmi',
    description: 'Mergers, acquisitions, and post-merger integration',
    children: [
      { name: 'Carve-Out', slug: 'carve-out', description: 'Corporate carve-out and spin-off' },
      { name: 'Divestitures', slug: 'divestitures', description: 'Divestiture strategy and execution' },
      { name: 'Due Diligence', slug: 'due-diligence', description: 'M&A due diligence and valuation' }
    ]
  },
  {
    name: 'Operations',
    slug: 'operations',
    description: 'Operational excellence and process optimization',
    children: [
      { name: 'Capital Project Management', slug: 'capital-project-management', description: 'Large capital project management' },
      { name: 'Digital Support Functions', slug: 'digital-support-functions', description: 'Digital transformation of support functions' },
      { name: 'Operational Excellence', slug: 'operational-excellence', description: 'Operations optimization and excellence' },
      { name: 'Procurement', slug: 'procurement', description: 'Strategic sourcing and procurement' },
      { name: 'Service Operations', slug: 'service-operations', description: 'Service delivery optimization' },
      { name: 'Supply Chain Management', slug: 'supply-chain-management', description: 'End-to-end supply chain optimization' }
    ]
  },
  {
    name: 'Organization Strategy',
    slug: 'organization-strategy',
    description: 'Organizational design and change management',
    children: [
      { name: 'Behavior Change', slug: 'behavior-change', description: 'Organizational behavior change' },
      { name: 'Culture and Change Management', slug: 'culture-change-management', description: 'Culture transformation and change management' },
      { name: 'Organization Design', slug: 'organization-design', description: 'Organizational structure and design' },
      { name: 'Platform Operating Model', slug: 'platform-operating-model', description: 'Platform-based operating models' },
      { name: 'Smart Simplicity', slug: 'smart-simplicity', description: 'Organizational simplification strategies' }
    ]
  },
  {
    name: 'People Strategy',
    slug: 'people-strategy',
    description: 'Human resources and talent management',
    children: [
      { name: 'Digital HR', slug: 'digital-hr', description: 'Digital transformation of HR' },
      { name: 'Executive Coaching', slug: 'executive-coaching', description: 'Executive development and coaching' },
      { name: 'Future of Work', slug: 'future-of-work', description: 'Future workforce strategies' },
      { name: 'Leadership Development', slug: 'leadership-development', description: 'Leadership capability building' },
      { name: 'Talent and Skills', slug: 'talent-skills', description: 'Talent management and skills development' }
    ]
  },
  {
    name: 'Pricing and Revenue Management',
    slug: 'pricing-revenue-management',
    description: 'Pricing strategy and revenue optimization',
    children: [
      { name: 'B2B Pricing', slug: 'b2b-pricing', description: 'B2B pricing strategies' },
      { name: 'B2C Pricing', slug: 'b2c-pricing', description: 'B2C pricing strategies' },
      { name: 'Revenue Growth Management', slug: 'revenue-growth-management', description: 'Revenue optimization and growth' }
    ]
  },
  {
    name: 'Risk Management and Compliance',
    slug: 'risk-management-compliance',
    description: 'Risk management and regulatory compliance',
    children: [
      { name: 'Balance Sheet Management', slug: 'balance-sheet-management', description: 'Financial balance sheet optimization' },
      { name: 'Commodity Risk Management', slug: 'commodity-risk-management', description: 'Commodity and market risk management' },
      { name: 'Compliance and Crisis Management', slug: 'compliance-crisis-management', description: 'Regulatory compliance and crisis response' },
      { name: 'Credit Risk Management', slug: 'credit-risk-management', description: 'Credit risk assessment and management' },
      { name: 'Operational Risk', slug: 'operational-risk', description: 'Operational risk and resilience' },
      { name: 'Risk Analytics', slug: 'risk-analytics', description: 'Risk analytics and technology' }
    ]
  },
  {
    name: 'Social Impact',
    slug: 'social-impact',
    description: 'Social responsibility and impact initiatives',
    children: [
      { name: 'Food Systems', slug: 'food-systems', description: 'Food systems and food security' },
      { name: 'Humanitarian Response', slug: 'humanitarian-response', description: 'Humanitarian aid and disaster response' },
      { name: 'International Development', slug: 'international-development', description: 'International development programs' }
    ]
  }
]

async function populateCapabilities() {
  try {
    console.log('🚀 Starting BCG capabilities population...')
    
    for (const capability of bcgCapabilities) {
      // Insert parent capability
      const parentResult = await pool.query(`
        INSERT INTO capabilities (name, slug, description, sort_order, is_active) 
        VALUES ($1, $2, $3, $4, true) 
        RETURNING id
      `, [capability.name, capability.slug, capability.description, bcgCapabilities.indexOf(capability) + 1])
      
      const parentId = parentResult.rows[0].id
      console.log(`✅ Added capability: ${capability.name}`)
      
      // Insert children capabilities
      for (const child of capability.children) {
        await pool.query(`
          INSERT INTO capabilities (name, slug, description, parent_id, sort_order, is_active) 
          VALUES ($1, $2, $3, $4, $5, true)
        `, [child.name, child.slug, child.description, parentId, capability.children.indexOf(child) + 1])
        
        console.log(`  ↳ Added sub-capability: ${child.name}`)
      }
    }
    
    console.log('🎉 Successfully populated all BCG capabilities!')
    
    // Show summary
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM capabilities')
    const parentResult = await pool.query('SELECT COUNT(*) as parents FROM capabilities WHERE parent_id IS NULL')
    const childResult = await pool.query('SELECT COUNT(*) as children FROM capabilities WHERE parent_id IS NOT NULL')
    
    console.log(`📊 Summary:`)
    console.log(`   Total capabilities: ${totalResult.rows[0].total}`)
    console.log(`   Parent capabilities: ${parentResult.rows[0].parents}`)
    console.log(`   Sub-capabilities: ${childResult.rows[0].children}`)
    
  } catch (error) {
    console.error('❌ Error populating capabilities:', error.message)
  } finally {
    await pool.end()
  }
}

populateCapabilities()