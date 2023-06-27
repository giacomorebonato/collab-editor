import oauthPlugin from '@fastify/oauth2'
import { createDecoder } from 'fast-jwt'
import { FastifyInstance } from 'fastify'
import { env } from '../env.js'
import { upsertUser } from '../features/auth/upsert-user.js'
import { Encryption } from '../lib/encryption.js'
import { JWT } from '../lib/jwt.js'

export const googleAuth = (
  app: FastifyInstance,
  _options: any,
  done: () => void,
) => {
  app.register(oauthPlugin, {
    scope: ['email'],
    name: 'googleOAuth2',
    credentials: {
      client: {
        id: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/login/google',
    callbackUri: `${env.SITE_URL}/google/callback`,
  })

  app.get('/google/callback', async (request, reply) => {
    const { token: googleToken } =
      await request.server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        {
          ...request,
          query: request.query,
        },
      )

    const idToken: string = (googleToken as any).id_token
    const decode = createDecoder()
    const payload = decode(idToken)
    const { userId } = await upsertUser({ email: payload.email })

    const token = JWT.createToken({
      email: payload.email,
      id: userId,
    })

    const encryptedToken = Encryption.encryptData(token)

    reply.setCookie('token', encryptedToken, {
      path: '/',
      secure: env.NODE_ENV !== 'development',
      httpOnly: true,
      // sameSite: env.NODE_ENV === 'development' ? 'lax' : 'strict',
    })

    reply.redirect('/')
  })

  done()
}
