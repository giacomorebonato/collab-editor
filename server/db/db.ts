import { createClient } from '@libsql/client'
import appRoot from 'app-root-path'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import * as Path from 'node:path'
import { env } from '../env.js'

export const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(client)

try {
  await migrate(db as any, {
    migrationsFolder: Path.join(appRoot.path, 'server', 'migrations'),
  })
} catch (error) {
  console.error('Migration failed')
  console.error(error)

  process.exit(1)
}
