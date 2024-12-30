import { createUser, getUserByEmail } from '@/libs/controllers/user'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
  interface User {
    success?: boolean
    message?: string
    error?: boolean // Or a more specific type
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
        // console.log(credentials)
        return {
          error: true,
          success: false,
          message: 'An error occurred',
          user: {
            email: 'ehehe',
          },
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email) {
        const dbUser = await getUserByEmail(user.email)
        !dbUser && createUser(user.email)
      }
      return true
    },
  },
})
