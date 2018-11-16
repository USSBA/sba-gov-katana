import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'

import { ReadMore } from 'molecules'

const testProps = {
  parentId: 'text-readmore-section-3-read-more',
  buttonText: 'Read more',
  expanded: true,
  onToggleStatus: () => {},
  readMoreSectionItem: {
    expandedCopyText: 'This is a test.\r\nYes, this is the test.\r\nFour new lines.\r\nIt is good.',
    titleText: 'This is a title'
  }
}

describe('ReadMore', () => {
  test('should render expanded ReadMore component', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?lang=en'
    })
    const props = _.clone(testProps)
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render read more button when not expanded', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?lang=en'
    })
    const props = _.clone(testProps)
    props.expanded = false
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render expanded ReadMore component', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?lang=es'
    })
    const props = _.clone(testProps)
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
