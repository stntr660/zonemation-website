import type { CollectionConfig } from 'payload'
import crypto from 'crypto'

export const Invoices: CollectionConfig = {
  slug: 'invoices',
  labels: {
    singular: 'Document',
    plural: 'Facturation',
  },
  admin: {
    useAsTitle: 'invoiceNumber',
    group: 'Operations',
    description: 'Devis et factures.',
    defaultColumns: ['invoiceNumber', 'stage', 'clientName', 'total', 'issueDate'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const year = new Date().getFullYear()
          const stage = data.stage || 'draft'
          const isDevis = stage.startsWith('devis')
          const prefix = isDevis ? `DEV-${year}-` : `INV-${year}-`
          const offset = isDevis ? 892 : 1437

          const { docs } = await req.payload.find({
            collection: 'invoices',
            where: { invoiceNumber: { like: `${prefix}%` } },
            sort: '-invoiceNumber',
            limit: 1,
          })

          let seq = offset
          if (docs.length > 0 && docs[0].invoiceNumber) {
            const lastNum = docs[0].invoiceNumber.split('-').pop()
            seq = (parseInt(lastNum || '0', 10) || 0) + 1
          }

          data.invoiceNumber = `${prefix}${String(seq).padStart(4, '0')}`
          data.verificationToken = crypto.randomUUID()
        }

        // Always sync sender from Site Settings
        try {
          const settings = await req.payload.findGlobal({ slug: 'site-settings' })
          const billing = (settings as any)?.billing
          if (billing) {
            data.senderName = billing.companyName || ''
            data.senderAddress = billing.address || ''
            data.senderCity = billing.city || ''
            data.senderEmail = billing.email || ''
            data.senderPhone = billing.phone || ''
            data.senderIce = billing.ice || ''
            data.bankDetails = [
              billing.bankName ? `Banque: ${billing.bankName}` : '',
              billing.rib ? `RIB: ${billing.rib}` : '',
              billing.iban ? `IBAN: ${billing.iban}` : '',
              billing.swift ? `SWIFT: ${billing.swift}` : '',
            ].filter(Boolean).join('\n')
          }
        } catch {
          // Settings not configured yet
        }

        // Always sync client fields from relationship
        const clientId = typeof data.client === 'string' ? data.client : data.client?.id
        if (clientId) {
          try {
            const clientDoc = await req.payload.findByID({
              collection: 'clients',
              id: clientId,
            })
            if (clientDoc) {
              data.clientName = (clientDoc as any).name || ''
              data.clientAddress = (clientDoc as any).address || ''
              data.clientCity = (clientDoc as any).city || ''
              data.clientEmail = (clientDoc as any).email || ''
              data.clientIce = (clientDoc as any).ice || ''
            }
          } catch {
            // Client not found
          }
        }

        // Compute totals
        if (data.items && Array.isArray(data.items)) {
          const subtotal = data.items.reduce(
            (sum: number, item: { quantity?: number; unitPrice?: number }) =>
              sum + (item.quantity || 0) * (item.unitPrice || 0),
            0,
          )
          const taxRate = data.taxRate ?? 20
          data.subtotal = Math.round(subtotal * 100) / 100
          data.taxAmount = Math.round(subtotal * (taxRate / 100) * 100) / 100
          data.total = Math.round((subtotal + data.taxAmount) * 100) / 100
        }

        return data
      },
    ],
  },
  fields: [
    // ── AI Assistant ──
    {
      name: 'aiAssistant',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/InvoiceAIAssistant',
        },
      },
    },
    // ── PDF Download Button ──
    {
      name: 'pdfDownload',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '/components/admin/InvoicePdfButton',
        },
      },
    },
    // ── Meta ──
    {
      name: 'invoiceNumber',
      type: 'text',
      label: 'Reference',
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: 'stage',
      type: 'select',
      label: 'Etape',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Devis envoye', value: 'devis_sent' },
        { label: 'Devis accepte', value: 'devis_accepted' },
        { label: 'Devis refuse', value: 'devis_rejected' },
        { label: 'Facture en attente', value: 'invoice_pending' },
        { label: 'Partiellement payee', value: 'partially_paid' },
        { label: 'Payee', value: 'paid' },
        { label: 'En retard', value: 'overdue' },
        { label: 'Annulee', value: 'cancelled' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'validityDays',
      type: 'number',
      defaultValue: 30,
      label: 'Validite devis (jours)',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.stage?.startsWith('devis'),
      },
    },
    {
      name: 'paidAmount',
      type: 'number',
      label: 'Montant paye',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.stage === 'partially_paid',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'issueDate', type: 'date', required: true, admin: { width: '33%' } },
        { name: 'dueDate', type: 'date', required: true, admin: { width: '33%' } },
        {
          name: 'currency',
          type: 'select',
          options: [
            { label: 'MAD', value: 'MAD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'USD', value: 'USD' },
            { label: 'GBP', value: 'GBP' },
          ],
          defaultValue: 'MAD',
          admin: { width: '33%' },
        },
      ],
    },

    // ── Client (relationship + overridable fields) ──
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      label: 'Select Client',
      admin: {
        description: 'Pick a client to auto-fill details below. Leave empty for manual entry.',
      },
    },
    // Client details -- hidden, auto-filled from relationship on save
    { name: 'clientName', type: 'text', admin: { hidden: true } },
    { name: 'clientAddress', type: 'text', admin: { hidden: true } },
    { name: 'clientCity', type: 'text', admin: { hidden: true } },
    { name: 'clientEmail', type: 'email', admin: { hidden: true } },
    { name: 'clientIce', type: 'text', admin: { hidden: true } },

    // Sender details -- hidden, auto-filled from Site Settings on save
    { name: 'senderName', type: 'text', admin: { hidden: true } },
    { name: 'senderAddress', type: 'text', admin: { hidden: true } },
    { name: 'senderCity', type: 'text', admin: { hidden: true } },
    { name: 'senderEmail', type: 'email', admin: { hidden: true } },
    { name: 'senderPhone', type: 'text', admin: { hidden: true } },
    { name: 'senderIce', type: 'text', admin: { hidden: true } },

    // ── Line Items ──
    {
      name: 'items',
      type: 'array',
      label: 'Prestations',
      fields: [
        { name: 'description', type: 'text', required: true },
        {
          type: 'row',
          fields: [
            { name: 'quantity', type: 'number', required: true, defaultValue: 1, admin: { width: '50%' } },
            { name: 'unitPrice', type: 'number', required: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
    {
      name: 'taxRate',
      type: 'number',
      defaultValue: 20,
      label: 'Taux TVA (%)',
      admin: { position: 'sidebar' },
    },

    // ── Computed ──
    {
      name: 'subtotal',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'taxAmount',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'total',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar' },
    },

    // ── Bank Details ──
    {
      name: 'bankDetails',
      type: 'textarea',
      label: 'Coordonnees bancaires',
      admin: { readOnly: true, description: 'Auto-rempli depuis Site Settings > Billing' },
    },

    // ── Notes & Signature ──
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'signatureData',
      type: 'text',
      label: 'Signature (base64)',
      admin: { hidden: true },
    },
    {
      name: 'verificationToken',
      type: 'text',
      unique: true,
      admin: { readOnly: true },
    },
  ],
}
