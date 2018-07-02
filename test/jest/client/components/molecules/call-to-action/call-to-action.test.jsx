import React from 'react'
import { CallToAction } from 'molecules'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'

describe('CallToAction', () => {
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
    const component = renderer.create(<CallToAction size="small" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders a medium size', () => {
    const component = renderer.create(<CallToAction size="medium" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders a large size', () => {
    const component = renderer.create(<CallToAction size="large" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders a button only', () => {
    const component = renderer.create(<CallToAction size="Button only" {...ctaOptions} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
