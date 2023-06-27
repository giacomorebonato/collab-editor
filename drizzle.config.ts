import type { Config } from 'drizzle-kit'

export default {
  out: './server/migrations',
  schema: './server/db/schema.ts',
  breakpoints: true,
} satisfies Config
