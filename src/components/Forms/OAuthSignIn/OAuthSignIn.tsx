'use client'

import { Button } from '@nextui-org/button'
import { Chrome, Github } from 'lucide-react'

type TOAuthSignInProps = {
  provider: 'github' | 'google'
  oAuthSignInAction: () => void
}

const OAuthSignIn = ({
  className = '',
  oAuthSignInAction,
  provider,
}: TOAuthSignInProps & { className?: string }) => {
  return (
    <Button onClick={oAuthSignInAction} className={`${className} capitalize`}>
      {provider === 'github' ? <Github /> : <Chrome />}
      {provider}
    </Button>
  )
  //   return <div className={`${className}`}>OAuthSignIn</div>
}

export default OAuthSignIn
