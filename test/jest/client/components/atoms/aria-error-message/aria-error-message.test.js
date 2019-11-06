import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { AriaErrorMessage } from 'atoms'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('AriaErrorMessage', () => {
  it('renders the aria error message component', () => {
    const message = 'please enter a valid name'
    const { getByTestId } = render(<AriaErrorMessage message={message} />)
    const component = getByTestId('aria-error-message')
    expect(component).toBeInTheDocument()
    expect(component).toHaveTextContent(message)
  })
})
