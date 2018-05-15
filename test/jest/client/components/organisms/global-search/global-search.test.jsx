import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow } from 'enzyme'

import { GlobalSearch } from 'organisms/global-search/global-search'

jest.mock('../../../../../../src/client/services/utils.js')

const fetchContentIfNeeded = jest.fn()

const testPropsOne = {
  title: 'My Courses',
  type: 'courses',
  taxonomyFilters: ['businessStage'],
  actions: {
    fetchContentIfNeeded: fetchContentIfNeeded
  },
  location: {
    query: {
      topic: 'All'
    }
  }
}

const testPropsTwo = {
  title: 'My Courses',
  type: 'courses',
  taxonomyFilters: ['businessStage', 'program'],
  actions: {
    fetchContentIfNeeded: fetchContentIfNeeded
  },
  location: {
    query: {
      topic: 'Starting a business'
    }
  }
}

describe('GlobalSearch', () => {
  test('should render with one taxonomyFilter', () => {
    const props = _.clone(testPropsOne)
    const component = renderer.create(<GlobalSearch {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render with one taxonomyFilter', () => {
    const props = _.clone(testPropsOne)
    const component = renderer.create(<GlobalSearch {...props} />)
    const tree = component.toJSON()
  })

  test('should render with two taxonomyFilter', () => {
    const props = _.clone(testPropsTwo)
    const component = renderer.create(<GlobalSearch {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
