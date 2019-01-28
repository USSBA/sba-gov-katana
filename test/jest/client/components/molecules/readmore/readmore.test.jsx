import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { clone } from 'lodash'

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
    history.pushState({}, null, '?lang=en')
    const props = clone(testProps)
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render read more button when not expanded', () => {
    history.pushState({}, null, '?lang=en')
    const props = clone(testProps)
    props.expanded = false
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render expanded ReadMore component', () => {
    history.pushState({}, null, '?lang=es')
    const props = clone(testProps)
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
