import { FastifyInstance } from 'fastify'
import { env } from '../env.js'
import { getUserFromRequest } from '../lib/get-user-from-request.js'

export const authApi = (
  app: FastifyInstance,
  _options: any,
  done: () => void,
) => {
  app.post('/logout', (_request, reply) => {
    reply.clearCookie('token', {
      path: '/',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
    })

    reply.send({ status: 'success' })
  })
  app.get('/users/me', (request, reply) => {
    const user = getUserFromRequest(request)

    reply.send({ user })
  })

  done()
}
