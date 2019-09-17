import React from 'react'
import { render, cleanup, waitForElement, within } from 'react-testing-library'
import { LocationInfoSection } from 'organisms'
import { when } from 'jest-when'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

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

const alternateOfficeId = 1111
const alternateOfficeId2 = 2222
const alternateOfficeId3 = 3333
const regionalOfficeId = 4444

const mockAlterenateOfficeResponse = {
  areasServed: 'All four corners of the galaxy',
  location: [mockLocation]
}
const mockRegionalOfficeResponse = {
  areasServed: 'All four corners of the galaxy',
  location: [mockLocation]
}

let fetchRestContentStub

beforeEach(function() {
  fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')

  when(fetchRestContentStub)
    .calledWith(alternateOfficeId)
    .mockImplementationOnce(() => mockAlterenateOfficeResponse)

  when(fetchRestContentStub)
    .calledWith(regionalOfficeId)
    .mockImplementationOnce(() => mockRegionalOfficeResponse)
})

afterEach(function() {
  fetchRestContentStub.mockReset()
  cleanup()
})

afterAll(function() {
  fetchRestContentStub.mockRestore()
})

describe('Location info section', () => {
  it('renders the location information section with main, alternate, and regional location when all exist', done => {
    const mockOfficeData = {
      location: [mockLocation],
      alternateLocations: [alternateOfficeId],
      office: regionalOfficeId
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    setImmediate(async () => {
      const locationInfoSection = queryByTestId('location-info')
      const mainLocation = queryByTestId('main-location')
      const alternateLocation = await waitForElement(() => queryByTestId('alternate-location'))
      const regionLocation = await waitForElement(() => queryByTestId('region-location'))

      expect(locationInfoSection).toBeInTheDocument()
      expect(mainLocation).toBeInTheDocument()
      expect(alternateLocation).toBeInTheDocument()
      expect(regionLocation).toBeInTheDocument()
      done()
    })
  })

  it('does NOT render the location information section when there is no main location, alternate office, or regional office in the data', () => {
    const mockOfficeData = {
      location: {},
      alternateLocations: [],
      office: {}
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    expect(fetchRestContentStub).not.toHaveBeenCalled()

    const locationInfoSection = queryByTestId('location-info')
    expect(locationInfoSection).not.toBeInTheDocument()
  })

  it('renders the main office location within the location info section ', () => {
    const mockOfficeData = { location: [mockLocation] }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    const locationInfoSection = queryByTestId('location-info')
    const mainLocation = queryByTestId('main-location')
    expect(locationInfoSection).toBeInTheDocument()
    expect(mainLocation).toBeInTheDocument()
  })

  it('does NOT render main office location within the location info section when there is no main location', done => {
    const mockOfficeData = {
      location: {},
      alternateLocations: [alternateOfficeId]
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    setImmediate(async () => {
      // this ensures that the rendered component is updated before we check the location section
      await waitForElement(() => queryByTestId('alternate-location'))

      const locationInfoSection = queryByTestId('location-info')
      const mainLocation = queryByTestId('main-location')
      expect(locationInfoSection).toBeInTheDocument()
      expect(mainLocation).not.toBeInTheDocument()
      done()
    })
  })

  it('renders alternate office location within the location info section when there is an alternate office', done => {
    const mockOfficeData = { alternateLocations: [alternateOfficeId] }
    const { getAllByTestId, queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    setImmediate(async () => {
      expect(fetchRestContentStub).toHaveBeenCalledTimes(1)
      expect(fetchRestContentStub).toHaveBeenCalledWith(alternateOfficeId)

      const locationInfoSection = queryByTestId('location-info')
      const alternateLocation = await waitForElement(() => getAllByTestId('alternate-location'))
      expect(locationInfoSection).toBeInTheDocument()
      expect(alternateLocation.length).toEqual(1)
      done()
    })
  })

  it('renders a maximum of two alternate office locations within the location info section when there are multiple alternate offices', done => {
    when(fetchRestContentStub)
      .calledWith(alternateOfficeId2)
      .mockImplementationOnce(() => mockAlterenateOfficeResponse)
    when(fetchRestContentStub)
      .calledWith(alternateOfficeId3)
      .mockImplementationOnce(() => mockAlterenateOfficeResponse)

    const mockOfficeData = {
      alternateLocations: [alternateOfficeId, alternateOfficeId2, alternateOfficeId3]
    }
    const { getAllByTestId, queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    setImmediate(async () => {
      expect(fetchRestContentStub).toHaveBeenCalledTimes(2)
      expect(fetchRestContentStub).toHaveBeenCalledWith(alternateOfficeId)
      expect(fetchRestContentStub).toHaveBeenCalledWith(alternateOfficeId2)
      expect(fetchRestContentStub).not.toHaveBeenCalledWith(alternateOfficeId3)

      const alternateLocation = await waitForElement(() => getAllByTestId('alternate-location'))
      const locationInfoSection = queryByTestId('location-info')
      expect(locationInfoSection).toBeInTheDocument()
      expect(alternateLocation.length).toEqual(2)
      done()
    })
  })

  it('does NOT render alternate location info within the location info section when there are no alternate offices', () => {
    const mockOfficeData = {
      alternateLocations: [],
      location: [mockLocation]
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    expect(fetchRestContentStub).not.toHaveBeenCalled()

    const locationInfoSection = queryByTestId('location-info')
    const alternateLocation = queryByTestId('alternate-location')
    expect(locationInfoSection).toBeInTheDocument()
    expect(alternateLocation).not.toBeInTheDocument()
  })

  it('renders the regional office location within the location info section when there is a regional office', done => {
    const mockOfficeData = { office: regionalOfficeId }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    setImmediate(async () => {
      expect(fetchRestContentStub).toHaveBeenCalledTimes(1)
      expect(fetchRestContentStub).toHaveBeenCalledWith(regionalOfficeId)

      const regionLocation = await waitForElement(() => queryByTestId('region-location'))
      const locationInfoSection = queryByTestId('location-info')

      expect(locationInfoSection).toBeInTheDocument()
      expect(regionLocation).toBeInTheDocument()
      done()
    })
  })

  it('does NOT render regional office location within the location info section when there is no regional office', () => {
    const mockOfficeData = {
      office: {},
      location: [mockLocation]
    }
    const { queryByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    expect(fetchRestContentStub).not.toHaveBeenCalled()

    const locationInfoSection = queryByTestId('location-info')
    const regionLocation = queryByTestId('region-location')
    expect(locationInfoSection).toBeInTheDocument()
    expect(regionLocation).not.toBeInTheDocument()
  })

  it('includes areas served text (when it exists) on regional location info ONLY (not on alternate or main locations)', done => {
    const mockOfficeData = {
      areasServed: 'All four corners of the galaxy',
      location: [mockLocation],
      alternateLocations: [alternateOfficeId],
      office: regionalOfficeId
    }
    const { getByTestId } = render(<LocationInfoSection office={mockOfficeData} />)

    setImmediate(async () => {
      const mainLocation = getByTestId('main-location')
      const alternateLocation = await waitForElement(() => getByTestId('alternate-location'))
      const regionLocation = await waitForElement(() => getByTestId('region-location'))

      const regionAreasServedText = within(regionLocation).queryByTestId('message')
      const mainAreasServedText = within(mainLocation).queryByTestId('message')
      const alternateAreasServedText = within(alternateLocation).queryByTestId('message')

      expect(regionAreasServedText).toHaveTextContent(mockRegionalOfficeResponse.areasServed)
      expect(mainAreasServedText).not.toBeInTheDocument()
      expect(alternateAreasServedText).not.toBeInTheDocument()
      done()
    })
  })
})
