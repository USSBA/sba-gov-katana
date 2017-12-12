import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'

import { ReadMore } from 'molecules'

const testProps = {
  parentId: "text-readmore-section-3-read-more",
  expanded: true,
  onToggleStatus: () => {},
  readMoreSectionItem: {
    expandedCopyText: "This is a test.\r\nYes, this is the test.\r\nFour new lines.\r\nIt is good.",
    titleText: "This is a title"
  }
}

describe('ReadMore', () => {
  test('should render expanded ReadMore component', () => {
    const props = _.clone(testProps)
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree.children[0].props.className).toBe('title')
    expect(tree.children[0].children[0]).toBe('This is a title')
    expect(tree.children[3].type).toBe('p')
    expect(tree.children[3].children[0]).toBe('This is a test.\r')
    expect(tree.children[4].type).toBe('p')
    expect(tree.children[4].children[0]).toBe('Yes, this is the test.\r')
    expect(tree.children[5].type).toBe('p')
    expect(tree.children[5].children[0]).toBe('Four new lines.\r')
    expect(tree.children[6].type).toBe('p')
    expect(tree.children[6].children[0]).toBe('It is good.')
    expect(tree.children[7].type).toBe('button')
    expect(tree.children[7].children[0]).toBe('CLOSE')
  })

  test('should render read more button when not expanded', () => {
    const props = _.clone(testProps)
    props.expanded = false
    const component = renderer.create(<ReadMore {...props} />)
    const tree = component.toJSON()
    expect(tree.children[4].type).toBe('button')
    expect(tree.children[4].children[0]).toBe('READ MORE')
  })
})