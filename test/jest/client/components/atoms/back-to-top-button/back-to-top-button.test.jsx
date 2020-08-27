import React from 'react'
import { fireEvent, render, cleanup } from 'react-testing-library'
import { BackToTopButton } from 'atoms'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('BackToTopButton', () => {
  it('renders the back-to-top button component', () => {
    const { getByTestId } = render(<BackToTopButton />)
    expect(getByTestId('back-to-top-button')).toBeInTheDocument()
  })
  it('renders arrow graphic', () => {
    const { getByTestId } = render(<BackToTopButton />)
    const button = getByTestId('back-to-top-button')
    const arrow = getByTestId('arrow')
    expect(button).toContainElement(arrow)
  })
  it('should call resetYPos function ', () => {
    BackToTopButton.prototype.resetYPos = jest.fn()
    const { getByTestId } = render(<BackToTopButton />)
    const button = getByTestId('back-to-top-button')
    fireEvent.click(button)
    expect(BackToTopButton.prototype.resetYPos).toBeCalledTimes(1)
  })
})
