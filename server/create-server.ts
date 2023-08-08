import fastifyPassport from '@fastify/passport'
import { authPlugin } from '@features/auth/auth-plugin.js'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import appRootPath from 'app-root-path'
import Fastify from 'fastify'
import Fs from 'node:fs'
import Path from 'node:path'
import { editorApi } from './api/editor-api.js'
import { env, envToLogger } from './env.js'
import { trpcAppRouter } from './trpc-app-router.js'
import { createContext } from './trpc-context.js'

// const inference = new HfInference(process.env.HF_ACCESS_TOKEN)
// const inputs =
//   'Paris is the capital and most populous city of France, with an estimated population of 2,175,601 residents as of 2018, in an area of more than 105 square kilometres (41 square miles). The City of Paris is the centre and seat of government of the region and province of Île-de-France, or Paris Region, which has an estimated population of 12,174,880, or about 18 percent of the population of France as of 2017.'
export async function createServer() {
  const app = Fastify({
    maxParamLength: 5_000,
    logger: envToLogger[env.NODE_ENV] ?? true,
  })

  await app
    .register(import('@fastify/secure-session'), {
      cookie: {
        path: '/',
      },
      key: Fs.readFileSync(Path.join(appRootPath.path, 'secret-key')),
    })
    .register(import('@fastify/sensible'))
    .register(import('@fastify/websocket'), {
      connectionOptions: {
        readableObjectMode: true,
      },
    })
    .register(authPlugin)
    .register(fastifyTRPCPlugin, {
      prefix: '/trpc',
      trpcOptions: { router: trpcAppRouter, createContext },
    })
    .register(editorApi, { prefix: '/api' })
    .register(import('fastify-vite-plugin'), {
      enableSSR: true,
    })

  fastifyPassport.registerUserDeserializer(async (user) => {
    return user
  })
  fastifyPassport.registerUserSerializer(async (user) => {
    return user
  })

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
