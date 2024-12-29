import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

const ENCODED_SESSION_KEY = new TextEncoder().encode('secretKey') //replace secretKey with your own secret key

type TSessionInfo = {
  userId: string
  userEmail: string
  userRole?: string
  expiresAt: Date
}

const expiresTime = 300000
export const createSession = async (
  userId: string,
  userEmail: string,
  userRole?: string
) => {
  const cookieStore = await cookies()
  // const expiresTime = 1000 * 60 * 60 * 24 * 7
  const expiresAt = new Date(Date.now() + expiresTime)

  const session = await encryptSession({
    userId,
    userEmail,
    userRole,
    expiresAt,
  })
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  })
}

export const encryptSession = async (sessionInfo: TSessionInfo) => {
  return new SignJWT(sessionInfo)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5mins')
    .sign(ENCODED_SESSION_KEY)
}

export const decryptSession = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, ENCODED_SESSION_KEY, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error(`Failed to verify session: ${error}`)
  }
}

export const getCurrentSession = async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value ?? ''

  const session = sessionCookie
    ? await decryptSession(sessionCookie)
    : undefined
  return session
}

export const deleteSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  console.log('Session deleted')
}
