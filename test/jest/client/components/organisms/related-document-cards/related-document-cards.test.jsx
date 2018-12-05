import React from 'react'
import { shallow } from 'enzyme'
import { RelatedDocumentCards, DetailCardCollection } from 'organisms'
import * as helper from 'client/fetch-content-helper'

describe('RelatedDocumentCards', () => {
  let mockFetchSiteContent

  beforeEach(() => {
    mockFetchSiteContent = jest.spyOn(helper, 'fetchSiteContent')
  })
  afterEach(() => {
    mockFetchSiteContent.mockRestore()
  })

  test('should not render DetailDocumentCards component when there are no related documents', () => {
    mockFetchSiteContent.mockReturnValue('')
    const data = {
      documentIdType: 'SBA form',
      relatedDocuments: [],
      summary: 'This is a test document that has no related documents.',
      type: 'document',
      title: 'test document with no related documents',
      id: 1111,
      updated: 1515091190,
      created: 1515091172,
      url: 'sba-form-test-document-with-no-related-documents'
    }

    const component = shallow(<RelatedDocumentCards data={data} />)
    setImmediate(() => {
      expect(component.find(DetailCardCollection).length).toEqual(0)
    })
  })

  test('should render DetailDocumentCards component once when there are related documents', () => {
    // mock of return for the related document
    mockFetchSiteContent.mockReturnValue({
      documentIdType: 'SBA form',
      relatedDocuments: [2222, 4444],
      summary: 'This is a related test document.',
      type: 'document',
      title: 'related test document',
      id: 3333,
      updated: 1515091190,
      created: 1515091172,
      url: 'related-sba-form-test-document'
    })

    // data of the initial document
    const data = {
      documentIdType: 'SBA form',
      relatedDocuments: [3333],
      summary: 'This is a test document.',
      type: 'document',
      title: 'test document',
      id: 2222,
      updated: 1515091190,
      created: 1515091172,
      url: 'sba-form-test-document'
    }

    const component = shallow(<RelatedDocumentCards data={data} />)
    setImmediate(() => {
      expect(component.find(DetailCardCollection).length).toEqual(1)
    })
  })
})
