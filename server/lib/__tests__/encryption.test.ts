import { Encryption } from '../encryption'
import { expect, test } from 'vitest'

test('Encryption correctly encrypts and decrypts', () => {
  const encrypted = Encryption.encryptData('salame')

  expect(Encryption.decryptData(encrypted)).toEqual('salame')
})
