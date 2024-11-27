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
  const a = await signIn('credentials', {
    redirect: false,
    email: formData.email,
    password: formData.password,
  })
  console.log('a')
  console.log(a)
  return a
}
