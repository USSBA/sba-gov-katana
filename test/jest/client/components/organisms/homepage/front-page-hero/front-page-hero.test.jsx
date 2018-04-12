import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { FrontPageHero } from 'organisms'

const buttonProps = [
  {
    url: '/button-url',
    title: 'This is a button'
  }
]

const heroProps = {
  type: 'hero',
  caption: 'Want to be an entrepreneur?',
  imageLarge: {
    url: '/largeImage.jpg',
    alt: 'Start and grow your business',
    width: 1920,
    height: 768
  },
  imageMedium: {
    url: '/mediumImage.jpg',
    alt: 'medium image',
    width: 1446,
    height: 768
  },
  imageSmall: {
    url: '/smallImage.jpg',
    alt: 'small image',
    width: 1149,
    height: 1149
  },
  link: {},
  title: 'Start and grow your business'
}

describe('Front Page Hero', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<FrontPageHero hero={heroProps} button={buttonProps[0]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // test('callout button renders correctly', () => {
  //   const component = shallow(<FrontPageHero hero={heroProps} button={buttonProps[0]} />)
  //
  //   expect(component.find('LargeInversePrimaryButton').props().id).toEqual('frontpage-hero-button')
  //   expect(component.find('LargeInversePrimaryButton').props().text).toEqual('This is a button')
  //   expect(component.find('LargeInversePrimaryButton').props().url).toEqual('/button-url')
  // })

  test('should load correct elements before rendering', () => {
    const component = shallow(<FrontPageHero hero={heroProps} button={buttonProps[0]} />)

    expect(component.find('heroLarge').root.unrendered.props.hero.title).toEqual(
      'Start and grow your business'
    )
    expect(component.find('heroLarge').root.unrendered.props.hero.caption).toEqual(
      'Want to be an entrepreneur?'
    )
    expect(component.find('heroLarge').root.unrendered.props.hero.imageLarge.url).toEqual('/largeImage.jpg')
    expect(component.find('heroLarge').root.unrendered.props.hero.imageLarge.alt).toEqual(
      'Start and grow your business'
    )
    expect(component.find('heroLarge').root.unrendered.props.hero.imageLarge.width).toEqual(1920)
    expect(component.find('heroLarge').root.unrendered.props.hero.imageLarge.height).toEqual(768)

    expect(component.find('heroMedium').root.unrendered.props.hero.imageMedium.url).toEqual(
      '/mediumImage.jpg'
    )
    expect(component.find('heroMedium').root.unrendered.props.hero.imageMedium.alt).toEqual('medium image')
    expect(component.find('heroMedium').root.unrendered.props.hero.imageMedium.width).toEqual(1446)
    expect(component.find('heroMedium').root.unrendered.props.hero.imageMedium.height).toEqual(768)

    expect(component.find('heroSmall').root.unrendered.props.hero.imageSmall.url).toEqual('/smallImage.jpg')
    expect(component.find('heroSmall').root.unrendered.props.hero.imageSmall.alt).toEqual('small image')
    expect(component.find('heroSmall').root.unrendered.props.hero.imageSmall.width).toEqual(1149)
    expect(component.find('heroSmall').root.unrendered.props.hero.imageSmall.height).toEqual(1149)
  })
})
