import type { CollectionConfig } from 'payload'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  labels: {
    singular: 'Transaction',
    plural: 'Transactions',
  },
  admin: {
    useAsTitle: 'description',
    group: 'Finance',
    description: 'Track income, expenses, and transfers between accounts.',
    defaultColumns: ['date', 'type', 'description', 'amount', 'account'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.type === 'transfer' && data.fromAmount && data.toAmount && data.toAmount > 0) {
          data.effectiveRate = Math.round((data.fromAmount / data.toAmount) * 10000) / 10000
        } else {
          data.effectiveRate = null
        }
        return data
      },
    ],
  },
  fields: [
    // ── Core ──
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
        { label: 'Transfer', value: 'transfer' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Vercel Pro subscription", "Client payment - Demarus"',
      },
    },

    // ── Income / Expense fields ──
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Transaction amount in the account currency',
        condition: (data) => data?.type !== 'transfer',
      },
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
      required: true,
      admin: {
        description: 'Account for this transaction',
        condition: (data) => data?.type !== 'transfer',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'transaction-categories',
      admin: {
        description: 'Transaction category',
        condition: (data) => data?.type !== 'transfer',
      },
    },

    // ── Transfer fields ──
    {
      name: 'fromAccount',
      type: 'relationship',
      relationTo: 'accounts',
      admin: {
        description: 'Source account',
        condition: (data) => data?.type === 'transfer',
      },
    },
    {
      name: 'fromAmount',
      type: 'number',
      admin: {
        description: 'Amount leaving source account',
        condition: (data) => data?.type === 'transfer',
      },
    },
    {
      name: 'toAccount',
      type: 'relationship',
      relationTo: 'accounts',
      admin: {
        description: 'Destination account',
        condition: (data) => data?.type === 'transfer',
      },
    },
    {
      name: 'toAmount',
      type: 'number',
      admin: {
        description: 'Amount arriving at destination account',
        condition: (data) => data?.type === 'transfer',
      },
    },
    {
      name: 'effectiveRate',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Auto-calculated exchange rate (fromAmount / toAmount)',
        condition: (data) => data?.type === 'transfer',
      },
    },

    // ── Extra ──
    {
      name: 'receipt',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional receipt or proof of transaction',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
