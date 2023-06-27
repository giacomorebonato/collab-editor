import { createServer } from '../create-server.js'

export type FastifyApp = Pick<
  Awaited<ReturnType<typeof createServer>>,
  'app'
>['app']
