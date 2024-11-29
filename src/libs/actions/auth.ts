'use server'
import { TSignInSchema } from '@/components/Forms/SignIn/SignIn.zod'
import { signIn } from '@/libs/auth/oAuth'

export const googleSignIn = async () => {
  await signIn('google')
}
export const gitHubSignIn = async () => {
  await signIn('github')
}

export const signInAction = async (
  currentState: { success: boolean; error: boolean; message: string },
  formData: TSignInSchema
) => {
  return await signIn('credentials', {
    redirect: false,
    email: formData.email,
    password: formData.password,
  })
}
