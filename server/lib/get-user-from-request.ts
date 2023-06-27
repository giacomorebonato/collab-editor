import { env } from '../env.js'
import { Encryption } from './encryption.js'
import { createVerifier } from 'fast-jwt'
import { FastifyRequest } from 'fastify'

export const getUserFromRequest = (request: FastifyRequest) => {
  const token = request.cookies.token

  let user: null | User = null

  if (token !== undefined) {
    const verifyToken = createVerifier({
      key: env.JWT_SECRET,
    })

    try {
      user = verifyToken(Encryption.decryptData(token))
    } catch (error) {
      console.error(error)
    }
  }

  return user
}
