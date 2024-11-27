import { TSignInSchema } from '@/components/Forms/SignIn/SignIn.zod'
import Link from 'next/link'
import OAuthSignIn from '../Forms/OAuthSignIn/OAuthSignIn'
import SignIn from '../Forms/SignIn/SignIn'

type THeaderProps = {
  signInAction: (
    currentState: { success: boolean; error: boolean; message: string },
    formData: TSignInSchema
  ) => Promise<{
    success: boolean
    error: boolean
    message: string
  }>
  gitHubSignIn: () => void
  googleSignIn: () => void
}

const Header = ({
  className = '',
  signInAction,
  gitHubSignIn,
  googleSignIn,
}: THeaderProps & { className?: string }) => {
  return (
    <header
      className={`${className} space flex h-20 w-full items-center justify-between rounded-sm bg-slate-500 p-5`}
    >
      <Link href="/">LOGO</Link>
      <SignIn signInAction={signInAction} />
      <OAuthSignIn provider="github" oAuthSignInAction={gitHubSignIn} />
      <OAuthSignIn provider="google" oAuthSignInAction={googleSignIn} />
    </header>
  )
}

export default Header
