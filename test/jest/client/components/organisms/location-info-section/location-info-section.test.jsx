import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { LocationInfoSection } from 'organisms'
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from 'jest-when'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

afterEach(function() {
  resetAllWhenMocks()
  cleanup
})

const mockLocation = {
  city: 'Baltimore',
  email: 'officeemail@mail.com',
  fax: '999-999-9999',
  hoursOfOperation: 'M-F 8am to 6pm\r\nSa closed\r\nSu by appointment only',
  name: 'Baltimore District Office',
  phoneNumber: '100-200-3000',
  state: 'MD',
  streetAddress: '123 Cool Street',
  zipCode: 21215
}

describe.skip('Location info section', () => {
  it('renders the location information section', async () => {
    const mockOfficeData = { location: [mockLocation] }
    const { getByTestId } = render(<LocationInfoSection office={mockOfficeData} />)
    const locationInfo = getByTestId('location-info')
    expect(locationInfo).toBeInTheDocument()
  })

  it('does NOT render the location information section when there is no main location, alternate office, or regional office in the data', async () => {
    // TODO: Figure out why test is passing when run solo, but failing when run as a suite
    const mockOfficeData = {
      location: {},
      alternateLocations: [],
      office: {}
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)
    const locationInfo = queryByTestId('location-info')
    expect(locationInfo).not.toBeInTheDocument()
  })

  it('renders the main office location info', async () => {
    const mockOfficeData = { location: [mockLocation] }
    const { getByTestId } = render(<LocationInfoSection office={mockOfficeData} />)
    const mainLocation = getByTestId('main-location')
    expect(mainLocation).toBeInTheDocument()
  })

  it('does NOT render the alternate location info if there are no alternate locations', async () => {
    const mockOfficeData = {
      alternateLocations: [],
      location: [mockLocation]
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)
    const alternateLocation = queryByTestId('alternate-location')
    expect(alternateLocation).not.toBeInTheDocument()
  })

  it('does NOT render the region location info if there is no regional office', async () => {
    const mockOfficeData = {
      office: {},
      location: [mockLocation]
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)
    const regionLocation = queryByTestId('region-location')
    expect(regionLocation).not.toBeInTheDocument()
  })

  it('renders alternate office location info when there is one alternate office', async () => {
    // TODO
    const alternateLocationId = 1111
    const mockOfficeData = { alternateLocations: [alternateLocationId], location: [mockLocation] }
    const mockAlterenateLocationsResponse = mockLocation

    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    when(fetchRestContentStub)
      .calledWith(alternateLocationId)
      .mockImplementationOnce(() => mockAlterenateLocationsResponse)

    const { debug, getByTestId } = render(<LocationInfoSection office={mockOfficeData} />)
    console.log('CALLS----', fetchRestContentStub.mock.calls)
    console.log('RESULTS-----', fetchRestContentStub.mock.results)
    verifyAllWhenMocksCalled()

    debug()

    expect(await waitForElement(() => getByTestId('location-info'))).toExist
    getByTestId('location-info')
    const alternateLocation = await waitForElement(() => getByTestId('alternate-location'))
    expect(alternateLocation).toBeInTheDocument()
  })

  it.skip('does NOT render the main office location info if there is no main location data', async () => {
    // TODO
  })

  it.skip('renders alternate office location info for each office when there are two alternate offices', async () => {
    // TODO
  })

  it.skip('renders a maximum of two alternate office locations when there are more than two alternate offices', async () => {
    // TODO
  })

  it.skip('renders region location info when there is a regional office', async () => {
    // TODO
  })
})
