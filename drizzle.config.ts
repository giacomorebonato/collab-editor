import type { Config } from 'drizzle-kit'

export default {
  out: './db/migrations',
  schema: './db/schema.ts',
  breakpoints: true,
} satisfies Config
