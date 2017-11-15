import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { connect } from 'react-redux'

import { HappeningNow } from '../../../../../../../src/client/components/organisms/homepage/happening-now/happening-now.jsx'

const items = [
  {
    image: 'image.png',
    imageAlt: 'some image',
    title: 'Title',
    url: 'https://sba.gov'
  }
]

const jsx = (
  <HappeningNow
    happeningNow={items}
    actions={{
      fetchContentIfNeeded() {
        return
      }
    }}
  />
)

describe('happening now section', () => {
  test('renders correctly', () => {
    const tree = renderer.create(jsx).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('buttons render correct event config', () => {
    const buttons = shallow(jsx)
      .find('SmallPrimaryButton')
      .map((button, index) => {
        const eventConfig = {
          category: 'Front-Page-Happening-Now',
          action: `Click: LEARN MORE ${index}`
        }
        expect(button.props().eventConfig).toEqual(eventConfig)
      })
  })
})
