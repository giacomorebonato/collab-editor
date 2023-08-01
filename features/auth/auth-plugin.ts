import fastifyPassport from '@fastify/passport'
import { FastifyInstance, PassportUser } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import GoogleStrategy from 'passport-google-oauth20'
import { env } from '../../server/env.js'
import { upsertUser } from './upsert-user-query.js'

export const authPlugin = fastifyPlugin(
  async (app: FastifyInstance) => {
    await app
      .register(fastifyPassport.initialize())
      .register(fastifyPassport.secureSession())
    const callbackURL = `${env.SITE_URL}/auth/google/callback`
    fastifyPassport.use(
      'google',
      new GoogleStrategy.Strategy(
        {
          clientID: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          callbackURL,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          cb: (error: any, user: PassportUser) => void,
        ) => {
          const user = await upsertUser({
            email: profile.emails[0].value,
            name: profile.name.givenName,
            surname: profile.name.familyName,
          })
          cb(undefined, user)
        },
      ),
    )

    app.get(
      '/auth/google/callback',
      {
        preValidation: fastifyPassport.authenticate('google', {
          scope: ['profile', 'email'],
        }),
      },
      async (request, reply) => {
        if (request.user) {
          console.log(request.user)
        }
        reply.redirect('/')
      },
    )

    app.get(
      '/auth/login/google',
      fastifyPassport.authenticate('google', { scope: ['profile', 'email'] }),
    )
  },
  {
    encapsulate: false,
  },
)
