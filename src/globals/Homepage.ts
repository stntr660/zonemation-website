import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'heroHeading',
      type: 'text',
      defaultValue: 'Unlocking the Potential of Those Who Advance the World',
    },
    {
      name: 'heroSubheading',
      type: 'text',
      defaultValue: 'WELCOME TO ZONEMATION',
    },
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Hero Carousel Slides',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Article', value: 'article' },
            { label: 'Report', value: 'report' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'article',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'cta',
          type: 'text',
        },
      ],
    },
    {
      name: 'featuredInsights',
      type: 'relationship',
      relationTo: 'insights',
      hasMany: true,
      label: 'Featured Insights',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats / KPIs',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'ctaHeading',
      type: 'text',
      defaultValue: 'Les grandes transformations commencent par une conversation.',
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      defaultValue: 'Contact Us',
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
      defaultValue: '/contact',
    },
  ],
}
