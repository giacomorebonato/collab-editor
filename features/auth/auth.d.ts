import type { SessionUser } from './upsert-user-query.js'

declare module 'fastify' {
  interface FastifyInstance {
    user?: SessionUser
  }

  interface PassportUser extends SessionUser {}
}
