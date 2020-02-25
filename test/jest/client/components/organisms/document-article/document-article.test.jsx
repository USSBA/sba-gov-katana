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
  // renders both article type and document type
  describe('fetchRestContent calls for data', () => {
    it('should make a fetchRestContent call for office data when the officeId is a number', async () => {
      const officeId = 7426
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948
      }

      const { getByTestId } = render(<DocumentArticle data={mockArticleData} type="article" />)
      await waitForElement(() => getByTestId('document-article'))
      expect(fetchRestContentStub).toBeCalledTimes(1)
      expect(fetchRestContentStub).toBeCalledWith(officeId)
    })

    it('should NOT make a fetchRestContent call for office data when the officeId is an object', async () => {
      const officeId = {}
      const mockArticleData = {
        office: officeId,
        programs: [],
        id: 3948
      }

      const { getByTestId } = render(<DocumentArticle data={mockArticleData} type="article" />)
      await waitForElement(() => getByTestId('document-article'))
      expect(fetchRestContentStub).not.toBeCalled()
    })
  })
})
