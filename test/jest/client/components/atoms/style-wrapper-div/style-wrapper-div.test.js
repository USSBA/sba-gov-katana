/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { StyleWrapperDiv } from 'atoms'

describe('Style Wrapper Div', () => {
  it('Passes non-className props to children components', () => {
    const props = {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3'
    }
    const child1 = <StyleWrapperDiv />
    const child2 = <StyleWrapperDiv />
    const child3 = <StyleWrapperDiv />

    const componentWrapper = mount(
      <StyleWrapperDiv {...props}>
        {child1}
        {child2}
        {child3}
      </StyleWrapperDiv>
    )

    expect(componentWrapper.childAt(0).props()).toEqual(props)
    expect(componentWrapper.childAt(1).props()).toEqual(props)
    expect(componentWrapper.childAt(2).props()).toEqual(props)
  })
  it('Contains a div with the passed in style', () => {
    const className = 'style'
    const componentWrapper = shallow(<StyleWrapperDiv className={className} />)
    expect(componentWrapper.find('div').prop('className')).toBe(className)
  })
})
