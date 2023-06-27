import { sql, type InferModel } from 'drizzle-orm'
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const files = sqliteTable('files', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: blob('content'),
  published: integer('completed').default(0),
  createdAt: integer('created_at', {
    mode: 'timestamp',
  })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  updatedAt: integer('updated_at', {
    mode: 'timestamp',
  })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
})

export const insertFileSchema = createInsertSchema(files)
export const selectFileSchema = createSelectSchema(files)

export type File = InferModel<typeof files>
