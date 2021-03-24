/* eslint-env jest */
import React from 'react'
import { Hero } from 'organisms'
import 'jest-dom/extend-expect'

import { render, cleanup } from 'react-testing-library'

afterEach(cleanup)

// fixes 'TypeError: window.matchMedia is not a function'
window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }
})

describe('Hero component', () => {
  it('displays title in an H1 tag', () => {
    const titleText = 'My Title'
    const { queryByTestId } = render(<Hero title={titleText} />)
    const content = queryByTestId('title')
    expect(content).toHaveTextContent(titleText)
  })

  it('displays message in an H5 tag', () => {
    const message = 'My message'
    const { queryByTestId } = render(<Hero message={message} />)
    const content = queryByTestId('message')
    expect(content).toHaveTextContent(message)
  })

  it('displays a single button', () => {
    const buttonData = [
      {
        url: '/somewhere',
        btnText: 'Find Somewhere'
      }
    ]
    const { queryAllByTestId } = render(<Hero buttons={buttonData} />)
    const content = queryAllByTestId('button')
    expect(content).toHaveLength(buttonData.length)
    expect(content[0]).toHaveTextContent(buttonData[0].btnText)
  })

  it('displays no buttons', () => {
    const { queryAllByTestId } = render(<Hero />)
    const content = queryAllByTestId('button')
    expect(content).toHaveLength(0)
  })

  it('displays multiple buttons', () => {
    const buttonData = [
      {
        url: '/somewhere',
        btnText: 'Find Somewhere'
      },
      {
        url: '/somewhere-else',
        btnText: 'Find Somewhere Else'
      },
      {
        url: '/nowhere',
        btnText: 'Find Nowhere'
      }
    ]
    const { queryAllByTestId } = render(<Hero buttons={buttonData} />)
    const content = queryAllByTestId('button')
    expect(content).toHaveLength(buttonData.length)
  })

  it('has a decorative arrow if an image URL is provided', () => {
    const { queryByTestId } = render(<Hero imageUrl="/foo" />)
    const content = queryByTestId('hero-arrow')
    expect(content).toHaveAttribute('aria-hidden', 'true')
  })
  it('DOES NOT have a decorative arrow if an image URL is provided', () => {
    const { queryByTestId } = render(<Hero />)
    const content = queryByTestId('hero-arrow')
    expect(content).toBe(null)
  })
})
