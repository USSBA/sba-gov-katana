import React from 'react'
import { render, cleanup, waitForElement, within } from 'react-testing-library'
import '../../test-data/matchMedia.mock'
import DistrictOffice from 'templates/district-office/district-office.jsx'
import { when, resetAllWhenMocks } from 'jest-when'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import eventsTestData from '../../test-data/events.json'
import blogsTestData from '../../test-data/district-office-blogs.json'

afterEach(cleanup)

const mockDocumentResults = {
  count: 1,
  items: [
    {
      activitys: ['Application'],
      documentIdNumber: {},
      documentIdType: 'Support',
      files: [
        {
          id: 21395,
          type: 'docFile',
          effectiveDate: '2013-06-01',
          expirationDate: null,
          fileUrl: '/sites/default/files/2019-08/ODA%20Newsletter_June%202013.pdf',
          version: null
        }
      ],
      office: 7322,
      officeLink: {},
      ombNumber: {},
      programs: ['Disaster'],
      summary: 'ODA Newsletter June 2013',
      type: 'document',
      title: 'ODA Newsletter June 2013',
      id: 19484,
      updated: 1565727230,
      created: 1370116340,
      langCode: 'en',
      url: '/document/support--oda-newsletter-june-2013'
    }
  ]
}

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

  describe('Social media section', () => {
    it('renders social media when there is a twitterLink in the office data', () => {
      const mockOfficeData = {
        title: 'State District Office',
        twitterLink: 'https://twitter.com/sbagov'
      }
      const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

      const socialMediaSection = getByTestId('social-media-section')
      expect(socialMediaSection).toBeInTheDocument()

      within(socialMediaSection).getByText('Follow us')
      within(socialMediaSection).getByAltText('link to twitter')
    })

    it('does NOT render social media when twitterLink is NOT a string', () => {
      const mockOfficeData = {
        title: 'State District Office',
        twitterLink: {}
      }
      const { queryByTestId } = render(<DistrictOffice office={mockOfficeData} />)

      const socialMediaSection = queryByTestId('social-media-section')
      expect(socialMediaSection).not.toBeInTheDocument()
    })
  })

  describe('Location information', () => {
    const mockMainLocation = {
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

    it('renders the location information section', async () => {
      const mockOfficeData = { location: [mockMainLocation] }
      const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)
      const locationInfo = getByTestId('location-info')
      expect(locationInfo).toBeInTheDocument()
    })

    it('does NOT render the location information section when there is no location in the data', async () => {
      const mockOfficeData = { title: 'Fearless HQ' }
      const { queryByTestId } = render(<DistrictOffice office={mockOfficeData} />)
      const locationInfo = queryByTestId('location-info')
      expect(locationInfo).not.toBeInTheDocument()
    })

    it('renders the main office location info', async () => {
      const mockOfficeData = { location: [mockMainLocation] }
      const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)
      const locationInfo = getByTestId('main-location')
      expect(locationInfo).toBeInTheDocument()
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
  describe('Leadership Component', () => {
    it('contains leaders', async () => {
      const mockOfficeResponse = {
        officeLeadership: [6975, 6475, 6477],
        title: 'Alabama District Office',
        id: 6386
      }

      const mockLeadershipResponse = [
        {
          bio: {},
          emailAddress: 'Brooke.decubellis@sba.gov',
          fax: '202-481-1593',
          firstName: 'Brooke',
          highResolutionPhoto: {},
          lastName: 'DeCubellis',
          office: 6443,
          phone: '614-469-6860 x238',
          picture: {},
          shortBio: {},
          title: 'Public Affairs Specialist',
          type: 'person',
          url: '/person/brooke-decubellis',
          name: 'Brooke DeCubellis',
          id: 6975,
          updated: 1550777460,
          created: 1527676054,
          langCode: 'en'
        },
        {
          bio: {},
          emailAddress: 'Marichu.Relativo@sba.gov',
          fax: {},
          firstName: 'Marichu',
          highResolutionPhoto: {},
          lastName: 'Relativo',
          office: {},
          phone: '907-271-4861',
          picture: {},
          shortBio: {},
          title: 'Deputy District Director',
          type: 'person',
          url: '/person/marichu-relativo',
          name: 'Marichu Relativo',
          id: 6475,
          updated: 1550778305,
          created: 1527675677,
          langCode: 'en'
        },
        {
          bio: {},
          emailAddress: 'Ryan.Zachry@sba.gov',
          fax: {},
          firstName: 'Ryan',
          highResolutionPhoto: {},
          lastName: 'Zachry',
          office: 6387,
          phone: '907-271-4842',
          picture: {},
          shortBio: {},
          title: 'Business Opportunity Specialist',
          type: 'person',
          url: '/person/ryan-zachry',
          name: 'Ryan Zachry',
          id: 6477,
          updated: 1551469444,
          created: 1527675680,
          langCode: 'en'
        }
      ]

      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

      fetchSiteContentStub.mockImplementationOnce(() => {
        return Promise.resolve(eventsTestData)
      })

      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementationOnce(() => Promise.resolve(mockLeadershipResponse[0]))
      fetchRestContentStub.mockImplementationOnce(() => Promise.resolve(mockLeadershipResponse[1]))
      fetchRestContentStub.mockImplementationOnce(() => Promise.resolve(mockLeadershipResponse[2]))

      const { getByTestId, getAllByTestId } = render(<DistrictOffice office={mockOfficeResponse} />)
      let content = await waitForElement(() => getByTestId('office-leadership'))
      expect(content).toBeInTheDocument()

      content = await waitForElement(() => getAllByTestId('leader-card'))
      expect(content.length).toEqual(3)
    })
    it('contains no leaders', () => {
      const mockOfficeResponse = {
        officeLeadership: {},
        title: 'Alabama District Office',
        id: 6386
      }

      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

      fetchSiteContentStub.mockImplementationOnce(() => {
        return Promise.resolve(eventsTestData)
      })

      const { queryByTestId } = render(<DistrictOffice office={mockOfficeResponse} />)
      const content = queryByTestId('office-leadership')
      expect(content).not.toBeInTheDocument()
    })
  })
  it('renders document quicklinks section', async () => {

    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('documents')
      .mockImplementationOnce(() => Promise.resolve(mockDocumentResults))
    const mockOfficeData = { title: 'Fearless HQ', officeId: 99999 }
    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const documentLinks = getByTestId('office-document-links')
    expect(documentLinks).toBeInTheDocument()
  })
  describe.only('Sucess Stories Component', () => {
    it('should exist', async () => {
      const mockOfficeResponse = {
        officeLeadership: {},
        title: 'Alabama District Office',
        id: 6386
      }
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

      when(fetchSiteContentStub).calledWith('articles').mockImplementationOnce(props => {
        return Promise.resolve({
          items: []
        })
      })

      when(fetchSiteContentStub).calledWith('documents').mockImplementationOnce(props => {
        return Promise.resolve(mockDocumentResults)
      })

      when(fetchSiteContentStub).calledWith('events').mockImplementationOnce(props => {
        return Promise.resolve(eventsTestData)
      })

      when(fetchSiteContentStub).calledWith('blogs').mockImplementationOnce(props => {
        return Promise.resolve(blogsTestData)
      })

      const { queryByTestId } = render(<DistrictOffice office={mockOfficeResponse} />)
      const content = await waitForElement(() => queryByTestId('success-stories'))
      expect(content).toBeInTheDocument()
    })
    it('should have a length of 3', async () => {
      const mockOfficeResponse = {
        officeLeadership: {},
        title: 'Alabama District Office',
        id: 6386
      }
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

      when(fetchSiteContentStub).calledWith('articles').mockImplementationOnce(props => {
        return Promise.resolve({
          items: []
        })
      })

      when(fetchSiteContentStub).calledWith('documents').mockImplementationOnce(props => {
        return Promise.resolve(mockDocumentResults)
      })

      when(fetchSiteContentStub).calledWith('events').mockImplementationOnce(props => {
        return Promise.resolve(eventsTestData)
      })

      when(fetchSiteContentStub).calledWith('blogs').mockImplementationOnce(props => {
        return Promise.resolve(blogsTestData)
      })

      const { getByTestId, getAllByTestId } = render(<DistrictOffice office={mockOfficeResponse} />)
      let content = await waitForElement(() => getByTestId('success-stories'))
      expect(content).toBeInTheDocument()

      content = await waitForElement(() => getAllByTestId('success-story-card'))
      expect(content.length).toEqual(3)

    })
    it('should not render', async () => {
      const mockOfficeResponse = {
        officeLeadership: {},
        title: 'Alabama District Office',
        id: 6386
      }
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

      when(fetchSiteContentStub).calledWith('articles').mockImplementationOnce(props => {
        return Promise.resolve({
          items: []
        })
      })

      when(fetchSiteContentStub).calledWith('documents').mockImplementationOnce(props => {
        return Promise.resolve(mockDocumentResults)
      })

      when(fetchSiteContentStub).calledWith('events').mockImplementationOnce(props => {
        return Promise.resolve(eventsTestData)
      })

      when(fetchSiteContentStub).calledWith('blogs').mockImplementationOnce(props => {
        return Promise.resolve({
          blogs: []
        })
      })

      const { queryByTestId } = render(<DistrictOffice office={mockOfficeResponse} />)
      const content = queryByTestId('success-stories')
      expect(content).not.toBeInTheDocument()
    })
  })
})
