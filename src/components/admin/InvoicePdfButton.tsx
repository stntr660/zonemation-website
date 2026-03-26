'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { FileDown } from 'lucide-react'

export default function InvoicePdfButton() {
  const { id } = useDocumentInfo()

  if (!id) return null

  return (
    <div style={{ marginBottom: 16 }}>
      <a
        href={`/fr/invoice/pdf/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '10px 16px',
          backgroundColor: '#a7d26d',
          color: '#0C130B',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#95c255'
          e.currentTarget.style.boxShadow = '0 0 20px rgba(167,210,109,0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#a7d26d'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <FileDown size={16} strokeWidth={2} />
        Download PDF
      </a>
    </div>
  )
}
