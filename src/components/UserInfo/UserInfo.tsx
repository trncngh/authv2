import { Button } from '@nextui-org/button'

export type TUserInfoProps = {
  userEmail: string
  userRole: 'admin' | 'user'
  signOutAction?: () => void
}

const UserInfo = ({
  className = '',
  userEmail,
  userRole: role,
  signOutAction,
}: TUserInfoProps & { className?: string }) => {
  return (
    <div className={`${className} flex`}>
      <div className="w-3/4">
        <h2>Email: {userEmail}</h2>
        <h2>
          Role: <span className="capitalize"> {role}</span>
        </h2>
      </div>
      <div className="w-1/4">
        <Button onClick={signOutAction}>Sign Out</Button>
      </div>
    </div>
  )
}

export default UserInfo
