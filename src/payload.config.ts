import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Insights } from './collections/Insights'
import { Industries } from './collections/Industries'
import { Capabilities } from './collections/Capabilities'
import { CaseStudies } from './collections/CaseStudies'
import { Team } from './collections/Team'
import { Clients } from './collections/Clients'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Invoices } from './collections/Invoices'
import { Accounts } from './collections/Accounts'
import { TransactionCategories } from './collections/TransactionCategories'
import { Transactions } from './collections/Transactions'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'dark',
    meta: {
      titleSuffix: ' - Zonemation',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
      afterNavLinks: ['/components/admin/NavIcons'],
    },
  },

  collections: [
    // Content
    Pages,
    CaseStudies,
    Insights,
    // People
    Team,
    Clients,
    // Taxonomy
    Industries,
    Capabilities,
    // Operations
    Invoices,
    ContactSubmissions,
    // Finance
    Accounts,
    TransactionCategories,
    Transactions,
    // System
    Users,
    Media,
  ],

  globals: [
    SiteSettings,
    Navigation,
    Homepage,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'zonemation-secret-change-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    push: process.env.NODE_ENV !== 'production',
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  sharp,
})
