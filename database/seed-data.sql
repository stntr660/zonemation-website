-- Zonemation CMS Seed Data
-- Based on BCG's comprehensive capabilities and services structure

-- ===================================
-- INDUSTRIES SEED DATA
-- ===================================

-- Main Industry Categories
INSERT INTO industries (name, slug, description, sort_order) VALUES
('Technology', 'technology', 'Technology companies and digital innovation', 1),
('Financial Services', 'financial-services', 'Banking, insurance, fintech, and investment services', 2),
('Healthcare & Life Sciences', 'healthcare-life-sciences', 'Healthcare systems, pharmaceuticals, and medical devices', 3),
('Energy & Utilities', 'energy-utilities', 'Energy sector including renewables and traditional power', 4),
('Manufacturing & Industrial', 'manufacturing-industrial', 'Industrial goods, machinery, and manufacturing', 5),
('Consumer Products & Retail', 'consumer-products-retail', 'Consumer goods, retail, and fashion', 6),
('Transportation & Logistics', 'transportation-logistics', 'Logistics, shipping, and transportation systems', 7),
('Public Sector', 'public-sector', 'Government, defense, and public services', 8),
('Media & Telecommunications', 'media-telecommunications', 'Media, entertainment, and telecom services', 9),
('Real Estate & Infrastructure', 'real-estate-infrastructure', 'Real estate, construction, and infrastructure', 10);

-- Technology Sub-Industries
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Software & Services', 'software-services', 'Software companies and IT services', id, 1 FROM industries WHERE slug = 'technology';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Semiconductors', 'semiconductors', 'Semiconductor and hardware companies', id, 2 FROM industries WHERE slug = 'technology';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Fintech', 'fintech', 'Financial technology companies', id, 3 FROM industries WHERE slug = 'technology';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Growth Tech', 'growth-tech', 'High-growth technology companies', id, 4 FROM industries WHERE slug = 'technology';

-- Financial Services Sub-Industries
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Retail Banking', 'retail-banking', 'Consumer banking services', id, 1 FROM industries WHERE slug = 'financial-services';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Investment Banking', 'investment-banking', 'Investment and corporate banking', id, 2 FROM industries WHERE slug = 'financial-services';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Asset Management', 'asset-management', 'Investment and wealth management', id, 3 FROM industries WHERE slug = 'financial-services';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Insurance', 'insurance', 'Insurance and risk management', id, 4 FROM industries WHERE slug = 'financial-services';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Private Equity', 'private-equity', 'Private equity and venture capital', id, 5 FROM industries WHERE slug = 'financial-services';

-- Healthcare Sub-Industries
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Pharmaceuticals', 'pharmaceuticals', 'Pharmaceutical companies and drug development', id, 1 FROM industries WHERE slug = 'healthcare-life-sciences';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Medical Devices', 'medical-devices', 'Medical device and technology companies', id, 2 FROM industries WHERE slug = 'healthcare-life-sciences';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Healthcare Providers', 'healthcare-providers', 'Hospitals and healthcare service providers', id, 3 FROM industries WHERE slug = 'healthcare-life-sciences';
INSERT INTO industries (name, slug, description, parent_id, sort_order)
SELECT 'Health Tech', 'health-tech', 'Digital health and medical technology', id, 4 FROM industries WHERE slug = 'healthcare-life-sciences';

-- ===================================
-- CAPABILITIES SEED DATA
-- ===================================

-- Main Capability Categories
INSERT INTO capabilities (name, slug, description, sort_order) VALUES
('Strategy & Purpose', 'strategy-purpose', 'Strategic planning, purpose-driven transformation, and corporate strategy', 1),
('Artificial Intelligence', 'artificial-intelligence', 'AI strategy, implementation, and responsible AI practices', 2),
('Digital Transformation', 'digital-transformation', 'End-to-end digital transformation and technology enablement', 3),
('Operations Excellence', 'operations-excellence', 'Operational optimization, supply chain, and process improvement', 4),
('Marketing & Sales', 'marketing-sales', 'Customer experience, marketing strategy, and sales optimization', 5),
('People & Organization', 'people-organization', 'Organizational design, talent management, and culture transformation', 6),
('Technology & Data', 'technology-data', 'Technology implementation, data analytics, and digital platforms', 7),
('Sustainability & ESG', 'sustainability-esg', 'Environmental, social, and governance initiatives', 8),
('Mergers & Acquisitions', 'mergers-acquisitions', 'M&A strategy, due diligence, and post-merger integration', 9),
('Risk & Compliance', 'risk-compliance', 'Risk management, regulatory compliance, and governance', 10);

-- Strategy & Purpose Sub-Capabilities
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Corporate Strategy', 'corporate-strategy', 'Long-term strategic planning and competitive positioning', id, 1 FROM capabilities WHERE slug = 'strategy-purpose';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Business Model Innovation', 'business-model-innovation', 'New business model development and innovation', id, 2 FROM capabilities WHERE slug = 'strategy-purpose';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Purpose & Values', 'purpose-values', 'Purpose-driven strategy and values alignment', id, 3 FROM capabilities WHERE slug = 'strategy-purpose';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Scenario Planning', 'scenario-planning', 'Strategic scenario planning and future readiness', id, 4 FROM capabilities WHERE slug = 'strategy-purpose';

-- Artificial Intelligence Sub-Capabilities
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'AI Strategy & Roadmap', 'ai-strategy-roadmap', 'AI strategy development and implementation roadmaps', id, 1 FROM capabilities WHERE slug = 'artificial-intelligence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Generative AI', 'generative-ai', 'GenAI implementation and use case development', id, 2 FROM capabilities WHERE slug = 'artificial-intelligence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'AI Agents & Automation', 'ai-agents-automation', 'AI agents and intelligent automation solutions', id, 3 FROM capabilities WHERE slug = 'artificial-intelligence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Responsible AI', 'responsible-ai', 'Ethical AI, governance, and risk management', id, 4 FROM capabilities WHERE slug = 'artificial-intelligence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Machine Learning', 'machine-learning', 'ML model development and deployment', id, 5 FROM capabilities WHERE slug = 'artificial-intelligence';

-- Digital Transformation Sub-Capabilities
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Digital Strategy', 'digital-strategy', 'Comprehensive digital transformation strategy', id, 1 FROM capabilities WHERE slug = 'digital-transformation';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Digital Operating Model', 'digital-operating-model', 'Digital-first operating model design', id, 2 FROM capabilities WHERE slug = 'digital-transformation';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Digital Platforms', 'digital-platforms', 'Platform strategy and ecosystem development', id, 3 FROM capabilities WHERE slug = 'digital-transformation';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Digital Maturity Assessment', 'digital-maturity-assessment', 'Digital readiness and maturity evaluation', id, 4 FROM capabilities WHERE slug = 'digital-transformation';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Agile Transformation', 'agile-transformation', 'Agile methodology and ways of working', id, 5 FROM capabilities WHERE slug = 'digital-transformation';

-- Operations Excellence Sub-Capabilities
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Supply Chain Optimization', 'supply-chain-optimization', 'End-to-end supply chain transformation', id, 1 FROM capabilities WHERE slug = 'operations-excellence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Manufacturing Excellence', 'manufacturing-excellence', 'Manufacturing process optimization', id, 2 FROM capabilities WHERE slug = 'operations-excellence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Procurement', 'procurement', 'Strategic sourcing and procurement optimization', id, 3 FROM capabilities WHERE slug = 'operations-excellence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Cost Transformation', 'cost-transformation', 'Cost reduction and efficiency improvement', id, 4 FROM capabilities WHERE slug = 'operations-excellence';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Lean Six Sigma', 'lean-six-sigma', 'Process improvement and waste reduction', id, 5 FROM capabilities WHERE slug = 'operations-excellence';

-- Marketing & Sales Sub-Capabilities
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Customer Experience', 'customer-experience', 'Customer journey optimization and CX strategy', id, 1 FROM capabilities WHERE slug = 'marketing-sales';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Brand Strategy', 'brand-strategy', 'Brand positioning and marketing strategy', id, 2 FROM capabilities WHERE slug = 'marketing-sales';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Digital Marketing', 'digital-marketing', 'Digital marketing and omnichannel strategies', id, 3 FROM capabilities WHERE slug = 'marketing-sales';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Sales Effectiveness', 'sales-effectiveness', 'Sales process optimization and enablement', id, 4 FROM capabilities WHERE slug = 'marketing-sales';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Customer Analytics', 'customer-analytics', 'Customer insights and behavioral analytics', id, 5 FROM capabilities WHERE slug = 'marketing-sales';

-- People & Organization Sub-Capabilities
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Organizational Design', 'organizational-design', 'Organization structure and design optimization', id, 1 FROM capabilities WHERE slug = 'people-organization';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Talent Management', 'talent-management', 'Talent acquisition, development, and retention', id, 2 FROM capabilities WHERE slug = 'people-organization';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Leadership Development', 'leadership-development', 'Executive and leadership capability building', id, 3 FROM capabilities WHERE slug = 'people-organization';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Culture Transformation', 'culture-transformation', 'Organizational culture and change management', id, 4 FROM capabilities WHERE slug = 'people-organization';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Future of Work', 'future-of-work', 'Hybrid work models and workforce transformation', id, 5 FROM capabilities WHERE slug = 'people-organization';

-- Technology & Data Sub-Capabilities
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Data Strategy', 'data-strategy', 'Data governance and analytics strategy', id, 1 FROM capabilities WHERE slug = 'technology-data';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Cloud Transformation', 'cloud-transformation', 'Cloud migration and modernization', id, 2 FROM capabilities WHERE slug = 'technology-data';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Cybersecurity', 'cybersecurity', 'Security strategy and risk management', id, 3 FROM capabilities WHERE slug = 'technology-data';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Enterprise Architecture', 'enterprise-architecture', 'Technology architecture and systems design', id, 4 FROM capabilities WHERE slug = 'technology-data';
INSERT INTO capabilities (name, slug, description, parent_id, sort_order)
SELECT 'Advanced Analytics', 'advanced-analytics', 'Predictive analytics and business intelligence', id, 5 FROM capabilities WHERE slug = 'technology-data';

-- ===================================
-- SAMPLE AUTHORS
-- ===================================

INSERT INTO authors (name, email, bio) VALUES
('Alex Chen', 'alex.chen@zonemation.com', 'Senior Partner specializing in AI and digital transformation'),
('Sarah Johnson', 'sarah.johnson@zonemation.com', 'Managing Director with expertise in strategy and operations'),
('Michael Torres', 'michael.torres@zonemation.com', 'Principal focused on technology and data solutions'),
('Emily Rodriguez', 'emily.rodriguez@zonemation.com', 'Partner leading sustainability and ESG initiatives'),
('David Kim', 'david.kim@zonemation.com', 'Senior Expert in organizational transformation');

-- ===================================
-- SAMPLE TAGS
-- ===================================

INSERT INTO tags (name, slug, color) VALUES
('Innovation', 'innovation', '#3B82F6'),
('Leadership', 'leadership', '#8B5CF6'),
('Transformation', 'transformation', '#10B981'),
('Best Practices', 'best-practices', '#F59E0B'),
('Case Study', 'case-study', '#EF4444'),
('Research', 'research', '#6366F1'),
('Trends', 'trends', '#EC4899'),
('Methodology', 'methodology', '#14B8A6');

-- ===================================
-- SITE SETTINGS
-- ===================================

INSERT INTO site_settings (key, value, description) VALUES
('site_title', 'Zonemation', 'Website title'),
('site_description', 'Unlocking the potential of those who advance the world', 'Website description'),
('contact_email', 'info@zonemation.com', 'Primary contact email'),
('social_linkedin', 'https://linkedin.com/company/zonemation', 'LinkedIn profile URL'),
('social_twitter', 'https://twitter.com/zonemation', 'Twitter profile URL'),
('blog_posts_per_page', '10', 'Number of posts per page'),
('enable_comments', 'false', 'Enable comments on content'),
('analytics_id', '', 'Google Analytics tracking ID');