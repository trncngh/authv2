'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpSchema, TSignUpSchema } from './SignUp.zod'

type TSignUpProps = {
  signUpAction: (
    currentState: { success: boolean; error: boolean; message: string },
    formData: TSignUpSchema
  ) => Promise<{
    success: boolean
    error: boolean
    message: string
  }>
}

const SignUp = ({
  className = '',
  signUpAction,
}: TSignUpProps & { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  })
  const [state, formAction, isPending] = useActionState(signUpAction, {
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
    <form onSubmit={formSubmit} className={`${className} flex flex-col gap-2`}>
      <Input
        label="Email"
        type="email"
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <Input
        label="ConfirmPassword"
        type="password"
        {...register('confirmPassword')}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
      />
      <Button type="submit" disabled={isPending}>
        Sign Up
      </Button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}

export default SignUp
