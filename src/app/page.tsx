import SignUp from '@/components/Forms/SignUp/SignUp'
import Users from '@/components/Tables/Users/Users'
import { deleteUser, getUsers, signUp } from '@/libs/actions/user'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'

export default async function Home() {
  const users = await getUsers()
  const handleDeleteUser = async (id: string) => {
    'use server'
    await deleteUser(id)
    revalidatePath('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex w-full gap-4 sm:items-start">
        <div className="w-2/5 bg-slate-300">
          <Users users={users} handleDeleteUser={handleDeleteUser} />
        </div>
        <div className="h-screen w-3/5 rounded-md bg-slate-400 p-2">
          <SignUp signUpAction={signUp} />
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
