import { authRouter } from '@features/auth/auth-router.js'
import { router } from './trpc-router.js'

export const trpcAppRouter = router({
  auth: authRouter,
})

export type TrpcAppRouter = typeof trpcAppRouter
