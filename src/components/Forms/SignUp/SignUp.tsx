'use client'
import { TStatusState } from '@/libs/common.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpSchema, TSignUpSchema } from './SignUp.zod'

type TSignUpProps = {
  signUpAction: (
    currentState: TStatusState,
    formData: TSignUpSchema
  ) => Promise<TStatusState>
}

const SignUp = ({
  className = '',
  signUpAction,
}: TSignUpProps & { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  })
  const [state, formAction, isPending] = useActionState(signUpAction, {
    status: 'idle' as const,
    message: '',
  })

  const formSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(formData)
    })
  })

  useEffect(() => {
    if (state.status === 'success') {
      reset() // Reset the form fields
    }
  }, [state.status, reset])

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
      <div className="flex justify-between gap-2">
        <Button type="submit" className="w-full" disabled={isPending}>
          Sign Up
        </Button>
        <Button type="reset" className="w-full" disabled={isPending}>
          Reset
        </Button>
      </div>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}

export default SignUp
