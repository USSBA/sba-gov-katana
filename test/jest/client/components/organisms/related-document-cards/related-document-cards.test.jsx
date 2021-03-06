import React from 'react'
import { mount, shallow } from 'enzyme'
import { RelatedDocumentCards, DetailCardCollection } from 'organisms'
import { fetchRestContent as mockFetchRestContent } from 'client/fetch-content-helper'

jest.mock('client/fetch-content-helper')

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
  beforeEach(() => {
    mockFetchRestContent.mockImplementation(() => jest.fn())
  })
  afterEach(() => {
    mockFetchRestContent.mockRestore()
  })

  test('should not render DetailDocumentCards component when there are no related documents', async () => {
    const customData = JSON.parse(data)
    mockFetchRestContent.mockReturnValue('')

    const component = shallow(<RelatedDocumentCards data={customData} />)
    await component.instance().componentDidMount()
    expect(component.find(DetailCardCollection).length).toEqual(0)
  })

  test('should render DetailDocumentCards component when there are related documents', async () => {
    const customData = JSON.parse(data)
    customData.relatedDocuments.push(2222)

    mockFetchRestContent.mockReturnValue(customData)

    const component = shallow(<RelatedDocumentCards data={customData} />)
    await component.instance().componentDidMount()
    expect(component.find(DetailCardCollection).length).toEqual(1)
  })

  test('should call fetchSiteContent() for each related document', async () => {
    const customData = JSON.parse(data)
    customData.relatedDocuments.push(2222, 3333)

    mockFetchRestContent.mockReturnValue(Promise.resolve(customData))

    const component = await shallow(<RelatedDocumentCards data={customData} />)
    expect(mockFetchRestContent).toHaveBeenCalledTimes(customData.relatedDocuments.length)
  })

  test('should update state with the related document data', async () => {
    const firstRelatedDocumentData = JSON.parse(data)
    firstRelatedDocumentData.documentIdType = 'Alternative form'
    firstRelatedDocumentData.id = 2222

    const secondRelatedDocumentData = JSON.parse(data)
    secondRelatedDocumentData.documentIdType = 'Random form'
    secondRelatedDocumentData.id = 3333

    const mainDocumentData = JSON.parse(data)
    mainDocumentData.relatedDocuments.push(2222, 3333)

    mockFetchRestContent.mockReturnValueOnce(firstRelatedDocumentData)
    mockFetchRestContent.mockReturnValueOnce(secondRelatedDocumentData)

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

    const component = await shallow(<RelatedDocumentCards data={mainDocumentData} />)
    const updatedState = (await component.update()).state('sortedDocuments')
    expect(updatedState).toMatchObject(mockSortedDocumentsInState)
  })
})
