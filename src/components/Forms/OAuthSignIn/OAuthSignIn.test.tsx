import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import OAuthSignIn from './OAuthSignIn'

describe('OAuthSignIn Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the OAuthSignIn component', () => {
        render(<OAuthSignIn />)
        expect(screen.getByText('OAuthSignIn')).toBeInTheDocument()
    })
})