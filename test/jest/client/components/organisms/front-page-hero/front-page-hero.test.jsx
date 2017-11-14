import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { FrontPageHero } from 'organisms'

const links = [
  {
    link: '/a',
    title: 'A'
  },
  {
    link: '/b',
    title: 'B'
  }
]

const jsx = (
  <FrontPageHero
    color="blue"
    image="image.png"
    imageAlt="some image"
    links={links}
    title="Title"
  />
)

describe('front page hero', () => {
  test('renders correctly', () => {
    const tree = renderer.create(jsx).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('callout buttons render correct event config', () => {
    const basicLinks = shallow(jsx)
      .find('BasicLink')
      .map((basicLink, index) => {
        const { title } = links[index]
        const eventConfig = {
          category: 'Front-Page-Non-Featured-Hero',
          action: `Click: ${title}`
        }
        expect(basicLink.props().eventConfig).toEqual(eventConfig)
      })
  })
})
