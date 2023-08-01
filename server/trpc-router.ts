import { initTRPC } from '@trpc/server'
import { createContext } from './trpc-context.js'

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
