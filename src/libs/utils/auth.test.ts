import bcrypt from 'bcrypt'
import { describe, expect, it } from 'vitest'
import { saltAndHash } from './auth'

describe('saltAndHash', () => {
  it('should return an object with passwordSalt and hashedPassword', async () => {
    const password = 'testPassword'
    const result = await saltAndHash(password)

    expect(result).toHaveProperty('passwordSalt')
    expect(result).toHaveProperty('hashedPassword')
  })

  it('should generate a different salt each time', async () => {
    const password = 'testPassword'
    const result1 = await saltAndHash(password)
    const result2 = await saltAndHash(password)

    expect(result1.passwordSalt).not.toBe(result2.passwordSalt)
  })

  it('should hash the password correctly', async () => {
    const password = 'testPassword'
    const { passwordSalt, hashedPassword } = await saltAndHash(password)

    const isMatch = await bcrypt.compare(password, hashedPassword)
    expect(isMatch).toBe(true)
  })
})
