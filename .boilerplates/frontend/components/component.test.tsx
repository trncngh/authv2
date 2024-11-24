import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import {{fileName}} from './{{fileName}}'

describe('{{fileName}} Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the {{fileName}} component', () => {
        render(<{{fileName}} />)
        expect(screen.getByText('{{fileName}}')).toBeInTheDocument()
    })
})