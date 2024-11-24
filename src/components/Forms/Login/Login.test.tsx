import '@testing-library/jest-dom'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Login from './Login'

describe('Login Component', () => {
  const loginAction = vi
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ success: true, error: false, message: '' })
    )
  afterEach(cleanup)

  test('should render the Login component', () => {
    render(<Login loginAction={loginAction} />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
  test('should render email and password inputs', () => {
    render(<Login loginAction={loginAction} />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  test('should display error messages for invalid inputs', async () => {
    render(<Login loginAction={loginAction} />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: '' } })
      fireEvent.change(passwordInput, { target: { value: '' } })
      fireEvent.click(submitButton)
    })

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  test('should call loginAction with form data on submit', async () => {
    render(<Login loginAction={loginAction} />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)
    })

    expect(loginAction).toHaveBeenCalledWith(
      { success: false, error: false, message: '' },
      { email: 'test@example.com', password: 'password123' }
    )
  })

  test('should display success message on successful login', async () => {
    loginAction.mockResolvedValueOnce({
      success: true,
      error: false,
      message: 'Login successful',
    })
    render(<Login loginAction={loginAction} />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)
    })

    expect(await screen.findByText('Login successful')).toBeInTheDocument()
  })
})
