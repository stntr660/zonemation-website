import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    group: 'People',
    defaultColumns: ['name', 'ice', 'city', 'email'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Company / Client Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          admin: { width: '50%' },
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'ice',
      type: 'text',
      label: 'ICE (Tax ID)',
    },
    {
      name: 'testimonial',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'contactName',
          type: 'text',
          label: 'Contact Person',
          admin: { width: '50%' },
        },
        {
          name: 'contactRole',
          type: 'text',
          label: 'Contact Role',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
