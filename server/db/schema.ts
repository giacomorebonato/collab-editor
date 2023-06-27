import { sql, type InferModel } from 'drizzle-orm'
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
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

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)

export type User = InferModel<typeof users>

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: blob('content'),
  authorId: text('author_id').references(() => users.id).notNull(),
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

export const insertArticleSchema = createInsertSchema(articles)
export const selectArticleSchema = createSelectSchema(articles)

export type Article = InferModel<typeof articles>
