/*eslint-disable no-undefined*/

import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { NewsletterForm } from 'molecules'

afterEach(cleanup)

describe('NewsletterForm', () => {
  it('should have a title', () => {
    expect(true)
  })

  // it should have a disabled button with invalid input
  // it should display error state on network error
  // it should display success state on success

  // it('should have a name, title and bio', () => {
  //   const props = Object.assign({}, mockPersonData)
  //
  //   const { getByTestId } = render(<AuthorCard {...props} />)
  //
  //   let content = getByTestId('name')
  //   expect(content).toBeInTheDocument()
  //
  //   content = getByTestId('title')
  //   expect(content).toBeInTheDocument()
  //
  //   content = getByTestId('bio')
  //   expect(content).toBeInTheDocument()
  // })
  //
  // it('should display an image', () => {
  //   const props = Object.assign({}, mockPersonData)
  //
  //   const { getByTestId } = render(<AuthorCard {...props} />)
  //
  //   const content = getByTestId('picture')
  //   expect(content).toBeInTheDocument()
  // })
  //
  // it('should not display an image', () => {
  //   const props = Object.assign({}, mockPersonData)
  //   props.highResolutionPhoto = {}
  //
  //   const { queryByTestId } = render(<AuthorCard {...props} />)
  //
  //   const content = queryByTestId('picture')
  //   expect(content).not.toBeInTheDocument()
  // })
  //
  // it('should display a read-more link', () => {
  //   const props = Object.assign({}, mockPersonData)
  //
  //   const { getByTestId } = render(<AuthorCard {...props} />)
  //
  //   const content = getByTestId('read-more')
  //   expect(content).toBeInTheDocument()
  // })
})
