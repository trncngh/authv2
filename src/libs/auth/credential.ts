'use server'
import {
  SignInSchema,
  TSignInSchema,
} from '@/components/Forms/SignIn/SignIn.zod'
import {
  SignUpSchema,
  TSignUpSchema,
} from '@/components/Forms/SignUp/SignUp.zod'
import { TUser } from '@/components/Tables/Users/Users'
import { createSession, deleteSession } from '@/libs/auth/session'
import { TStatusState } from '@/libs/common.type'
import { prisma } from '@/libs/prisma'
import { saltAndHash } from '@/libs/utils/auth'
import { prismaError } from '@/libs/utils/errorHandlers'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'

export const signUp = async (
  currentState: TStatusState,
  formData: TSignUpSchema
): Promise<TStatusState> => {
  try {
    const validateData = SignUpSchema.parse(formData)
    const { passwordSalt, hashedPassword } = await saltAndHash(
      validateData.password
    )
    await prisma.user.create({
      data: {
        email: validateData.email,
        credential: {
          create: {
            email: validateData.email,
            hashedPassword: hashedPassword,
            passwordSalt: passwordSalt,
          },
        },
      },
    })
    revalidatePath('/')
    return {
      status: 'success',
      message: `${validateData.email} created`,
    }
  } catch (error) {
    return {
      status: 'error',
      message: prismaError(error, 'Email is already exist'),
    }
  }
}

export const signIn = async (
  currentState: TStatusState,
  formData: TSignInSchema
): Promise<TStatusState & { user: TUser | null }> => {
  try {
    const validateData = SignInSchema.safeParse(formData)
    if (!validateData.success) {
      return {
        status: 'error',
        message: 'Validation failed',
        user: null,
      }
    }
    const user = await prisma.user.findUnique({
      where: {
        email: validateData.data.email,
      },
      include: {
        credential: true,
        role: true,
      },
    })
    if (!user || !user.credential) {
      return {
        status: 'error',
        message: 'User not found',
        user: null,
      }
    }
    const isPasswordMatch = await bcrypt.compare(
      validateData.data.password,
      user.credential.hashedPassword
    )
    if (!isPasswordMatch || !user || !user.credential) {
      return {
        status: 'error',
        message: 'Invalid credential',
        user: null,
      }
    }
    await createSession(user.id, user.email, user.role?.name)
    return {
      status: 'success',
      message: 'Login success',
      user,
    }
  } catch (error) {
    prismaError(error, 'Error during sign in')
    return {
      status: 'error',
      message: prismaError(error, 'Error during sign in'),
      user: null,
    }
  }
}

export const signOut = async () => {
  await deleteSession()
  revalidatePath('/')
}
