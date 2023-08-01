import { TrpcAppRouter } from '@server/trpc-app-router.js'
import { createTRPCReact } from '@trpc/react-query'

export const TrpcClient = createTRPCReact<TrpcAppRouter>()
