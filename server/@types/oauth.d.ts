import { type OAuth2Namespace } from '@fastify/oauth2'

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace
  }
}

declare namespace fastifyOauth2 {
  interface Token {
    id_token: string
  }
}
