import React from 'react'
import renderer from 'react-test-renderer'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import { RelatedDocumentCards } from 'client/components/organisms/related-document-cards/related-document-cards'

const doc = relatedDocuments => ({
  documentIdType: 'SBA form',
  relatedDocuments,
  summary: 'This is a test document.',
  type: 'document',
  title: 'test document',
  id: 9999,
  updated: 1515091190,
  created: 1515091172,
  url: 'sba-form-object-object-test-document'
})

const jsx = (
  <RelatedDocumentCards data={doc([333, 444])} fetchContentIfNeeded={_ => Promise.resolve({ data: doc })} />
)

describe('related document cards', () => {
  test('renders correctly', () => {
    const tree = renderer.create(jsx).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // test('filters out deleted related documents after mounting', () => {
  // })
})
