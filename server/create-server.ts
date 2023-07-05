import Fastify, { FastifyRequest } from 'fastify'
import { editorApi } from './api/editor-api.js'
import { env, envToLogger } from './env.js'

export async function createServer() {
  const app = Fastify({
    maxParamLength: 5000,
    logger: envToLogger[env.NODE_ENV] ?? true,
  })

  await app
    .register(import('fastify-print-routes'))
    .register(import('@fastify/sensible'))
    .register(import('@fastify/csrf-protection'), {
      getToken: function (request: FastifyRequest) {
        return request.headers['csrf-token']
      },
    } as any)
    .register(import('@fastify/cookie'))
    .register(import('@fastify/websocket'), {
      connectionOptions: {
        readableObjectMode: true,
      },
    })
    .register(editorApi, { prefix: '/api' })
    .register(import('fastify-vite-plugin'))

  const start = async () => {
    try {
      await app.listen({
        port: env.PORT,
        host: env.NODE_ENV === 'development' ? '0.0.0.0' : undefined,
      })

      app.log.info(`🚀 Server running at http://localhost:${env.PORT}`)
    } catch (error) {
      app.log.error(error)
      process.exit(1)
    }
  }

  return {
    app,
    start,
    stop: () => app.close(),
  }
}
