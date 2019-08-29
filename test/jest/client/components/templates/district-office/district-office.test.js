import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import DistrictOffice from 'templates/district-office/district-office.jsx'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import eventsTestData from '../../test-data/events.json'

// We need to mock the function window.matchMedia located in the Hero component
// that gets executed via the render in react testing library
window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }
})

afterEach(cleanup)

describe('District Office template', () => {
  it('renders the latest news release component', () => {
    const mockOfficeData = { title: 'State District Office' }
    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const content = getByTestId('news-release-section')
    expect(content).toBeInTheDocument()
  })
  it('renders the hero component', () => {
    const mockOfficeData = {
      bannerImage: {
        image: {
          url: '/sites/default/files/2019-08/Screen%20Shot%202019-01-10%20at%2010.38.27%20AM.png',
          alt: 'office building exterior'
        },
        link: {
          url: '/blog/what-are-business-plan-events'
        }
      },
      summary: 'We are a cool office.',
      title: 'State District Office'
    }
    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const hero = getByTestId('hero')
    const title = getByTestId('title')
    const summary = getByTestId('message')
    const image = getByTestId('image')
    // const button = getByTestId('button')
    expect(hero).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(summary).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    // expect(button).toBeInTheDocument()
  })

  it('renders the newsletter sign up component', () => {
    const mockOfficeData = { title: 'State District Office' }
    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const content = getByTestId('office-newsletter')
    expect(content).toBeInTheDocument()
  })

  it('renders a CTA for any district office', async () => {
    const mockOfficeData = { title: 'Fearless HQ' }
    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const cta = getByTestId('call-to-action')
    expect(cta).toBeInTheDocument()
  })

  it('renders the lender match component for any district office', async () => {
    const mockOfficeData = { title: 'Fearless HQ' }
    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const lenderMatch = getByTestId('office-lender-match')
    expect(lenderMatch).toBeInTheDocument()
  })
  it('contains an Events Component', async () => {
    const mockOfficeResponse = {
      leadership: {},
      location: [
        {
          id: 11803,
          type: 'location',
          city: 'Appleton',
          email: 'score.foxcities@scorevolunteer.org',
          fax: null,
          geocode: {
            id: 19718,
            type: 'geocode',
            latitude: '44.262804',
            longitude: '-88.409144'
          },
          hoursOfOperation: null,
          name: 'Fox Cities SCORE',
          phoneNumber: '920-831-4904',
          state: 'WI',
          streetAddress: '125 N. Superior Street',
          zipCode: 54911
        }
      ],
      mediaContact: {},
      officeService: {},
      officeType: 'SCORE Business Mentor',
      pims: {
        id: '107126',
        type: 'pims',
        location: '282725'
      },
      relatedDisaster: {},
      summary: {},
      website: {
        url: 'https://foxcities.score.org',
        title: ''
      },
      type: 'office',
      title: 'Fox Cities SCORE',
      id: 16008,
      updated: 1562852606,
      created: 1543957391,
      langCode: 'en'
    }

    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(eventsTestData))

    const { getByTestId } = render(<DistrictOffice office={mockOfficeResponse} />)
    let content = await waitForElement(() => getByTestId('events'))
    expect(content).toBeInTheDocument()

    content = await waitForElement(() => getByTestId('events-button'))
    expect(content).toBeInTheDocument()
  })
})
