import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import SignUp from './SignUp'

describe('SignUp Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the SignUp component', () => {
        render(<SignUp />)
        expect(screen.getByText('SignUp')).toBeInTheDocument()
    })
})