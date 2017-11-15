/*global expect*/

import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow } from 'enzyme'

import { LinkCard } from 'atoms'

const card = {
  title: 'Grand Moff Tarkin',
  streetAddress: '123 Death Star Street, Suite 1',
  city: 'Galactic City',
  state: 'MD',
  zipCode: 12345,
  link: 'http://starwars.wikia.com/wiki/Wilhuff_Tarkin'
}

describe('LinkCard', () => {
  test('should render with all the information', () => {
    let cardData = _.clone(card)
    const component = renderer.create(<LinkCard {...cardData} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render without an address ', () => {
    let cardData = _.omit(card, 'streetAddress')
    const component = shallow(<LinkCard {...cardData} />)
    expect(component.find('.link-card-streetAddress')).toHaveLength(0)
  })

  test('should render without a zip code ', () => {
    let cardData = _.omit(card, 'zipCode')
    const component = shallow(<LinkCard {...cardData} />)
    expect(component.find('.link-card-citystatezip')).toHaveLength(0)
  })

  test('should render without the link', () => {
    let cardData = _.omit(card, 'link')
    const component = shallow(<LinkCard {...cardData} />)
    expect(component.find('.link-card-link')).toHaveLength(0)
  })
})
