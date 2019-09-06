import React from 'react'
import { render, cleanup, within } from 'react-testing-library'
import 'jest-dom/extend-expect'
import _ from 'lodash'
import { ContactCard } from 'molecules'

afterEach(cleanup)

const mockProps = {
  city: 'Galactic City',
  contactName: null,
  email: 'tarkin@deathstar.org',
  hoursOfOperation: 'Mon-Fri: 9am-5pm',
  link: 'http://starwars.wikia.com/wiki/Wilhuff_Tarkin',
  phoneNumber: '123-456-5665',
  state: 'MD',
  streetAddress: '123 Death Star Street, Suite 1',
  zipCode: 12345,
  title: 'Grand Moff Tarkin',
  id: 2974
}

describe('ContactCard', () => {
  it('should render with all the information', () => {
    const expectedAddress = `${mockProps.streetAddress}${mockProps.city}, ${mockProps.state} ${mockProps.zipCode}`
    const { getByTestId } = render(<ContactCard {...mockProps} />)

    getByTestId('contact-card')
    const title = getByTestId('contact card title')
    const address = getByTestId('contact address')
    const email = getByTestId('contact email')
    const phoneNumber = getByTestId('contact phone')
    const link = getByTestId('contact link')
    const hoursOfOperation = getByTestId('hours of operation')

    expect(title).toHaveTextContent(mockProps.title)
    within(address).findByText(expectedAddress)
    within(email).findByText(mockProps.email)
    within(phoneNumber).findByText(mockProps.phoneNumber)
    within(hoursOfOperation).findByText(mockProps.hoursOfOperation)
    within(link).findByText(mockProps.link)
  })

  it('should NOT render the title section when NO title is passed in', () => {
    const props = _.omit(mockProps, 'title')
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const title = queryByTestId('contact card title')
    expect(title).not.toHaveTextContent()
  })

  it('should NOT render the address section when NO streetAddress is passed in', () => {
    const props = _.omit(mockProps, 'streetAddress')
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const address = queryByTestId('contact address')
    expect(address).not.toBeInTheDocument()
  })

  it('should NOT render the phoneNumber section when NO phoneNumber is passed in', () => {
    const props = _.omit(mockProps, 'phoneNumber')
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const phone = queryByTestId('contact phone')
    expect(phone).not.toBeInTheDocument()
  })

  it('should NOT render the email section when NO email is passed in', () => {
    const props = _.omit(mockProps, 'email')
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const email = queryByTestId('contact email')
    expect(email).not.toBeInTheDocument()
  })

  it('should NOT render the link section when NO link is passed in', () => {
    const props = _.omit(mockProps, 'link')
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const link = queryByTestId('contact link')
    expect(link).not.toBeInTheDocument()
  })

  it('should NOT render the link section when link is an empty string', () => {
    const props = _.clone(mockProps)
    props.link = ''
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const link = queryByTestId('contact link')
    expect(link).not.toBeInTheDocument()
  })

  it('should NOT render the link section when link is an empty object', () => {
    const props = _.clone(mockProps)
    props.link = {}
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const link = queryByTestId('contact link')
    expect(link).not.toBeInTheDocument()
  })

  it('should NOT render the hours section when NO hoursOfOperation is passed in', () => {
    const props = _.omit(mockProps, 'hoursOfOperation')
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const hours = queryByTestId('hours of operation')
    expect(hours).not.toBeInTheDocument()
  })

  it('should NOT render the hours section when hoursOfOperation is an empty string', () => {
    const props = _.clone(mockProps)
    props.hoursOfOperation = ''
    const { getByTestId, queryByTestId } = render(<ContactCard {...props} />)

    getByTestId('contact-card')
    const hours = queryByTestId('hours of operation')
    expect(hours).not.toBeInTheDocument()
  })
})
