import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import UserInfo from './UserInfo'

describe('UserInfo Component', () => {
  const signOutAction = vi.fn()
  afterEach(cleanup)
  test('should render the UserInfo component', () => {
    render(
      <UserInfo
        email="Examle@gmail.com"
        userRole="admin"
        signOutAction={signOutAction}
      />
    )
    expect(screen.getByText(/Examle/i)).toBeInTheDocument()
    expect(screen.getByText(/admin/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument()
  })

  test('should call signOutAction when Sign Out button is clicked', () => {
    render(
      <UserInfo
        email="Examle@gmail.com"
        userRole="admin"
        signOutAction={signOutAction}
      />
    )
    const button = screen.getByText('Sign Out')
    fireEvent.click(button)
    expect(signOutAction).toHaveBeenCalledTimes(1)
  })
})
