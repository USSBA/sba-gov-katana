import React from 'react'
import { shallow } from 'enzyme'
import OfficeLookupPage from 'pages/office-lookup-page/office-lookup-page.jsx'
import { TaxonomyMultiSelect } from 'atoms'
var sinon = require('sinon')
import * as helper from 'client/fetch-content-helper'
import 'react-testing-library/cleanup-after-each'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('OfficeLookupPage', () => {
  // when OfficeLookUp page renders
  // is the TaxonomyMultiSelect component available?
  it('should detect one TaxonomyMultiSelect component', () => {
    const stubFetchSiteContent = sinon.stub(helper, 'fetchSiteContent')
    stubFetchSiteContent.returns(Promise.resolve([]))
    const component = shallow(<OfficeLookupPage />)
    expect(component.find(TaxonomyMultiSelect)).toHaveLength(1)
  })
})

describe('office lookup search', () => {
  beforeEach(() => {
    render(<OfficeLookupPage />)
  })

  test('zip code value is validated when clicked outside of the zip search field', () => {
    const zipCodeField = screen.getByTestId('zip')
    const searchTitle = screen.getByRole('heading', {
      name: /find local assistance/i
    })
    userEvent.click(zipCodeField)
    userEvent.type(zipCodeField, '211')
    userEvent.click(searchTitle)
    expect(screen.queryByText(/enter a 5\-digit zip code\./i)).toBeInTheDocument()
  })

  test('zip code value can be empty when you click search', () => {
    const zipCodeField = screen.getByTestId('zip')
    const searchButton = screen.getByRole('button', {
      name: /search/i
    })
    userEvent.click(zipCodeField)
    userEvent.type(zipCodeField, '')
    userEvent.click(searchButton)
    expect(screen.queryByText(/enter a 5\-digit zip code\./i)).not.toBeInTheDocument()
  })

  test('form will submit if the zipcode value is 5 digits', () => {
    const zipCodeField = screen.getByTestId('zip')
    const searchButton = screen.getByRole('button', {
      name: /search/i
    })
    userEvent.click(zipCodeField)
    userEvent.type(zipCodeField, '21044')
    userEvent.click(searchButton)
    expect(screen.queryByText(/enter a 5\-digit zip code\./i)).not.toBeInTheDocument()
  })
})
