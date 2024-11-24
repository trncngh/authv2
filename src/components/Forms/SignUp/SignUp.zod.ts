import { z } from 'zod'

export const SignUpSchema = z
  .object({
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  })

export type TSignUpSchema = z.infer<typeof SignUpSchema>
