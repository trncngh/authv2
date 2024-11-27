'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { SignInSchema, TSignInSchema } from './SignIn.zod'

type TSignInProps = {
  signInAction: (
    currentState: { success: boolean; error: boolean; message: string },
    formData: TSignInSchema
  ) => Promise<{
    success: boolean
    error: boolean
    message: string
    user: any
  }>
}

const SignIn = ({
  className = '',
  signInAction,
}: TSignInProps & { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
  })

  const [state, formAction, isPending] = useActionState(signInAction, {
    success: false,
    error: false,
    message: '',
    user: null,
  })

  const formSubmit = handleSubmit((formData) => {
    startTransition(() => {
      console.log(state)
      formAction(formData)
      console.log(state)
    })
  })

  return (
    <form onSubmit={formSubmit} className={`${className} `}>
      <div className="flex items-center justify-center gap-2">
        <Input
          type="Email"
          label="Email"
          {...register('email')}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          label="Password"
          {...register('password')}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Button type="submit" disabled={isPending}>
          SignIn
        </Button>
      </div>
      <p className="text-green-500">{state.message}</p>
    </form>
  )
}

export default SignIn
