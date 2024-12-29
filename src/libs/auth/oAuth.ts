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
  debug: true,
  // adapter: PrismaAdapter(prisma),
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
        // try {
        //   const validateData = SignInSchema.safeParse({
        //     email: credentials.email,
        //     password: credentials.password,
        //   })

        //   if (!validateData.success) {
        //     return {
        //       error: true,
        //       success: false,
        //       message: 'Validation failed',
        //       user,
        //     }
        //   }
        //   user = await prisma.user.findUnique({
        //     where: {
        //       email: validateData.data.email,
        //     },
        //     include: {
        //       credential: true,
        //     },
        //   })

        //   if (!user || !user.credential) {
        //     return {
        //       error: true,
        //       success: false,
        //       message: 'user not found',
        //       user,
        //     }
        //   }

        //   const isPasswordMatch = await bcrypt.compare(
        //     validateData.data.password,
        //     user.credential.hashedPassword
        //   )

        //   if (!isPasswordMatch) {
        //     return {
        //       error: true,
        //       success: false,
        //       message: 'password not match',
        //       user,
        //     }
        //   }
        //   await createSession(user.id)
        //   return {
        //     error: false,
        //     success: true,
        //     message: 'login success',
        //     user,
        //   }
        // } catch (error) {
        //   console.error(error)
        //   return {
        //     error: true,
        //     success: false,
        //     message: 'An error occurred',
        //     user,
        //   }
        // }
      },
    }),
  ],
})
