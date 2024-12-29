import { decryptSession } from '@/libs/auth/session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// specify routes that need to be protected
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/signin', '/register']

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname
  const isProtededRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  // decrypt the session cookies and check if the user is authenticated
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value ?? ''

  const session = sessionCookie
    ? await decryptSession(sessionCookie)
    : undefined

  // console.log(session)

  if (isProtededRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
  return NextResponse.next()
}

export default middleware
