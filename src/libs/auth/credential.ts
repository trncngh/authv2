'use server'
import {
  SignUpSchema,
  TSignUpSchema,
} from '@/components/Forms/SignUp/SignUp.zod'
import { prisma } from '@/libs/prisma'
import { saltAndHash } from '@/libs/utils/auth'
import { prismaError } from '@/libs/utils/errorHandlers'
import { revalidatePath } from 'next/cache'

type TBaseState = { success: boolean; error: boolean; message: string }

export const signUp = async (
  currentState: TBaseState,
  formData: TSignUpSchema
) => {
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
      success: true,
      error: false,
      message: `${validateData.email} created`,
    }
  } catch (error) {
    return {
      success: false,
      error: true,
      message: prismaError(error, 'Email is already exist'),
    }
  }
}
