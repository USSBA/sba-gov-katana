import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { GenericCardCollection } from 'organisms'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const MockComponent = () => {
  return (
    <div>
      <h4>Some component</h4>
    </div>
  )
}

describe('Generic card collection', () => {
  it('renders the card collection component', () => {
    const cardContent = <MockComponent />
    const cardsContent = [cardContent]
    const { getByTestId } = render(<GenericCardCollection cardsContent={cardsContent} />)
    const genericCardCollection = getByTestId('generic-card-collection')
    expect(genericCardCollection).toBeInTheDocument()
  })

  it('does NOT render a card container component if there is no cardsContent prop', () => {
    const { queryAllByTestId } = render(<GenericCardCollection />)

    const expectedNumberOfCardContainers = 0
    const cardContainers = queryAllByTestId('card-container')
    expect(cardContainers.length).toEqual(expectedNumberOfCardContainers)
  })

  it('will render the card container for one component in the array for cardsContent', () => {
    const cardContent = <MockComponent />
    const cardsContent = []
    cardsContent.push(cardContent)

    const { queryAllByTestId } = render(<GenericCardCollection cardsContent={cardsContent} />)

    const expectedNumberOfCardContainers = cardsContent.length
    const cardContainers = queryAllByTestId('card-container')
    expect(cardContainers.length).toEqual(expectedNumberOfCardContainers)
  })

  it('will render the card container for each component when there are multiple components in cardsContent', () => {
    const cardContent = <MockComponent />
    const cardsContent = []
    cardsContent.push(cardContent)
    cardsContent.push(cardContent)
    cardsContent.push(cardContent)

    const { queryAllByTestId } = render(<GenericCardCollection cardsContent={cardsContent} />)

    const expectedNumberOfCardContainers = cardsContent.length
    const cardContainers = queryAllByTestId('card-container')
    expect(cardContainers.length).toEqual(expectedNumberOfCardContainers)
  })
})
