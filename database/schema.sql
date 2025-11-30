-- Zonemation CMS Database Schema
-- Based on BCG's comprehensive capabilities and services structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- CORE TAXONOMY TABLES
-- ===================================

-- Industries table
CREATE TABLE industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    parent_id UUID REFERENCES industries(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Capabilities table
CREATE TABLE capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    parent_id UUID REFERENCES capabilities(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- CONTENT TABLES
-- ===================================

-- Authors table
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content types enum
CREATE TYPE content_type AS ENUM ('article', 'blog', 'case_study', 'report', 'video', 'podcast');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Main content table
CREATE TABLE content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image_url VARCHAR(500),
    type content_type NOT NULL,
    status content_status DEFAULT 'draft',
    author_id UUID REFERENCES authors(id),
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- RELATIONSHIP TABLES
-- ===================================

-- Content to Industries relationship (many-to-many)
CREATE TABLE content_industries (
    content_id UUID REFERENCES content(id) ON DELETE CASCADE,
    industry_id UUID REFERENCES industries(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, industry_id)
);

-- Content to Capabilities relationship (many-to-many)
CREATE TABLE content_capabilities (
    content_id UUID REFERENCES content(id) ON DELETE CASCADE,
    capability_id UUID REFERENCES capabilities(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, capability_id)
);

-- Tags table for additional taxonomy
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#6B7280',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content to Tags relationship
CREATE TABLE content_tags (
    content_id UUID REFERENCES content(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, tag_id)
);

-- ===================================
-- CASE STUDY SPECIFIC TABLES
-- ===================================

-- Case study details (extends content table)
CREATE TABLE case_study_details (
    content_id UUID PRIMARY KEY REFERENCES content(id) ON DELETE CASCADE,
    client_name VARCHAR(255),
    client_industry VARCHAR(255),
    challenge TEXT,
    solution TEXT,
    results TEXT,
    testimonial TEXT,
    testimonial_author VARCHAR(255),
    testimonial_position VARCHAR(255),
    project_duration VARCHAR(100),
    team_size VARCHAR(100),
    technologies_used TEXT[],
    metrics_improved JSONB -- Store key metrics as JSON
);

-- ===================================
-- ADMIN & SETTINGS TABLES
-- ===================================

-- Admin users
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'editor',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings
CREATE TABLE site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- INDEXES FOR PERFORMANCE
-- ===================================

-- Content indexes
CREATE INDEX idx_content_type ON content(type);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_published_at ON content(published_at DESC);
CREATE INDEX idx_content_featured ON content(is_featured);
CREATE INDEX idx_content_slug ON content(slug);

-- Industry and capability indexes
CREATE INDEX idx_industries_parent ON industries(parent_id);
CREATE INDEX idx_capabilities_parent ON capabilities(parent_id);
CREATE INDEX idx_industries_slug ON industries(slug);
CREATE INDEX idx_capabilities_slug ON capabilities(slug);

-- Relationship indexes
CREATE INDEX idx_content_industries_content ON content_industries(content_id);
CREATE INDEX idx_content_industries_industry ON content_industries(industry_id);
CREATE INDEX idx_content_capabilities_content ON content_capabilities(content_id);
CREATE INDEX idx_content_capabilities_capability ON content_capabilities(capability_id);

-- ===================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================

-- Enable RLS on sensitive tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Policies for content (public read, authenticated write)
CREATE POLICY "Content is publicly readable" ON content
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage content" ON content
    FOR ALL USING (auth.role() = 'authenticated');

-- ===================================
-- TRIGGERS FOR UPDATED_AT
-- ===================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_industries_updated_at BEFORE UPDATE ON industries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_capabilities_updated_at BEFORE UPDATE ON capabilities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();