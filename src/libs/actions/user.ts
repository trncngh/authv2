'use server'
import { prisma } from '@/libs/prisma'
import { prismaError } from '@/libs/utils/errorHandlers'

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        id: true,
      },
    })

    return users
  } catch (error) {
    prismaError(error, 'Failed to get users')
    return []
  }
}

export const deleteUser = async (id: string) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    })
    return deleteUser
  } catch (error) {
    prismaError(error, 'Failed to delete user')
    return undefined
  }
}
