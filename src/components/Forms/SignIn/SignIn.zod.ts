import { z } from 'zod'

export const SignInSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export type TSignInSchema = z.infer<typeof SignInSchema>
