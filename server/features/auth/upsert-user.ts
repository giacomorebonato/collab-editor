import { eq } from 'drizzle-orm'
import Crypto from 'node:crypto'
import { db } from '../../db/db.js'
import { users } from '../../db/schema.js'

export const upsertUser = async ({ email }: { email: string }) => {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get()
  let userId: string

  if (!existingUser) {
    userId = Crypto.randomUUID()

    await db
      .insert(users)
      .values({
        id: userId,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .run()
  } else {
    userId = existingUser.id
  }

  return { userId }
}
