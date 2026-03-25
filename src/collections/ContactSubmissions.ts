import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    group: 'Operations',
    defaultColumns: ['name', 'email', 'project', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'project',
      type: 'select',
      options: [
        { label: 'Transformation digitale', value: 'transformation' },
        { label: 'Strategie business', value: 'strategy' },
        { label: 'Conseil & accompagnement', value: 'consulting' },
        { label: 'Developpement sur mesure', value: 'development' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
