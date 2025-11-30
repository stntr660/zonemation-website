import { query } from './db'

// Types for our database
export interface Industry {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  parent_id?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  children?: Industry[]
}

export interface Capability {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  parent_id?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  children?: Capability[]
}

export interface Author {
  id: string
  name: string
  email: string
  bio?: string
  avatar_url?: string
  linkedin_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
}

export interface Content {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image_url?: string
  type: 'article' | 'blog' | 'case_study' | 'report' | 'video' | 'podcast'
  status: 'draft' | 'published' | 'archived'
  author_id?: string
  published_at?: string
  reading_time?: number
  view_count: number
  meta_title?: string
  meta_description?: string
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
  
  // Relationships
  author?: Author
  industries?: Industry[]
  capabilities?: Capability[]
  tags?: Tag[]
  case_study_details?: CaseStudyDetails
}

export interface CaseStudyDetails {
  content_id: string
  client_name?: string
  client_industry?: string
  challenge?: string
  solution?: string
  results?: string
  testimonial?: string
  testimonial_author?: string
  testimonial_position?: string
  project_duration?: string
  team_size?: string
  technologies_used?: string[]
  metrics_improved?: Record<string, any>
}

// API functions for capabilities
export const capabilitiesApi = {
  async getAll(includeChildren = true): Promise<Capability[]> {
    const result = await query(`
      SELECT * FROM capabilities 
      WHERE is_active = true 
      ORDER BY sort_order
    `)

    const capabilities = result.rows

    // If including children, organize into hierarchy
    if (includeChildren) {
      const rootCapabilities = capabilities.filter(c => !c.parent_id)
      
      return rootCapabilities.map(root => ({
        ...root,
        children: capabilities.filter(c => c.parent_id === root.id)
      }))
    }

    return capabilities.filter(c => !c.parent_id)
  },

  async getBySlug(slug: string): Promise<Capability | null> {
    const result = await query(`
      SELECT * FROM capabilities 
      WHERE slug = $1 AND is_active = true
    `, [slug])

    return result.rows[0] || null
  }
}

// API functions for industries
export const industriesApi = {
  async getAll(includeChildren = true): Promise<Industry[]> {
    const result = await query(`
      SELECT * FROM industries 
      WHERE is_active = true 
      ORDER BY sort_order
    `)

    const industries = result.rows

    // If including children, organize into hierarchy
    if (includeChildren) {
      const rootIndustries = industries.filter(i => !i.parent_id)
      
      return rootIndustries.map(root => ({
        ...root,
        children: industries.filter(i => i.parent_id === root.id)
      }))
    }

    return industries.filter(i => !i.parent_id)
  },

  async getBySlug(slug: string): Promise<Industry | null> {
    const result = await query(`
      SELECT * FROM industries 
      WHERE slug = $1 AND is_active = true
    `, [slug])

    return result.rows[0] || null
  }
}

// API functions for content
export const contentApi = {
  async getAll(filters?: {
    type?: string
    status?: string
    featured?: boolean
    limit?: number
    offset?: number
  }): Promise<{ data: Content[], count: number }> {
    let queryText = `
      SELECT c.*, 
             COALESCE(
               json_agg(
                 DISTINCT jsonb_build_object('id', cap.id, 'name', cap.name, 'slug', cap.slug)
               ) FILTER (WHERE cap.id IS NOT NULL), 
               '[]'
             ) as capabilities,
             COALESCE(
               json_agg(
                 DISTINCT jsonb_build_object('id', ind.id, 'name', ind.name, 'slug', ind.slug)
               ) FILTER (WHERE ind.id IS NOT NULL), 
               '[]'
             ) as industries
      FROM content c
      LEFT JOIN content_capabilities cc ON c.id = cc.content_id
      LEFT JOIN capabilities cap ON cc.capability_id = cap.id
      LEFT JOIN content_industries ci ON c.id = ci.content_id
      LEFT JOIN industries ind ON ci.industry_id = ind.id
      WHERE 1=1
    `
    
    const params: any[] = []
    let paramCount = 0

    if (filters?.type) {
      paramCount++
      queryText += ` AND c.type = $${paramCount}`
      params.push(filters.type)
    }

    if (filters?.status) {
      paramCount++
      queryText += ` AND c.status = $${paramCount}`
      params.push(filters.status)
    } else {
      paramCount++
      queryText += ` AND c.status = $${paramCount}`
      params.push('published')
    }

    if (filters?.featured !== undefined) {
      paramCount++
      queryText += ` AND c.is_featured = $${paramCount}`
      params.push(filters.featured)
    }

    queryText += ` GROUP BY c.id ORDER BY c.published_at DESC, c.created_at DESC`

    if (filters?.limit) {
      paramCount++
      queryText += ` LIMIT $${paramCount}`
      params.push(filters.limit)
    }

    if (filters?.offset) {
      paramCount++
      queryText += ` OFFSET $${paramCount}`
      params.push(filters.offset)
    }

    const result = await query(queryText, params)
    
    return {
      data: result.rows,
      count: result.rowCount || 0
    }
  },

  async getBySlug(slug: string): Promise<Content | null> {
    const result = await query(`
      SELECT c.*, 
             COALESCE(
               json_agg(
                 DISTINCT jsonb_build_object('id', cap.id, 'name', cap.name, 'slug', cap.slug)
               ) FILTER (WHERE cap.id IS NOT NULL), 
               '[]'
             ) as capabilities,
             COALESCE(
               json_agg(
                 DISTINCT jsonb_build_object('id', ind.id, 'name', ind.name, 'slug', ind.slug)
               ) FILTER (WHERE ind.id IS NOT NULL), 
               '[]'
             ) as industries
      FROM content c
      LEFT JOIN content_capabilities cc ON c.id = cc.content_id
      LEFT JOIN capabilities cap ON cc.capability_id = cap.id
      LEFT JOIN content_industries ci ON c.id = ci.content_id
      LEFT JOIN industries ind ON ci.industry_id = ind.id
      WHERE c.slug = $1 AND c.status = 'published'
      GROUP BY c.id
    `, [slug])

    const content = result.rows[0]
    
    if (content) {
      // Increment view count
      await query(`
        UPDATE content SET view_count = view_count + 1 WHERE id = $1
      `, [content.id])
    }

    return content || null
  },

  async getFeatured(limit = 5): Promise<Content[]> {
    const result = await query(`
      SELECT c.*, 
             COALESCE(
               json_agg(
                 DISTINCT jsonb_build_object('id', cap.id, 'name', cap.name, 'slug', cap.slug)
               ) FILTER (WHERE cap.id IS NOT NULL), 
               '[]'
             ) as capabilities,
             COALESCE(
               json_agg(
                 DISTINCT jsonb_build_object('id', ind.id, 'name', ind.name, 'slug', ind.slug)
               ) FILTER (WHERE ind.id IS NOT NULL), 
               '[]'
             ) as industries
      FROM content c
      LEFT JOIN content_capabilities cc ON c.id = cc.content_id
      LEFT JOIN capabilities cap ON cc.capability_id = cap.id
      LEFT JOIN content_industries ci ON c.id = ci.content_id
      LEFT JOIN industries ind ON ci.industry_id = ind.id
      WHERE c.status = 'published' AND c.is_featured = true
      GROUP BY c.id 
      ORDER BY c.published_at DESC 
      LIMIT $1
    `, [limit])
    
    return result.rows
  }
}