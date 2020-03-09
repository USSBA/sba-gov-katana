import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { DocumentArticle } from '../../../../../../src/client/components/organisms/document-article/document-article.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

let fetchRestContentStub

beforeEach(function() {
  fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
})

afterEach(function() {
  fetchRestContentStub.mockReset()
  cleanup()
})

afterAll(function() {
  fetchRestContentStub.mockRestore()
})

describe('DocumentArticle', () => {
  describe('document and article types', () => {
    it('should render for a document', async () => {
      const mockDocumentData = {
        programs: [],
        id: 3948,
        type: 'document'
      }

      const { queryByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      const documentComponent = await waitForElement(() => queryByTestId('document-article'))
      expect(documentComponent).toBeInTheDocument()
    })

    it('should render for an article', async () => {
      const mockArticleData = {
        programs: [],
        id: 3948,
        type: 'article'
      }

      const { queryByTestId } = render(<DocumentArticle data={mockArticleData} />)
      const articleComponent = await waitForElement(() => queryByTestId('document-article'))
      expect(articleComponent).toBeInTheDocument()
    })
  })

  describe('fetchRestContent calls for data', () => {
    it('should make a fetchRestContent call for office data when the officeId is a number', async () => {
      const officeId = 7426
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'article'
      }

      const { getByTestId } = render(<DocumentArticle data={mockArticleData} />)
      await waitForElement(() => getByTestId('document-article'))
      expect(fetchRestContentStub).toBeCalledTimes(1)
      expect(fetchRestContentStub).toBeCalledWith(officeId)
    })

    it('should NOT make a fetchRestContent call for office data when the officeId is an object', async () => {
      const officeId = {}
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'article'
      }

      const { getByTestId } = render(<DocumentArticle data={mockArticleData} />)
      await waitForElement(() => getByTestId('document-article'))
      expect(fetchRestContentStub).not.toBeCalled()
    })
  })

  describe('render office info', () => {
    it('should display office title and url from the office data when both exist', async () => {
      const title = '7(a) Loans'
      const url = '/document/sba-form-7a-loans'
      const officeId = 7426
      const mockDocumentData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'document'
      }
      const officeDataWithTitleAndUrl = {
        title: title,
        website: {
          url: url
        },
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeDataWithTitleAndUrl)

      const { getByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      const officeLink = await waitForElement(() => getByTestId('office link'))
      expect(officeLink).toHaveTextContent(title)
    })

    it('should display office title and url from the office link in the original data (document or article) when office data does NOT contain title and url', async () => {
      const title = '7(a) Loans'
      const url = '/document/sba-form-7a-loans'
      const officeId = 7426
      const mockDocumentData = {
        office: officeId,
        officeLink: {
          title: title,
          url: url
        },
        programs: [],
        id: 3948,
        type: 'document'
      }
      const officeDataWithNoTitleNoUrl = {
        title: {},
        website: {
          url: {}
        },
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeDataWithNoTitleNoUrl)

      const { getByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      const officeLink = await waitForElement(() => getByTestId('office link'))
      expect(officeLink).toHaveTextContent(title)
    })

    it('should NOT display office title when there is no url', async () => {
      const title = '7(a) Loans'
      const officeId = 7426
      const mockDocumentData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'document'
      }
      const officeDataWithTitleAndUrl = {
        title: title,
        website: {
          url: {}
        },
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeDataWithTitleAndUrl)

      const { getByTestId, queryByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      await waitForElement(() => getByTestId('office and contact info'))
      const officeLink = queryByTestId('office link')
      expect(officeLink).not.toBeInTheDocument()
    })
  })
  describe('508 compliance section', () => {
    it('should display the Noncompliant508FlashMessage when the document is from the noncompliant file directory', async () => {
      const mockDocumentData = {
        programs: [],
        id: 3948,
        type: 'document',
        files: [
          {
            fileUrl: '/sites/default/files/sba/example.pdf'
          }
        ]
      }

      const { queryByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      await waitForElement(() => queryByTestId('document-article'))
      const complianceComponent = queryByTestId('not-compliant-message')
      expect(complianceComponent).toBeInTheDocument()
    })
    it('should NOT display the Noncompliant508FlashMessage when the document is from the noncompliant file directory', async () => {
      const mockDocumentData = {
        programs: [],
        id: 3948,
        type: 'document',
        files: [
          {
            fileUrl: '/sites/default/files/2020-01/example.pdf'
          }
        ]
      }

      const { queryByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      await waitForElement(() => queryByTestId('document-article'))
      const complianceComponent = queryByTestId('not-compliant-message')
      expect(complianceComponent).not.toBeInTheDocument()
    })
    it('should NOT display the Noncompliant508FlashMessage when no file URL is present', async () => {
      const mockDocumentData = {
        programs: [],
        id: 3948,
        type: 'document',
        files: [
          {
            fileUrl: '/sites/default/files/2020-01/example.pdf'
          }
        ]
      }

      const { queryByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      await waitForElement(() => queryByTestId('document-article'))
      const complianceComponent = queryByTestId('not-compliant-message')
      expect(complianceComponent).not.toBeInTheDocument()
    })
  })

  describe('office and contact info section', () => {
    it('should display contact section for an article', async () => {
      const officeId = 7426
      const mockArticleData = {
        mediaContacts: [123],
        office: officeId,
        programs: [],
        id: 3948,
        type: 'article'
      }
      const officeData = {
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeData)

      const { queryByTestId } = render(<DocumentArticle data={mockArticleData} />)
      await waitForElement(() => queryByTestId('office and contact info'))
      const contactInfo = queryByTestId('contact info')

      expect(contactInfo).toBeInTheDocument()
    })

    it('should NOT display contact section for a document', async () => {
      const officeId = 7426
      const mockDocumentData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'document'
      }
      const officeData = {
        mediaContact: 6490,
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeData)

      const { queryByTestId } = render(<DocumentArticle data={mockDocumentData} />)
      await waitForElement(() => queryByTestId('office and contact info'))
      const contactInfo = queryByTestId('contact info')

      expect(contactInfo).not.toBeInTheDocument()
    })

    it('should display office link and contact info when both exist', async () => {
      const officeId = 7426
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'article'
      }
      const officeData = {
        mediaContact: 6490,
        title: '7(a) Loans',
        website: {
          url: '/document/sba-form-7a-loans'
        },
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeData)

      const { queryByTestId } = render(<DocumentArticle data={mockArticleData} />)
      await waitForElement(() => queryByTestId('office and contact info'))
      const officeLink = queryByTestId('office link')
      const contactInfo = queryByTestId('contact info')

      expect(officeLink).toBeInTheDocument()
      expect(contactInfo).toBeInTheDocument()
    })

    it('should display office link when contact info does not exist', async () => {
      const officeId = 7426
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'article'
      }
      const officeData = {
        mediaContact: {},
        title: '7(a) Loans',
        website: {
          url: '/document/sba-form-7a-loans'
        },
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeData)

      const { queryByTestId } = render(<DocumentArticle data={mockArticleData} />)
      await waitForElement(() => queryByTestId('office and contact info'))
      const officeLink = queryByTestId('office link')
      const contactInfo = queryByTestId('contact info')

      expect(officeLink).toBeInTheDocument()
      expect(contactInfo).not.toBeInTheDocument()
    })

    it('should display contact info when office link does not exist', async () => {
      const officeId = 7426
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'article'
      }
      const officeData = {
        mediaContact: 6490,
        title: {},
        website: {},
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeData)

      const { queryByTestId } = render(<DocumentArticle data={mockArticleData} />)
      await waitForElement(() => queryByTestId('office and contact info'))
      const contactInfo = queryByTestId('contact info')
      const officeLink = queryByTestId('office link')

      expect(contactInfo).toBeInTheDocument()
      expect(officeLink).not.toBeInTheDocument()
    })

    it('should NOT display office link and contact info when neither exist', async () => {
      const officeId = 7426
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948,
        type: 'article'
      }
      const officeData = {
        mediaContact: {},
        title: {},
        website: {},
        id: officeId
      }
      fetchRestContentStub.mockReturnValue(officeData)

      const { queryByTestId } = render(<DocumentArticle data={mockArticleData} />)
      await waitForElement(() => queryByTestId('office and contact info'))
      const contactInfo = queryByTestId('contact info')
      const officeLink = queryByTestId('office link')

      expect(contactInfo).not.toBeInTheDocument()
      expect(officeLink).not.toBeInTheDocument()
    })
  })
})
