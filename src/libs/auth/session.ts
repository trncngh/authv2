import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

const ENCODED_SESSION_KEY = new TextEncoder().encode('secretKey')

type TSession = {
  userId: string
  expiresAt: Date
}

const expiresTime = 10_000
export const createSession = async (userId: string) => {
  const cookieStore = await cookies()
  // const expiresTime = 1000 * 60 * 60 * 24 * 7
  const expiresAt = new Date(Date.now() + expiresTime)
  const session = await encryptSession({ userId, expiresAt })
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  })
}

export const encryptSession = async (session: TSession) => {
  return new SignJWT(session)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1min')
    .sign(ENCODED_SESSION_KEY)
}

export const decryptSession = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, ENCODED_SESSION_KEY, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    // console.error(`Failed to verify session: ${error}`)
  }
}
