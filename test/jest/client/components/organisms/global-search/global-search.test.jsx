import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow } from 'enzyme'
import GlobalSearch from 'organisms/global-search/global-search'
import mockGetContentData from '../../test-data/global-search-get-content-data.json'

describe('GlobalSearch', () => {
  var mockGetTaxonomies, mockGetContent
  beforeEach(() => {
    mockGetTaxonomies = jest.spyOn(GlobalSearch.prototype, 'getTaxonomies')
    mockGetContent = jest.spyOn(GlobalSearch.prototype, 'getContent')
    const mockGetTaxonomiesData = [
      {
        name: 'businessStage',
        terms: ['Plan your business', 'Launch your business', 'Manage your business', 'Grow your business']
      }
    ]
    mockGetTaxonomies.mockReturnValue(mockGetTaxonomiesData)
    mockGetContent.mockReturnValue(mockGetContentData)
  })

  afterEach(() => {
    mockGetTaxonomies.mockRestore()
    mockGetContent.mockRestore()
  })

  test('should render with one taxonomyFilter', () => {
    const props = {
      title: 'My Courses',
      type: 'courses',
      taxonomyFilters: ['businessStage'],
      location: {
        query: {
          topic: 'All'
        }
      }
    }
    const component = renderer.create(<GlobalSearch {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render with two taxonomyFilter', () => {
    const props = {
      title: 'My Courses',
      type: 'courses',
      taxonomyFilters: ['businessStage', 'program'],
      location: {
        query: {
          topic: 'Starting a business'
        }
      }
    }
    const component = renderer.create(<GlobalSearch {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
