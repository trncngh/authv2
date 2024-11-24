import { Prisma } from '@prisma/client'

export const prismaError = (error: unknown, message: string) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error.code)
    console.error(error.message)
  }
  return message
}
