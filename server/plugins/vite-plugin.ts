import appRoot from 'app-root-path'
import { FastifyInstance } from 'fastify'
import Fs from 'node:fs/promises'
import Path from 'node:path'
import { ViteDevServer } from 'vite'
import { env } from '../env.js'

const htmlFilePath =
  env.NODE_ENV === 'production'
    ? Path.join(appRoot.path, 'dist', 'index.html')
    : Path.join(appRoot.path, 'index.html')
const htmlFile = await Fs.readFile(htmlFilePath, 'utf-8')

export const vitePlugin = async (
  app: FastifyInstance,
  _options: any,
  done: () => void,
) => {
  let vite: ViteDevServer

  if (env.NODE_ENV === 'production') {
    const root = Path.join(appRoot.path, 'dist', 'assets')
    const distRoot = Path.join(appRoot.path, 'dist')

    app.get('/index.html', (request, reply) => {
      reply.type('text/html').send(htmlFile)
    })

    app.get('/manifest*', (request, reply) => {
      const urlParts = request.url.split('/')
      const lastPart = urlParts[1]

      reply.sendFile(lastPart, distRoot)
    })

    app.get('/sw*', (request, reply) => {
      const urlParts = request.url.split('/')
      const lastPart = urlParts[1]

      reply.sendFile(lastPart, distRoot)
    })

    app.get('/workbox-*', (request, reply) => {
      const urlParts = request.url.split('/')
      const lastPart = urlParts[1]

      reply.sendFile(lastPart, distRoot)
    })

    await app.register(import('@fastify/static'), {
      root,
      prefix: '/assets/',
    })

    app.get('*', async (request, reply) => {
      reply.type('text/html').send(htmlFile)
    })
  } else {
    await app.register(import('@fastify/express'))
    const { createServer: createViteServer } = await import('vite')

    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)

    app.get('*', async (request, reply) => {
      const token = reply.generateCsrf()
      const template = htmlFile.replace('<!--csrf-token-->', token)
      const transformed = await vite.transformIndexHtml(request.url, template)

      reply.type('text/html').send(transformed)
    })
  }

  app.addHook('onClose', async () => {
    await vite?.close()
  })

  done()
}
