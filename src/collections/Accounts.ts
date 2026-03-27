import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  labels: {
    singular: 'Account',
    plural: 'Accounts',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Finance',
    description: 'Bank accounts, crypto wallets, and e-wallets.',
    defaultColumns: ['name', 'type', 'currency', 'tracksTVA'],
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
        description: 'e.g. "Attijari", "Wise", "Binance"',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Bank', value: 'bank' },
            { label: 'Crypto', value: 'crypto' },
            { label: 'E-wallet', value: 'ewallet' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'currency',
          type: 'select',
          required: true,
          options: [
            { label: 'MAD', value: 'MAD' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'USDT', value: 'USDT' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'tracksTVA',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tracks TVA',
      admin: {
        position: 'sidebar',
        description: 'Enable for accounts that track TVA (e.g. Attijari)',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Any notes about this account',
      },
    },
  ],
}
