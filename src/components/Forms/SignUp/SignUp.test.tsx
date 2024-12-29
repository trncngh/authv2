import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import SignUp from './SignUp'

describe('SignUp Component', () => {
  const signUpAction = vi.fn()
  afterEach(cleanup)
  test('should render the SignUp component', () => {
    render(<SignUp signUpAction={signUpAction} />)
    expect(screen.getByText('SignUp')).toBeInTheDocument()
  })
})
