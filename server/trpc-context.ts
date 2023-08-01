import { db, Schema } from '@db/db.js'
import { inferAsyncReturnType } from '@trpc/server'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export function createContext(options: CreateFastifyContextOptions) {
  const { req, res } = options
  return { request: req, reply: res, db, Schema, user: req.user }
}

export type TrpcContext = inferAsyncReturnType<typeof createContext>
