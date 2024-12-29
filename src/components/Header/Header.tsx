'use client'
import OAuthSignIn from '@/components/Forms/OAuthSignIn/OAuthSignIn'
import SignIn from '@/components/Forms/SignIn/SignIn'
import { TSignInSchema } from '@/components/Forms/SignIn/SignIn.zod'
import { TUser } from '@/components/Tables/Users/Users'
import UserInfo, { TUserInfoProps } from '@/components/UserInfo/UserInfo'
import { TStatusState } from '@/libs/common.type'
import Link from 'next/link'

type THeaderProps = {
  currentUser?: TUserInfoProps | null
  signInAction?: (
    currentState: TStatusState & { user: TUser | null },
    formData: TSignInSchema
  ) => Promise<TStatusState & { user: TUser | null }>
  gitHubSignIn?: () => void
  googleSignIn?: () => void
  signOut?: () => void
}

const Header = ({
  className = '',
  currentUser,
  signInAction,
  gitHubSignIn,
  googleSignIn,
  signOut,
}: THeaderProps & { className?: string }) => {
  return (
    <header
      className={`${className} space flex h-20 w-full items-center justify-between rounded-sm bg-slate-500 p-5`}
    >
      <Link href="/">LOGO</Link>
      {currentUser ? (
        <UserInfo {...currentUser} signOutAction={signOut} />
      ) : (
        <>
          {signInAction && <SignIn signInAction={signInAction} />}
          {gitHubSignIn && (
            <OAuthSignIn provider="github" oAuthSignInAction={gitHubSignIn} />
          )}
          {googleSignIn && (
            <OAuthSignIn provider="google" oAuthSignInAction={googleSignIn} />
          )}
        </>
      )}
    </header>
  )
}

export default Header
