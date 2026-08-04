// HR attestations verifiable via the QR code printed on each document.
// Keyed by verification token (UUID embedded in the document's QR code).
// Attestations are rare enough that a static record beats a Payload
// collection; move to a collection if issuance becomes frequent.

export type AttestationRecord = {
  number: string
  employeeName: string
  cin: string
  cnss: string
  position: string
  issueDate: string // ISO date (YYYY-MM-DD)
  city: string
}

export const attestations: Record<string, AttestationRecord> = {
  '10443d39-8e73-48f5-acf6-1489bec0e334': {
    number: 'ATT-2026-0001',
    employeeName: 'Aymane AIT MALEK',
    cin: 'BK687402',
    cnss: '139087260',
    position: "Consultant en Gouvernance de l'Intelligence Artificielle",
    issueDate: '2026-08-04',
    city: 'Casablanca',
  },
}
