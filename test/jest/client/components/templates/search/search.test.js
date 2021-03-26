/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { stub } from 'sinon'
import SearchTemplate from 'client/components/templates/search/search.jsx'
import {
  fetchSiteContent as mockFetchSiteContent,
  fetchApiDistrictOfficeName as mockFetchApiDistrictOfficeName
} from 'client/fetch-content-helper'

jest.mock('client/fetch-content-helper')

const searchTemplateWrapper = shallow(<SearchTemplate searchType="myType" />)
const searchTemplateInstance = searchTemplateWrapper.instance()
const contentApiMock = require('./contentApiMock.json')

describe('Search Template', () => {
  beforeEach(() => {
    global.scrollTo = jest.fn()
  })

  it('updates query parameter values when onchange is called', () => {
    const queryParamName = 'myQueryParam'
    const userEnteredText = 'user entered text'
    const searchBar = shallow(<SearchTemplate searchType="none" />)
    expect(searchBar.state('searchParams')[queryParamName]).toBeUndefined()
    searchBar.instance().onChange(queryParamName, userEnteredText)
    expect(searchBar.state('searchParams')[queryParamName]).toEqual(userEnteredText)
  })

  describe('Search Template Paging', () => {
    it('filters pagination values from url #filterSearchParamsForUrl', () => {
      const searchParams = {
        pageSize: 5,
        start: 1,
        myParam: 'hey thar'
      }
      const filteredSearchParams = searchTemplateInstance.filterSearchParamsForUrl(searchParams)
      expect(filteredSearchParams).not.toHaveProperty('pageSize')
      expect(filteredSearchParams).not.toHaveProperty('start')
    })

    it('calculates page number as 1 with a negative startIndex #calculatePageNumber', () => {
      const maxPageNumber = 1000
      const maxPageStub = stub(searchTemplateInstance, 'calculateMaxPageNumber').returns(maxPageNumber)
      const pageSize = 5
      const startIndex = -1
      const expectedPageNumber = 1
      const pageNumber = searchTemplateInstance.calculatePageNumber(pageSize, startIndex)
      expect(pageNumber).toBe(expectedPageNumber)
      maxPageStub.restore()
    })

    it('calculates page number as 1 with a zero startIndex #calculatePageNumber', () => {
      const maxPageNumber = 1000
      const maxPageStub = stub(searchTemplateInstance, 'calculateMaxPageNumber').returns(maxPageNumber)
      const pageSize = 5
      const startIndex = 0
      const expectedPageNumber = 1
      const pageNumber = searchTemplateInstance.calculatePageNumber(pageSize, startIndex)
      expect(pageNumber).toBe(expectedPageNumber)
      maxPageStub.restore()
    })

    it('calculates page number as 1 with a startIndex less than pageSize #calculatePageNumber', () => {
      const maxPageNumber = 1000
      const maxPageStub = stub(searchTemplateInstance, 'calculateMaxPageNumber').returns(maxPageNumber)
      const pageSize = 5
      const startIndex = pageSize - 1
      const expectedPageNumber = 1
      const pageNumber = searchTemplateInstance.calculatePageNumber(pageSize, startIndex)
      expect(pageNumber).toBe(expectedPageNumber)
      maxPageStub.restore()
    })

    it('calculates page number as 2 with a startIndex equal to pageSize #calculatePageNumber', () => {
      const maxPageNumber = 1000
      const maxPageStub = stub(searchTemplateInstance, 'calculateMaxPageNumber').returns(maxPageNumber)
      const pageSize = 5
      const startIndex = pageSize
      const expectedPageNumber = 2
      const pageNumber = searchTemplateInstance.calculatePageNumber(pageSize, startIndex)
      expect(pageNumber).toBe(expectedPageNumber)
      maxPageStub.restore()
    })

    it('calculates page number as 2 with a startIndex >= pageSize and < pageSize*2 #calculatePageNumber', () => {
      const maxPageNumber = 1000
      const maxPageStub = stub(searchTemplateInstance, 'calculateMaxPageNumber').returns(maxPageNumber)
      const pageSize = 5
      const startIndex = 2 * pageSize - 1
      const expectedPageNumber = 2
      const pageNumber = searchTemplateInstance.calculatePageNumber(pageSize, startIndex)
      expect(pageNumber).toBe(expectedPageNumber)
      maxPageStub.restore()
    })

    it('calculates page number as 3 with a startIndex = 2 * pageSize #calculatePageNumber', () => {
      const maxPageNumber = 1000
      const maxPageStub = stub(searchTemplateInstance, 'calculateMaxPageNumber').returns(maxPageNumber)
      const pageSize = 5
      const startIndex = 2 * pageSize
      const expectedPageNumber = 3
      const pageNumber = searchTemplateInstance.calculatePageNumber(pageSize, startIndex)
      expect(pageNumber).toBe(expectedPageNumber)
      maxPageStub.restore()
    })

    it('returns max page number when it is less than the calculated page number #calculatePageNumber', () => {
      const maxPageNumber = 1
      const maxPageStub = stub(searchTemplateInstance, 'calculateMaxPageNumber').returns(maxPageNumber)
      const pageSize = 5
      const startIndex = 2 * pageSize
      const expectedPageNumber = maxPageNumber
      const pageNumber = searchTemplateInstance.calculatePageNumber(pageSize, startIndex)
      expect(pageNumber).toBe(expectedPageNumber)
      maxPageStub.restore()
    })

    it('calculates max page number as 1 when count is 0 #calculateMaxPageNumber', () => {
      const pageSize = 5
      const count = 0
      const expectedMaxPageNumber = 1
      const maxPageNumber = searchTemplateInstance.calculateMaxPageNumber(pageSize, count)
      expect(maxPageNumber).toBe(expectedMaxPageNumber)
    })

    it('calculates max page number as 1 when count is negative #calculateMaxPageNumber', () => {
      const pageSize = 5
      const count = -1
      const expectedMaxPageNumber = 1
      const maxPageNumber = searchTemplateInstance.calculateMaxPageNumber(pageSize, count)
      expect(maxPageNumber).toBe(expectedMaxPageNumber)
    })

    it('calculates max page number as 1 when count is less than pageSize #calculateMaxPageNumber', () => {
      const pageSize = 5
      const count = pageSize - 1
      const expectedMaxPageNumber = 1
      const maxPageNumber = searchTemplateInstance.calculateMaxPageNumber(pageSize, count)
      expect(maxPageNumber).toBe(expectedMaxPageNumber)
    })

    it('calculates max page number as 1 when count is equal to pageSize #calculateMaxPageNumber', () => {
      const pageSize = 5
      const count = pageSize - 1
      const expectedMaxPageNumber = 1
      const maxPageNumber = searchTemplateInstance.calculateMaxPageNumber(pageSize, count)
      expect(maxPageNumber).toBe(expectedMaxPageNumber)
    })

    it('calculates max page number as 2 when count > pageSize  and <= pageSize * 2 #calculateMaxPageNumber', () => {
      const pageSize = 5
      const count = pageSize + 1
      const expectedMaxPageNumber = 2
      const maxPageNumber = searchTemplateInstance.calculateMaxPageNumber(pageSize, count)
      expect(maxPageNumber).toBe(expectedMaxPageNumber)
    })

    it('calculates max page number as 2 when count = pageSize * 2 #calculateMaxPageNumber', () => {
      const pageSize = 5
      const count = pageSize * 2
      const expectedMaxPageNumber = 2
      const maxPageNumber = searchTemplateInstance.calculateMaxPageNumber(pageSize, count)
      expect(maxPageNumber).toBe(expectedMaxPageNumber)
    })

    it('calculates start index as 0 when page number is negative', () => {
      const pageNumber = -1
      const pageSize = 5
      const count = pageSize
      const expectedStartIndex = 0
      const maxPageNumber = searchTemplateInstance.calculateStartIndex(pageNumber, pageSize, count)
      expect(maxPageNumber).toBe(expectedStartIndex)
    })

    it('calculates start index as 0 when page number is 0', () => {
      const pageNumber = 0
      const pageSize = 5
      const count = pageSize
      const expectedStartIndex = 0
      const maxPageNumber = searchTemplateInstance.calculateStartIndex(pageNumber, pageSize, count)
      expect(maxPageNumber).toBe(expectedStartIndex)
    })

    it('calculates start index as 0 when page number is 1', () => {
      const pageNumber = 1
      const pageSize = 5
      const count = pageSize
      const expectedStartIndex = 0
      const maxPageNumber = searchTemplateInstance.calculateStartIndex(pageNumber, pageSize, count)
      expect(maxPageNumber).toBe(expectedStartIndex)
    })

    it('calculates start index as 0 when page number is negative', () => {
      const pageNumber = -1
      const pageSize = 5
      const count = pageSize
      const expectedStartIndex = 0
      const maxPageNumber = searchTemplateInstance.calculateStartIndex(pageNumber, pageSize, count)
      expect(maxPageNumber).toBe(expectedStartIndex)
    })

    it('calculates start index as the start index of the maximum page when the pageNumber > maxPageNumber', () => {
      const pageNumber = 200
      const pageSize = 5
      const count = pageSize * 2
      const expectedStartIndex = pageSize //maximum page = 2, start index of page 2 = (2-1)*5 = 5
      const maxPageNumber = searchTemplateInstance.calculateStartIndex(pageNumber, pageSize, count)
      expect(maxPageNumber).toBe(expectedStartIndex)
    })
  })

  describe('Query Parameter Handling', () => {
    it('ignores pageSize and start values passed in #generateQueryMap', () => {
      const urlQueryString = '?pageSize=100&start=99'
      const expectedQueryMap = {
        pageSize: searchTemplateWrapper.state().searchParams.pageSize,
        start: 0
      }
      const queryMap = searchTemplateInstance.generateQueryMap(urlQueryString)

      // The test below the commented line should virtually test the same thing...
      // expect(queryMap).not.toHaveProperty('pageSize') //since we don't need to have the pagesize property
      expect(Object.keys(queryMap).length).toBe(1) //since we don't need to have the pagesize property
      expect(queryMap.start).toBe(expectedQueryMap.start)
    })
  })

  describe('No Results', () => {
    it('displays the "No Results" messaging when a result set comes back empty', () => {
      mockFetchSiteContent.mockImplementation(() => Promise.resolve({ found: 0 }))

      const component = shallow(<SearchTemplate searchType="none" loadDefaultResults={true} />)
      component.setState({
        isLoading: false,
        hasNoResults: true
      })

      expect(component.update().find('#no-results').length).toBe(1)
    })
  })

  it('Search returns district office at the top', () => {
    const formatedResults = searchTemplateInstance.insertDistrictOffice(
      contentApiMock,
      'BALTIMORE DISTRICT OFFICE'
    )
    expect(formatedResults.results[0].fields.location_name[0]).toEqual('Baltimore District Office')
  })

  it('Search only contains 1 district office', () => {
    const formatedResults = searchTemplateInstance.insertDistrictOffice(
      contentApiMock,
      'BALTIMORE DISTRICT OFFICE'
    )

    const districtOffices = formatedResults.results.filter(
      obj => obj.fields.office_type[0] === 'SBA District Office'
    )

    expect(districtOffices.length).toEqual(1)
  })
})
