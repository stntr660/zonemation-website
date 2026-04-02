import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Zonemation',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Unlocking the Potential of Those Who Advance the World',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoDark',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'text' },
      ],
    },
    {
      name: 'billing',
      type: 'group',
      label: 'Billing / Invoice Defaults',
      fields: [
        { name: 'companyName', type: 'text', label: 'Company Name', defaultValue: 'Zonemation' },
        { name: 'address', type: 'text', label: 'Address' },
        { name: 'city', type: 'text', label: 'City' },
        { name: 'email', type: 'email', label: 'Billing Email' },
        { name: 'phone', type: 'text', label: 'Phone' },
        { name: 'ice', type: 'text', label: 'ICE (Tax ID)' },
        {
          name: 'rib',
          type: 'text',
          label: 'RIB',
        },
        {
          name: 'iban',
          type: 'text',
          label: 'IBAN',
        },
        {
          name: 'swift',
          type: 'text',
          label: 'BIC / SWIFT',
        },
        {
          name: 'bankName',
          type: 'text',
          label: 'Banque',
        },
        {
          name: 'stamp',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Stamp',
          admin: { description: 'Upload your company stamp image (PNG with transparent background). Appears on invoices.' },
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
