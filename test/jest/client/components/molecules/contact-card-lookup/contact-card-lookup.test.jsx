import React from 'react'
import { ContactCard, ContactCardLookup } from 'molecules'
import { shallow } from 'enzyme'

const items = [
  {
    category: 'Microloan',
    cdcNumber: null,
    city: 'San Juan',
    contactName: 'Alice',
    email: 'alice@google.net',
    firsNumber: null,
    id: 1000,
    link: 'http://www.alice.net',
    phoneNumber: '111-111-1111',
    state: 'PR',
    stateServed: ['Puerto Rico'],
    streetAddress: '1 Main St',
    title: 'Corporation of Alice',
    type: 'contact',
    zipCode: 919
  },
  {
    category: 'Microloan',
    cdcNumber: null,
    city: 'Baltimore',
    contactName: 'Dave',
    email: 'dave@google.net',
    firsNumber: null,
    id: 2000,
    link: 'http://www.dave.net',
    phoneNumber: '222-222-2222',
    state: 'MD',
    stateServed: ['Maryland'],
    streetAddress: '2 Main St',
    title: 'Corporation of Dave',
    type: 'contact',
    zipCode: 21230
  }
]

describe('ContactCardLookup', () => {
  test('it will render ContactCard component via default cardRenderer function in props', () => {
    const component = shallow(<ContactCardLookup />)
    component.setState({ displayedItems: items })
    expect(component.find(ContactCard).length).toEqual(2)
  })
})
