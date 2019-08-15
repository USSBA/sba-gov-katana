import React from 'react'
import { CallToAction } from 'molecules'

import renderer from 'react-test-renderer'
import _ from 'lodash'

import { render, cleanup } from 'react-testing-library'

import 'jest-dom/extend-expect'

afterEach(cleanup)

const ctaProps = {
  size: 'Small',
  buttonAction: {
    buttonText: 'Click Here',
    file: 'document.txt',
    type: 'file'
  }
}

describe('CallToAction', () => {
  it('renders an image on the CTA when passed in image props for prop size of "Large"', async () => {
    ctaProps.image = { url: '/images/photo.png' }
    ctaProps.size = 'Large'
    const { getByTestId } = render(<CallToAction {...ctaProps} />)
    const ctaImage = getByTestId('image')
    expect(ctaImage).toBeInTheDocument()
  })

  it('renders a headline passed in as props', async () => {
    ctaProps.headline = 'We are Fearless'
    const { getByTestId } = render(<CallToAction {...ctaProps} />)
    const ctaHeadline = getByTestId('headline')
    expect(ctaHeadline).toBeInTheDocument()
    expect(ctaHeadline).toHaveTextContent(ctaProps.headline)
  })

  it('renders a blurb passed in as props for prop size of "Medium"', async () => {
    ctaProps.blurb = 'Come join our herd'
    ctaProps.size = 'Medium'
    const { getByTestId } = render(<CallToAction {...ctaProps} />)
    const ctaBlurb = getByTestId('blurb')
    expect(ctaBlurb).toBeInTheDocument()
    expect(ctaBlurb).toHaveTextContent(ctaProps.blurb)
  })

  it('renders a blurb passed in as props for prop size of "Large"', async () => {
    ctaProps.blurb = 'Come join our herd'
    ctaProps.size = 'Large'
    const { getByTestId } = render(<CallToAction {...ctaProps} />)
    const ctaBlurb = getByTestId('blurb')
    expect(ctaBlurb).toBeInTheDocument()
    expect(ctaBlurb).toHaveTextContent(ctaProps.blurb)
  })

  it('renders a button with title text passed as props', async () => {
    ctaProps.buttonAction = {
      link: {
        title: 'Search Nearby',
        url: '/local-assistance/find'
      },
      type: 'link'
    }
    const { getByTestId } = render(<CallToAction {...ctaProps} />)
    const ctaButton = getByTestId('button')
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveTextContent(ctaProps.buttonAction.link.title)
  })
})

describe('CallToAction snapshot tests', () => {
  const ctaOptions = {
    blurb: 'This is the blurb for the CTA.',
    buttonAction: {
      id: 9262,
      type: 'link',
      link: {
        url: 'http://www.example.com/',
        title: 'Call To Action'
      }
    },
    headline: 'This is the headline for the CTA.',
    image: {
      url: 'http://example.com/someImage.jpg',
      alt: 'alt text for image',
      width: 1000,
      height: 667
    },
    type: 'callToAction',
    title: 'National Small Business Week CTA',
    id: 9264,
    updated: 1519332130,
    created: 1519331979,
    langCode: 'en',
    style: 'Medium'
  }
  test('renders a small size', () => {
    const component = renderer.create(<CallToAction size="Small" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders a medium size', () => {
    const component = renderer.create(<CallToAction size="Medium" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders a large size', () => {
    const component = renderer.create(<CallToAction size="Large" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders a button only', () => {
    const component = renderer.create(<CallToAction size="Button only" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
