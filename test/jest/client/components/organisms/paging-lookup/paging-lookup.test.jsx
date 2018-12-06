/* eslint-disable no-undef */
/*global expect*/

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { PagingLookup } from 'organisms'
import * as helper from 'client/fetch-content-helper'
import * as utils from 'client/services/utils.js'

const props = {
  title: 'My Documents',
  type: 'documents',
  taxonomyFilters: ['documentType', 'documentActivity', 'validTaxonomyFilter'],
  fieldsToShowInDetails: ['Type', 'Name', 'Summary'],
  sortByOptions: ['Last Updated', 'Size'],
}

const testTaxonomies = [{
  name: 'documentType',
  terms: [
    'Information notice',
    'Policy Guidance',
    'Policy notice',
    'Procedural notice',
    'Report',
    'SBA form',
    'SOP',
    'Support',
    'TechNote'
  ]}]

describe('PagingLookup', () => {
  var mockGetQueryParams, mockFetchSiteContent
  beforeEach(() => {
    mockGetQueryParams = jest.spyOn(utils, 'getQueryParams')
    mockFetchSiteContent = jest.spyOn(helper, 'fetchSiteContent')
    mockFetchSiteContent.mockReturnValue(testTaxonomies)
  })
  afterEach(() => {
    mockGetQueryParams.mockRestore()
    mockFetchSiteContent.mockRestore()
  })
  test('should render with all the information', () => {
    const component = renderer.create(<PagingLookup {...props} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('should have an empty default query search', () => {
    mockGetQueryParams.mockReturnValue({})
    const result = shallow(<PagingLookup {...props} />).props().queryState
    expect(result.searchTerm).toBe('')
    expect(result.documentType).toBe('All')
    expect(result.documentActivity).toBe('All')
    expect(result.validTaxonomyFilter).toBe('All')
  })
  test("should accept a 'search' term", () => {
    mockGetQueryParams.mockReturnValue({ search: 'My Search Term' })
    const result = shallow(<PagingLookup {...props} />).first().props().queryState.searchTerm
    expect(result).toBe('My Search Term')
  })
  test("should accept a 'q' term", () => {
    mockGetQueryParams.mockReturnValue({q: 'My Q Search Term' })
    const result = shallow(<PagingLookup {...props} />).first().props().queryState.searchTerm
    expect(result).toBe('My Q Search Term')
  })
  test("should accept 'type' from the query string, converting it to documentType", () => {
    mockGetQueryParams.mockReturnValue({ type: 'SBA Form' })
    const result = shallow(<PagingLookup {...props} />).first().props().queryState.documentType
    expect(result).toBe('SBA Form')
  })
  test("should accept 'activity' from the query string, converting it to documentActivity", () => {
    mockGetQueryParams.mockReturnValue({ activity: 'All' })
    const result = shallow(<PagingLookup {...props} />).first().props().queryState.documentActivity
    expect(result).toBe('All')
  })
  test("should accept 'validTaxonomyFilter' from the query string if in the taxonomyFilter", () => {
    mockGetQueryParams.mockReturnValue({ validTaxonomyFilter: 'My Taxonomy Filter' })
    const result = shallow(<PagingLookup {...props} />).first().props().queryState.validTaxonomyFilter
    expect(result).toBe('My Taxonomy Filter')
  })
  test("should reject 'arbitraryNonsense' from the query string if NOT in the taxonomyFilter", () => {
    mockGetQueryParams.mockReturnValue({ arbitraryNonsense: 'My Arbitrary Nonsense'})
    const result = shallow(<PagingLookup {...props} />).first().props().queryState.arbitraryNonsense
    expect(result).toBeUndefined()
  })
})
