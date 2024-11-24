'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema, TLoginSchema } from './Login.zod'

type TLoginProps = {
  loginAction: (
    currentState: { success: boolean; error: boolean; message: string },
    formData: TLoginSchema
  ) => Promise<{
    success: boolean
    error: boolean
    message: string
  }>
}

const Login = ({
  className = '',
  loginAction,
}: TLoginProps & { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  })

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    error: false,
    message: '',
  })

  const formSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(formData)
    })
  })

  return (
    <form
      // action=""
      onSubmit={formSubmit}
      className={`${className} `}
    >
      <div className="flex items-center justify-center gap-2">
        <Input
          type="Email"
          label="Email"
          {...register('email')}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          type="text"
          label="Password"
          {...register('password')}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </div>
      {state.success && <p className="text-green-500">{state.message}</p>}
    </form>
  )
}

export default Login
