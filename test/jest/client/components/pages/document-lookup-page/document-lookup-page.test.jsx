/*global expect*/

/* eslint-disable no-unused-vars,no-undef */
import React from 'react'
import DocumentLookupPage from 'pages/document-lookup-page/document-lookup-page.jsx'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

/*eslint-enable no-unused-vars*/
/*
import DocumentLookupPage from "client/components/pages/document-lookup-page/document-lookup-page.jsx";
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from "react-test-renderer";
import _ from "lodash";
*/

afterEach(cleanup)

const fetchSiteResults = [
  {
    name: 'program',
    terms: ['7(a)', '8(a)', 'Contracting']
  },
  {
    name: 'documentActivity',
    terms: ['Application', 'Closing', 'General']
  },
  {
    name: 'documentType',
    terms: ['SOP', 'Support', 'Report']
  }
]

const officeReturn = [
  {
    id: 1,
    title: 'SBA Office'
  },
  {
    id: 2,
    title: 'An SBA Office'
  }
]

describe('DocumentLookupPage', () => {
  // test('renders a page lookup with the correct attributes', () => {
  /*
    const renderer = new ShallowRenderer();
    const component = renderer.render(<DocumentLookupPage/>);
    expect(component).toMatchSnapshot();
    */
  // })

  it('renders the the document lookup page correctly', async () => {
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    fetchRestContentStub.mockImplementationOnce(() => {
      return officeReturn
    })
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub
      .mockImplementationOnce(() => {
        return fetchSiteResults
      })
      .mockImplementationOnce(() => {
        return fetchSiteResults
      })
      .mockImplementationOnce(() => {
        return fetchSiteResults
      })

    const { getByText, getByTestId } = render(<DocumentLookupPage />)
    const title = await waitForElement(() => getByText('Documentation Lookup'))
    expect(title).toBeInTheDocument()
    const officeDropdown = await waitForElement(() => getByTestId('office'))
    expect(officeDropdown).toBeInTheDocument()
  })
})
