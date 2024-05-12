import { defineConfig } from 'drizzle-kit'

import { env } from '@/utils'

export default defineConfig({
	schema: './src/server/db/schema.ts',
	strict: true,
	verbose: true,
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	tablesFilter: ['streetwhere_*'],
})
