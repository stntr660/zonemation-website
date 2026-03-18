import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'clientDisplay', 'status', 'featured', 'publishedDate'],
    description: 'McKinsey-style case studies with structured narrative and metrics',
  },
  fields: [
    // ─── HEADER ───
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Transforming digital infrastructure for a leading bank"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short summary for cards and listings (2-3 sentences)',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // ─── CLIENT INFO ───
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Client',
          fields: [
            {
              name: 'clientDisplay',
              type: 'select',
              required: true,
              defaultValue: 'anonymous',
              options: [
                { label: 'Named (explicit)', value: 'named' },
                { label: 'Anonymous', value: 'anonymous' },
              ],
              admin: {
                description: 'Whether to show the real client name or an anonymized description',
              },
            },
            {
              name: 'clientName',
              type: 'text',
              admin: {
                description: 'Real client name (e.g. "OCP Group")',
                condition: (data) => data?.clientDisplay === 'named',
              },
            },
            {
              name: 'clientAnonymous',
              type: 'text',
              admin: {
                description: 'Anonymous label (e.g. "A leading Moroccan bank")',
                condition: (data) => data?.clientDisplay === 'anonymous',
              },
            },
            {
              name: 'clientLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Client logo (only shown for named clients)',
                condition: (data) => data?.clientDisplay === 'named',
              },
            },
            {
              name: 'clientIndustryContext',
              type: 'textarea',
              admin: {
                description: 'Brief context about the client (size, market, sector)',
              },
            },
          ],
        },

        // ─── HEADLINE METRICS ───
        {
          label: 'Metrics',
          fields: [
            {
              name: 'headlineMetrics',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Key impact numbers shown prominently (e.g. "+35% revenue")',
              },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "+35%", "$2M", "6 months"' },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "Revenue increase", "Cost saved", "Time to launch"' },
                },
                {
                  name: 'context',
                  type: 'text',
                  admin: { description: 'Optional context (e.g. "vs. industry average of 12%")' },
                },
              ],
            },
          ],
        },

        // ─── NARRATIVE: SITUATION ───
        {
          label: 'Situation',
          fields: [
            {
              name: 'situationHeading',
              type: 'text',
              defaultValue: 'Situation',
              admin: { description: 'Section heading override' },
            },
            {
              name: 'situation',
              type: 'richText',
              admin: {
                description: 'Industry context, client profile, market forces. Set the scene.',
              },
            },
          ],
        },

        // ─── NARRATIVE: CHALLENGE ───
        {
          label: 'Challenge',
          fields: [
            {
              name: 'challengeHeading',
              type: 'text',
              defaultValue: 'Challenge',
              admin: { description: 'Section heading override' },
            },
            {
              name: 'challenge',
              type: 'richText',
              admin: {
                description: 'Specific problem, constraints, stakes. What was at risk?',
              },
            },
            {
              name: 'challengeImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional "before" diagram or screenshot' },
            },
            {
              name: 'challengeImageCaption',
              type: 'text',
            },
          ],
        },

        // ─── NARRATIVE: APPROACH ───
        {
          label: 'Approach',
          fields: [
            {
              name: 'approachHeading',
              type: 'text',
              defaultValue: 'Approach',
              admin: { description: 'Section heading override' },
            },
            {
              name: 'approach',
              type: 'richText',
              admin: {
                description: 'Methodology, phases, tools, frameworks. What Zonemation brought.',
              },
            },
            {
              name: 'approachDiagrams',
              type: 'array',
              admin: { description: 'Architecture diagrams, process flows, frameworks' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                { name: 'caption', type: 'text' },
              ],
            },
          ],
        },

        // ─── NARRATIVE: RESULTS ───
        {
          label: 'Results',
          fields: [
            {
              name: 'resultsHeading',
              type: 'text',
              defaultValue: 'Results',
              admin: { description: 'Section heading override' },
            },
            {
              name: 'results',
              type: 'richText',
              admin: {
                description: 'Outcomes narrative. What changed and why it matters.',
              },
            },
            {
              name: 'detailedMetrics',
              type: 'array',
              admin: { description: 'Full breakdown of all measurable outcomes' },
              fields: [
                { name: 'category', type: 'text', admin: { description: 'e.g. "Revenue", "Operations", "Customer"' } },
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'resultsImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional "after" diagram or screenshot' },
            },
            {
              name: 'resultsImageCaption',
              type: 'text',
            },
            {
              name: 'beforeAfter',
              type: 'group',
              admin: { description: 'Before/After comparison' },
              fields: [
                {
                  name: 'beforeImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                { name: 'beforeCaption', type: 'text' },
                {
                  name: 'afterImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                { name: 'afterCaption', type: 'text' },
              ],
            },
          ],
        },

        // ─── TESTIMONIAL ───
        {
          label: 'Testimonial',
          fields: [
            {
              name: 'testimonial',
              type: 'group',
              fields: [
                { name: 'quote', type: 'textarea' },
                { name: 'author', type: 'text' },
                { name: 'role', type: 'text' },
                { name: 'company', type: 'text' },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },

        // ─── GALLERY ───
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              admin: { description: 'Additional images, screenshots, diagrams' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                { name: 'caption', type: 'text' },
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'Screenshot', value: 'screenshot' },
                    { label: 'Diagram', value: 'diagram' },
                    { label: 'Photo', value: 'photo' },
                    { label: 'Infographic', value: 'infographic' },
                  ],
                  defaultValue: 'photo',
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── TAXONOMY (relationships) ───
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'capabilities',
      type: 'relationship',
      relationTo: 'capabilities',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team',
      admin: {
        position: 'sidebar',
        description: 'Case study author / lead consultant',
      },
    },

    // ─── ACCESS CONTROL ───
    {
      name: 'accessLevel',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full (open access)', value: 'full' },
        { label: 'Preview (gated with "Read More")', value: 'preview' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Full = entire case study visible. Preview = excerpt + metrics only, with "Continue reading" CTA.',
      },
    },
    {
      name: 'downloadablePdf',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Allow PDF download of this case study',
      },
    },

    // ─── PUBLISHING ───
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'readTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated read time in minutes',
      },
    },

    // ─── SEO ───
    {
      name: 'seo',
      type: 'group',
      admin: { description: 'Search engine optimization' },
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
