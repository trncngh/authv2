import { SignInSchema } from '@/components/Forms/SignIn/SignIn.zod'
import { createSession } from '@/libs/auth/session'
import { prisma } from '@/libs/prisma'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  //   adapter: PrismaAdapter(prisma),
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
        try {
          const validateData = SignInSchema.safeParse({
            email: credentials.email as string,
            password: credentials.password as string,
          })
          console.log(credentials)
          if (!validateData.success) {
            throw new Error('Invalid data')
          }
          user = await prisma.user.findUnique({
            where: {
              email: validateData.data.email,
            },
            include: {
              credential: true,
            },
          })

          if (!user || !user.credential) {
            throw new Error('User not found')
          }

          const isPasswordMatch = await bcrypt.compare(
            validateData.data.password,
            user.credential.hashedPassword
          )

          if (!isPasswordMatch) {
            throw new Error('Password not match')
          }
          await createSession(user.id)
          console.log(user)
          return user
        } catch (error) {
          console.error(error)
        }
        return user
      },
    }),
  ],
})
