import { eq } from 'drizzle-orm'
import Crypto from 'node:crypto'
import { db, Schema } from '../../db/db.js'

export const upsertUser = async ({
  email,
  name,
  surname,
}: {
  email: string
  name: string
  surname: string
}) => {
  const user = await db
    .insert(Schema.users)
    .values({
      id: Crypto.randomUUID(),
      email,
      name,
      surname,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: Schema.users.email,
      set: {
        name,
        surname,
      },
      where: eq(Schema.users.email, email),
    })
    .returning({
      id: Schema.users.id,
      email: Schema.users.email,
      name: Schema.users.name,
      surname: Schema.users.surname,
    })
    .get()

  return user
}

export type SessionUser = Awaited<ReturnType<typeof upsertUser>>
