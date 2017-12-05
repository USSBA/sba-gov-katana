import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'

import { ReadMore } from 'molecules'

const testProps = {
  parentId: "text-readmore-section-3-read-more",
  expanded: true,
  readMoreSectionItem: "This is a test.\r\nYes, this is the test.\r\nThree new lines.\r\nIt is good."
}

describe('ReadMore', () => {
  test('should render ReadMore component', () => {
    const props = _.clone(testProps)
    const component = shallow(<ReadMore {...props} />)
    expect(component).toMatchSnapshot()
  })

  test('should render close ReadMore component link when expanded', () => {
    const props = _.clone(testProps)
    const component = shallow(<ReadMore {...props} />)
    component.instance().makeExpanded(props.readMoreSectionItem)
    expect(component.first().props().children[4].props.text).toBe('CLOSE')
  })
})