'use server'
import { prisma } from '@/libs/prisma'
import { prismaError } from '@/libs/utils/errorHandlers'

export const createUser = async (email: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
      },
    })
    return user
  } catch (error) {
    prismaError(error, 'Failed to create user')
    return undefined
  }
}

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

export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
        email: true,
      },
    })
    return user
  } catch (error) {
    prismaError(error, 'Failed to get user')
    return undefined
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    prismaError(error, 'Failed to get user')
    return undefined
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
