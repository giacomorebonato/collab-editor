import dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.preprocess(Number, z.number()),
  SITE_URL: z.string(),
})

export const env = envSchema.parse(process.env)

export const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',

      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
} as const
