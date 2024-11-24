import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Header from './Header'

describe('Header Component', () => {
  const handleClose = vi.fn()
  afterEach(cleanup)
  test('should render the Header component', () => {
    render(<Header />)
    expect(screen.getByText('LOGO')).toBeInTheDocument
  })
})
