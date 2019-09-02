import React from 'react'
import { render, cleanup, waitForElement, within } from 'react-testing-library'
import '../../test-data/matchMedia.mock'
import DistrictOffice from 'templates/district-office/district-office.jsx'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import eventsTestData from '../../test-data/events.json'

afterEach(cleanup)

describe('District Office template', () => {
  describe('the office information section', () => {
    it('will render the services section if service information is provided from the office request', () => {
      const servicesEntry = '<p>Some content</p>'
      const mockOfficeData = {
        title: 'State District Office',
        officeServices: servicesEntry
      }
      const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

      const officeInfo = getByTestId('office-information-section')
      const officeServices = getByTestId('office-services-section')
      expect(officeInfo).toBeInTheDocument()
      expect(officeServices).toBeInTheDocument()
      expect(officeServices).toContainHTML(servicesEntry)
    })

    it('will NOT render the services section if service information is not available from office request', () => {
      const mockOfficeData = {
        title: 'State District Office'
      }
      const { getByTestId, queryByTestId } = render(<DistrictOffice office={mockOfficeData} />)

      const officeInfo = getByTestId('office-information-section')
      const officeServices = queryByTestId('office-services-section')
      expect(officeInfo).toBeInTheDocument()
      expect(officeServices).toBeNull()
    })
  })

  it('will NOT render the services section if service information is not in a String data type', () => {
    const mockOfficeData = {
      title: 'State District Office',
      officeServices: {
        key: 'value'
      }
    }
    const { getByTestId, queryByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const officeInfo = getByTestId('office-information-section')
    const officeServices = queryByTestId('office-services-section')
    expect(officeInfo).toBeInTheDocument()
    expect(officeServices).toBeNull()
  })

  describe('Hero section', () => {
    it('renders the hero component with office data', () => {
      const mockOfficeData = {
        bannerImage: {
          image: {
            url: '/files/heroImage.png',
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
      const heroButton = within(hero).getByTestId('button')
      const heroTitle = within(hero).getByTestId('title')
      const heroSummary = within(hero).getByTestId('message')
      const heroBackground = within(hero).getByTestId('background')

      expect(hero).toBeInTheDocument()
      expect(heroButton).toBeInTheDocument()
      expect(heroTitle).toHaveTextContent(mockOfficeData.title)
      expect(heroSummary).toHaveTextContent(mockOfficeData.summary)
      expect(heroBackground).toHaveClass('image')
      expect(heroBackground).toHaveAttribute('aria-label', mockOfficeData.bannerImage.image.alt)
      expect(heroBackground).toHaveAttribute(
        'style',
        `background-image: url(${mockOfficeData.bannerImage.image.url});`
      )
    })

    it('renders the hero without a background image when there is no bannerImage in the office data', () => {
      const mockOfficeData = {
        title: 'State District Office'
      }
      const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

      const hero = getByTestId('hero')
      const heroBackground = within(hero).getByTestId('background')
      expect(heroBackground).toHaveClass('noImage')
    })

    it('renders the hero without a button when there is no bannerImage.link.url in the office data', () => {
      const mockOfficeData = {
        bannerImage: {
          image: {
            url: '/files/heroImage.png',
            alt: 'office building exterior'
          }
        },
        title: 'State District Office'
      }
      const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)
      const hero = getByTestId('hero')
      expect(hero).toBeInTheDocument()

      const heroButton = within(hero).queryByTestId('button')
      expect(heroButton).not.toBeInTheDocument()
    })

    it('renders the hero without a summary when there is no summary in the office data', () => {
      const mockOfficeData = {
        title: 'State District Office'
      }
      const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)
      const hero = getByTestId('hero')
      expect(hero).toBeInTheDocument()

      const heroSummary = within(hero).queryByTestId('message')
      expect(heroSummary).not.toHaveTextContent()
    })
  })

  it('renders the latest news release component', () => {
    const mockOfficeData = { title: 'State District Office' }
    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const content = getByTestId('news-release-section')
    expect(content).toBeInTheDocument()
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
