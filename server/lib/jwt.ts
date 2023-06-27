import { env } from '../env.js'
import * as FastJWT from 'fast-jwt'
import { z } from 'zod'

const tokenValidator = z.object({
  email: z.string(),
  id: z.string(),
})

const cookieSignerOptions = {
  key: env.JWT_SECRET,
  expiresIn: 7 * 24 * 60 * 60 * 1000, // one week
} as const

const createToken = (
  user: { id: string; email: string },
  options: Partial<FastJWT.SignerOptions> = cookieSignerOptions,
) => {
  const finalOptions = {
    ...cookieSignerOptions,
    ...options,
  }
  const signer = FastJWT.createSigner(finalOptions)
  const token = signer({ id: user.id, email: user.email })

  return token
}

const parseToken = (token: string) => {
  const verifyToken = FastJWT.createVerifier({
    key: env.JWT_SECRET,
  })

  const data = tokenValidator.parse(verifyToken(token))

  return data
}

export const JWT = {
  createToken,
  parseToken,
}
