import type { CollectionConfig } from 'payload'

export const TransactionCategories: CollectionConfig = {
  slug: 'transaction-categories',
  labels: {
    singular: 'Category',
    plural: 'Transaction Categories',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Finance',
    description: 'Categories for income and expense transactions.',
    defaultColumns: ['name', 'type'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Hosting", "Client Project", "Freelancers"',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
      ],
      admin: {
        description: 'Whether this category applies to income or expense transactions',
      },
    },
  ],
}
