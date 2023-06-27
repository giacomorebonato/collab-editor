import { env } from '../env.js'
import appRoot from 'app-root-path'
import { FastifyInstance } from 'fastify'
import Fs from 'node:fs/promises'
import Path from 'node:path'
import { ViteDevServer } from 'vite'

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

    await app.register(import('@fastify/static'), {
      root,
      prefix: '/assets/',
    })
    app.get('*', async (request, reply) => {
      const token = reply.generateCsrf()
      const template = htmlFile.replace('<!--csrf-token-->', token)

      reply.type('text/html').send(template)
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
