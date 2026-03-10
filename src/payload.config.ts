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
import { Projects } from './collections/Projects'
import { Team } from './collections/Team'
import { Clients } from './collections/Clients'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Pages,
    Insights,
    Industries,
    Capabilities,
    Projects,
    Team,
    Clients,
    ContactSubmissions,
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
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  sharp,
})
