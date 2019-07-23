import React from 'react'
import { cleanup, render, waitForElement } from 'react-testing-library'
import renderer from 'react-test-renderer'
import 'jest-dom/extend-expect'

import { QuickLinks } from 'client/components/molecules/quick-links/quick-links.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

describe('QuickLinks snapshot tests', () => {
  var mockFetchDocuments
  beforeEach(() => {
    mockFetchDocuments = jest.spyOn(QuickLinks.prototype, 'fetchDocuments')
  })

  afterEach(() => {
    mockFetchDocuments.mockRestore()
  })

  afterAll(() => {
    mockFetchDocuments.mockReset()
  })

  test('Most recent effective date displayed', () => {
    const mockData = {
      type: 'quickLinks',
      typeOfLinks: [
        {
          type: 'documentLookup',
          documentActivity: [],
          documentProgram: ['CDC/504'],
          documentType: ['SOP'],
          sectionHeaderText: 'SOPs'
        }
      ]
    }
    const mockDocuments = {
      count: 5,
      items: [
        {
          activitys: [
            'Authorization',
            'General',
            'Closing',
            'Credit and risk',
            'Investment and transactions'
          ],
          documentIdNumber: '873',
          documentIdType: 'SOP',
          files: [
            {
              type: 'docFile',
              effectiveDate: '1991-03-26',
              expirationDate: '2013-09-03',
              fileUrl: '',
              version: '1A'
            },
            {
              type: 'docFile',
              effectiveDate: '2013-09-04',
              expirationDate: '2015-09-03',
              fileUrl: '',
              version: '1B'
            },
            {
              type: 'docFile',
              effectiveDate: '2016-09-04',
              expirationDate: '2020-09-03',
              fileUrl: '',
              version: '2'
            }
          ],
          id: 3390,
          officeLink: {
            url: '',
            title: 'Office Title'
          },
          ombNumber: '52',
          programs: [
            'Lending programs',
            'CDC/504',
            'Microloans',
            'SBA operations',
            'Surety Bonds',
            'HUBZone',
            'Disaster assistance'
          ],
          summary: 'This is the summary of the first document',
          title: 'Document Title 1',
          type: 'document',
          updated: 1501764139,
          url: 'sop-873-document-title-1'
        }
      ]
    }
    const testProps = {
      navigation: {
        locationChange: {}
      },
      data: mockData
    }

    mockFetchDocuments.mockReturnValue({
      'documents-0': mockDocuments
    })

    const component = renderer.create(<QuickLinks {...testProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Future effective date is not displayed', () => {
    // Date.now will return 11/12/2017
    Date.now = jest.fn(() => 1510536484927)
    const currentDate = Date.now()
    const futureEffectiveDate = new Date(2510536484927)
    const futureExpirationDate = new Date(3510536484927)
    const mockData = {
      type: 'quickLinks',
      typeOfLinks: [
        {
          type: 'documentLookup',
          documentActivity: [],
          documentProgram: ['CDC/504'],
          documentType: ['SOP'],
          sectionHeaderText: 'SOPs'
        }
      ]
    }
    const mockDocuments = {
      count: 5,
      items: [
        {
          activitys: [
            'Authorization',
            'General',
            'Closing',
            'Credit and risk',
            'Investment and transactions'
          ],
          documentIdNumber: '691',
          documentIdType: 'SOP',
          files: [
            {
              type: 'docFile',
              effectiveDate: '1991-03-26',
              expirationDate: '2013-09-03',
              fileUrl: '',
              version: '1'
            },
            {
              type: 'docFile',
              effectiveDate: futureEffectiveDate,
              expirationDate: futureExpirationDate,
              fileUrl: '',
              version: '2'
            }
          ],
          id: 3386,
          officeLink: {
            url: '',
            title: 'Office Title'
          },
          ombNumber: '503',
          programs: [
            'Contracting',
            '7(a)',
            'CDC/504',
            'SBA operations',
            'SBIC',
            'Surety Bonds',
            'Disaster assistance'
          ],
          summary: 'This is the summary of the second document',
          title: 'Document Title 2',
          type: 'document',
          updated: 1501764139,
          url: 'sop-691-document-title-2'
        }
      ]
    }
    const testProps = {
      navigation: {
        locationChange: {}
      },
      data: mockData
    }

    mockFetchDocuments.mockReturnValue({
      'documents-0': mockDocuments
    })

    const component = renderer.create(<QuickLinks {...testProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('SOP number exists and is displayed', () => {
    const mockData = {
      type: 'quickLinks',
      typeOfLinks: [
        {
          type: 'documentLookup',
          documentActivity: [],
          documentProgram: ['CDC/504'],
          documentType: ['SOP'],
          sectionHeaderText: 'SOPs'
        }
      ]
    }
    const mockDocuments = {
      count: 5,
      items: [
        {
          activitys: [
            'Authorization',
            'General',
            'Closing',
            'Credit and risk',
            'Investment and transactions'
          ],
          documentIdNumber: '42',
          documentIdType: 'SOP',
          files: [
            {
              type: 'docFile',
              effectiveDate: '1991-03-26',
              expirationDate: '1992-09-03',
              fileUrl: '',
              version: ''
            },
            {
              type: 'docFile',
              effectiveDate: '1992-09-04',
              expirationDate: '1993-09-03',
              fileUrl: '',
              version: ''
            },
            {
              type: 'docFile',
              effectiveDate: '1993-09-04',
              expirationDate: '1994-09-03',
              fileUrl: '',
              version: ''
            },
            {
              type: 'docFile',
              effectiveDate: '1994-09-04',
              expirationDate: '1995-09-03',
              fileUrl: '',
              version: ''
            },
            {
              type: 'docFile',
              effectiveDate: '1995-09-04',
              expirationDate: '2013-09-03',
              fileUrl: '',
              version: ''
            },
            {
              type: 'docFile',
              effectiveDate: '2013-09-04',
              expirationDate: '2020-09-03',
              fileUrl: '',
              version: ''
            }
          ],
          id: 3399,
          officeLink: {
            url: '',
            title: 'Office Title'
          },
          ombNumber: '97',
          programs: [
            'Contracting',
            '7(a)',
            'CDC/504',
            'SBA operations',
            'SBIC',
            'Surety Bonds',
            'Disaster assistance'
          ],
          summary: 'This is the summary of the third document',
          title: 'Document Title 3',
          type: 'document',
          updated: 1501764139,
          url: 'sop-42-document-title-3'
        }
      ]
    }
    const testProps = {
      navigation: {
        locationChange: {}
      },
      data: mockData
    }

    mockFetchDocuments.mockReturnValue({
      'documents-0': mockDocuments
    })

    const component = renderer.create(<QuickLinks {...testProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('No SOP number so it is not displayed', () => {
    const mockData = {
      type: 'quickLinks',
      typeOfLinks: [
        {
          type: 'documentLookup',
          documentActivity: [],
          documentProgram: ['CDC/504'],
          documentType: ['SOP'],
          sectionHeaderText: 'SOPs'
        }
      ]
    }
    const mockDocuments = {
      count: 5,
      items: [
        {
          activitys: [
            'Authorization',
            'General',
            'Closing',
            'Credit and risk',
            'Investment and transactions'
          ],
          documentIdNumber: '',
          documentIdType: 'SOP',
          files: [
            {
              type: 'docFile',
              effectiveDate: '1991-03-26',
              expirationDate: '1992-09-03',
              fileUrl: '',
              version: ''
            }
          ],
          id: 3444,
          officeLink: {
            url: '',
            title: 'Office Title'
          },
          ombNumber: '97',
          programs: [
            'Contracting',
            '7(a)',
            'CDC/504',
            'SBA operations',
            'SBIC',
            'Surety Bonds',
            'Disaster assistance'
          ],
          summary: 'This is the summary of the third document',
          title: 'Document Title 4',
          type: 'document',
          updated: 1501764139,
          url: 'sop-42-document-title-4'
        }
      ]
    }
    const testProps = {
      navigation: {
        locationChange: {}
      },
      data: mockData
    }

    mockFetchDocuments.mockReturnValue({
      'documents-0': mockDocuments
    })

    const component = renderer.create(<QuickLinks {...testProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(cleanup)

describe('Quick Links unit tests', () => {
  test('makes fetch request for documents using given office id', async () => {
    const mockPropsData = {
      type: 'quickLinks',
      typeOfLinks: [
        {
          documentActivity: [],
          documentProgram: [],
          documentType: [],
          type: 'documentLookup',
          documentOffice: 3000,
          sectionHeaderText: 'Document List for Office'
        }
      ]
    }

    const mockFetchSiteContent = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    mockFetchSiteContent.mockReturnValue({})

    render(<QuickLinks data={mockPropsData} />)

    const expectedQueryParams = {
      activity: 'all',
      end: 3,
      office: 3000,
      program: 'all',
      sortBy: 'Last Updated',
      start: 0,
      type: 'all'
    }
    expect(mockFetchSiteContent).toHaveBeenCalledOnce
    expect(mockFetchSiteContent).toHaveBeenCalledWith('documents', expectedQueryParams)

    mockFetchSiteContent.mockRestore()
    mockFetchSiteContent.mockReset()
  })

  test('displays document for an office when given an office id', async () => {
    const mockPropsData = {
      type: 'quickLinks',
      typeOfLinks: [
        {
          documentActivity: [],
          documentProgram: [],
          documentType: [],
          type: 'documentLookup',
          documentOffice: 3000,
          sectionHeaderText: 'Document List for Office'
        }
      ]
    }

    const mockResponse = {
      count: 1,
      items: [
        {
          files: [{ id: 10 }],
          id: 200,
          office: 3000,
          title: 'Test Document for Office',
          type: 'document',
          url: '/document/test-document-for-office'
        }
      ]
    }

    const mockFetchSiteContent = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    mockFetchSiteContent.mockReturnValue(mockResponse)

    const { getAllByTestId } = render(<QuickLinks data={mockPropsData} />)
    const documentLink = await waitForElement(() => getAllByTestId('document-link'))

    expect(documentLink.length).toEqual(1)
    expect(documentLink[0]).toHaveTextContent('Test Document for Office')

    mockFetchSiteContent.mockReset()
  })
})
