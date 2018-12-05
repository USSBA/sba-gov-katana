/* eslint-disable no-undef */
/*global expect*/

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import _ from 'lodash'
import { PagingLookup } from 'organisms'
import * as helper from 'client/fetch-content-helper'
import { getQueryParams } from '../../../../../../src/client/services/utils.js'
jest.mock('../../../../../../src/client/services/utils.js')
getQueryParams.mockImplementation(() => {
  return {}
})

const testProps = {
  title: 'My Documents',
  type: 'documents',
  taxonomyFilters: ['documentType', 'documentActivity', 'validTaxonomyFilter'],
  fieldsToShowInDetails: ['Type', 'Name', 'Summary'],
  sortByOptions: ['Last Updated', 'Size'],
}

describe('PagingLookup', () => {
  var mockFetchSiteContent
  beforeEach(() => {
    mockFetchSiteContent = jest.spyOn(helper, 'fetchSiteContent')
    mockFetchSiteContent.mockReturnValue([])
  })
  afterEach(() => {
    mockFetchSiteContent.mockRestore()
  })
  test('should render with all the information', () => {
    const props = _.clone(testProps)
    const component = renderer.create(<PagingLookup {...props} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('should have an empty default query search', () => {
    getQueryParams.mockImplementationOnce(() => {
      return {}
    })
    const component = shallow(<PagingLookup {...testProps} />)
    expect(component.first().props().queryState.searchTerm).toBe('')
    expect(component.first().props().queryState.documentType).toBe('All')
    expect(component.first().props().queryState.documentActivity).toBe('All')
    expect(component.first().props().queryState.validTaxonomyFilter).toBe('All')
  })
  test("should accept a 'search' term", () => {
    getQueryParams.mockImplementationOnce(() => {
      return { search: 'My Search Term' }
    })
    const component = shallow(<PagingLookup {...testProps} />)
    expect(component.first().props().queryState.searchTerm).toBe('My Search Term')
  })
  test("should accept a 'q' term", () => {
    getQueryParams.mockImplementationOnce(() => {
      return { q: 'My Q Search Term' }
    })
    const component = shallow(<PagingLookup {...testProps} />)
    expect(component.first().props().queryState.searchTerm).toBe('My Q Search Term')
  })
  test("should accept 'type' from the query string, converting it to documentType", () => {
    getQueryParams.mockImplementationOnce(() => {
      return { type: 'SBA Form' }
    })
    const component = shallow(<PagingLookup {...testProps} />)
    expect(component.first().props().queryState.documentType).toBe('SBA Form')
  })
  test("should accept 'activity' from the query string, converting it to documentActivity", () => {
    getQueryParams.mockImplementationOnce(() => {
      return { activity: 'All' }
    })
    const component = shallow(<PagingLookup {...testProps} />)
    expect(component.first().props().queryState.documentActivity).toBe('All')
  })
  test("should accept 'validTaxonomyFilter' from the query string if in the taxonomyFilter", () => {
    getQueryParams.mockImplementationOnce(() => {
      return { validTaxonomyFilter: 'My Taxonomy Filter' }
    })
    const component = shallow(<PagingLookup {...testProps} />)
    expect(component.first().props().queryState.validTaxonomyFilter).toBe('My Taxonomy Filter')
  })
  test("should reject 'arbitraryNonsense' from the query string if NOT in the taxonomyFilter", () => {
    getQueryParams.mockImplementationOnce(() => {
      return { arbitraryNonsense: 'My Arbitrary Nonsense' }
    })
    const component = shallow(<PagingLookup {...testProps} />)
    expect(component.first().props().queryState.arbitraryNonsense).toBeUndefined()
  })
})
