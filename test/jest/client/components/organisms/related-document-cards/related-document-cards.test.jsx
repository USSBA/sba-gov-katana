import React from 'react'
import { shallow } from 'enzyme'
import { RelatedDocumentCards, DetailCardCollection } from 'organisms'
import * as helper from 'client/fetch-content-helper'

// TODO: write test(s) for sortRelatedDocuments function

// extend/modify this document data object for other testing
const data = JSON.stringify({
  documentIdType: 'SBA form',
  relatedDocuments: [],
  summary: 'This is a test document.',
  type: 'document',
  title: 'test document',
  id: 1111,
  updated: 1515091190,
  created: 1515091172,
  url: 'sba-form-test-document'
})

describe('RelatedDocumentCards', () => {
  let mockFetchSiteContent

  beforeEach(() => {
    mockFetchSiteContent = jest.spyOn(helper, 'fetchSiteContent')
  })
  afterEach(() => {
    mockFetchSiteContent.mockRestore()
  })

  test('should not render DetailDocumentCards component when there are no related documents', () => {
    let customData = JSON.parse(data)
    mockFetchSiteContent.mockReturnValue('')

    const component = shallow(<RelatedDocumentCards data={customData} />)
    setImmediate(() => {
      expect(component.find(DetailCardCollection).length).toEqual(0)
    })
  })

  test('should render DetailDocumentCards component when there are related documents', () => {
    let customData = JSON.parse(data)
    customData.relatedDocuments.push(2222)

    mockFetchSiteContent.mockReturnValue(customData)

    const component = shallow(<RelatedDocumentCards data={customData} />)
    setImmediate(() => {
      expect(component.find(DetailCardCollection).length).toEqual(1)
    })
  })

  test('should call fetchSiteContent() for each related document', () => {
    let customData = JSON.parse(data)
    customData.relatedDocuments.push(2222, 3333)

    mockFetchSiteContent.mockReturnValue(customData)

    shallow(<RelatedDocumentCards data={customData} />)
    setImmediate(() => {
      expect(mockFetchSiteContent.mock.calls.length).toEqual(customData.relatedDocuments.length)
    })
  })

  test('should update state with the related document data', () => {
    const firstRelatedDocumentData = JSON.parse(data)
    firstRelatedDocumentData.documentIdType = 'Alternative form'
    firstRelatedDocumentData.id = 2222

    const secondRelatedDocumentData = JSON.parse(data)
    secondRelatedDocumentData.documentIdType = 'Random form'
    secondRelatedDocumentData.id = 3333

    const mainDocumentData = JSON.parse(data)
    mainDocumentData.relatedDocuments.push(2222, 3333)

    mockFetchSiteContent.mockReturnValueOnce(firstRelatedDocumentData)
    mockFetchSiteContent.mockReturnValueOnce(secondRelatedDocumentData)

    const mockSortedDocumentsInState = {
      'Alternative form': [
        {
          created: 1515091172,
          documentIdType: 'Alternative form',
          id: 2222,
          relatedDocuments: [],
          summary: 'This is a test document.',
          title: 'test document',
          type: 'document',
          updated: 1515091190,
          url: 'sba-form-test-document'
        }
      ],
      'Random form': [
        {
          created: 1515091172,
          documentIdType: 'Random form',
          id: 3333,
          relatedDocuments: [],
          summary: 'This is a test document.',
          title: 'test document',
          type: 'document',
          updated: 1515091190,
          url: 'sba-form-test-document'
        }
      ]
    }

    const component = shallow(<RelatedDocumentCards data={mainDocumentData} />)
    setImmediate(() => {
      const updatedState = component.state('sortedDocuments')
      expect(updatedState).toMatchObject(mockSortedDocumentsInState)
    })
  })
})
