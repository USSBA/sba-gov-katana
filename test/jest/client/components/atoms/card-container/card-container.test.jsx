import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { CardContainer } from 'atoms'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const MockComponent = () => {
  return (
    <div data-testid="mock-component">
      <h4>Some component</h4>
    </div>
  )
}

describe('Card container', () => {
  it('renders the card container component', () => {
    const cardContent = <MockComponent />
    const index = 0
    const expectedAriaLabel = `card ${index}`

    const { getByTestId } = render(<CardContainer cardContent={cardContent} />)
    const cardContainer = getByTestId('card-container')
    expect(cardContainer).toBeInTheDocument()
    expect(cardContainer).toHaveAttribute('aria-label', expectedAriaLabel)
  })

  it('renders the card container component with twoColumn class', () => {
    const cardContent = <MockComponent />
    const numCardsWhichCreateTwoColumnClass = 2
    const { getByTestId } = render(
      <CardContainer cardContent={cardContent} numCards={numCardsWhichCreateTwoColumnClass} />
    )
    const cardContainer = getByTestId('card-container')
    expect(cardContainer).toHaveClass('twoColumn')
  })

  it('renders the card container component with threeColumn class', () => {
    const cardContent = <MockComponent />
    const numCardsWhichCreateThreeColumnClass = 3
    const { getByTestId } = render(
      <CardContainer cardContent={cardContent} numCards={numCardsWhichCreateThreeColumnClass} />
    )
    const cardContainer = getByTestId('card-container')
    expect(cardContainer).toHaveClass('threeColumn')
  })

  it('renders the card container component with fourColumn class', () => {
    const cardContent = <MockComponent />
    const numCardsWhichCreateFourColumnClass = 4
    const { getByTestId } = render(
      <CardContainer cardContent={cardContent} numCards={numCardsWhichCreateFourColumnClass} />
    )
    const cardContainer = getByTestId('card-container')
    expect(cardContainer).toHaveClass('fourColumn')
  })

  it('renders the card container component with sixColumn class', () => {
    const cardContent = <MockComponent />
    const numCardsWhichCreateSixColumnClass = 6
    const { getByTestId } = render(
      <CardContainer cardContent={cardContent} numCards={numCardsWhichCreateSixColumnClass} />
    )
    const cardContainer = getByTestId('card-container')
    expect(cardContainer).toHaveClass('sixColumn')
  })
})
