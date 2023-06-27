import { env } from '../env.js'
import crypto from 'crypto'

const ENCRYPTION_METHOD = 'aes-256-cbc'

const key = crypto
  .createHash('sha512')
  .update(env.SECRET_KEY)
  .digest('hex')
  .substring(0, 32)
const encryptionIV = crypto
  .createHash('sha512')
  .update(env.SECRET_IV)
  .digest('hex')
  .substring(0, 16)

function encryptData(data: string) {
  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
  ).toString('base64') // Encrypts data and converts to hex and base64
}

function decryptData(encryptedData: string) {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  )
}
export const Encryption = {
  encryptData,
  decryptData,
}
