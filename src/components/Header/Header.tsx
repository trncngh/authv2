import Login from '../Forms/Login/Login'

type THeaderProps = {}

const Header = ({ className = '' }: THeaderProps & { className?: string }) => {
  return (
    <header
      className={`${className} space flex h-20 w-full items-center justify-between rounded-sm bg-slate-500 p-5`}
    >
      <span>LOGO</span>
      <Login />
    </header>
  )
}

export default Header
