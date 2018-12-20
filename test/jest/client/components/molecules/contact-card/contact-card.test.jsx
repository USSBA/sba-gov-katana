/*global expect*/

import React from 'react'
import ContactCard from 'client/components/molecules/contact-card/contact-card.jsx'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'

const card = {
  type: 'contact',
  cdcNumber: '12345',
  city: 'Galactic City',
  contactName: null,
  email: 'tarkin@deathstar.org',
  firsNumber: '1234',
  link: 'http://starwars.wikia.com/wiki/Wilhuff_Tarkin',
  phoneNumber: '123-456-5665',
  state: 'MD',
  stateServed: 'Maryland',
  streetAddress: '123 Death Star Street, Suite 1',
  category: 'CDC/504',
  zipCode: 12345,
  title: 'Grand Moff Tarkin',
  id: 2974
}

describe('ContactCard', () => {
  test('should render with all the information', () => {
    const cardData = _.clone(card)
    const component = renderer.create(<ContactCard {...cardData} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render without an address ', () => {
    const cardData = _.omit(card, 'streetAddress')
    const component = shallow(<ContactCard {...cardData} />)
    // eslint-disable-next-line no-magic-numbers
    expect(component.find('.contact-card').children()).toHaveLength(4)
  })

  test('should render without a zip code ', () => {
    const cardData = _.omit(card, 'zipCode')
    const component = shallow(<ContactCard {...cardData} />)
    // eslint-disable-next-line no-magic-numbers
    expect(component.find('.contact-card').children()).toHaveLength(4)
  })

  test('should render without a phone number ', () => {
    const cardData = _.omit(card, 'phoneNumber')
    const component = shallow(<ContactCard {...cardData} />)
    // eslint-disable-next-line no-magic-numbers
    expect(component.find('.contact-card').children()).toHaveLength(4)
  })

  test('should render without the state served (which is normally invisible)', () => {
    const cardData = _.omit(card, 'stateServed')
    const component = shallow(<ContactCard {...cardData} />)
    // eslint-disable-next-line no-magic-numbers
    expect(component.find('.contact-card').children()).toHaveLength(5)
  })
})
