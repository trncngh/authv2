import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Users from './Users'

describe('Users Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the Users component', () => {
        render(<Users />)
        expect(screen.getByText('Users')).toBeInTheDocument()
    })
})