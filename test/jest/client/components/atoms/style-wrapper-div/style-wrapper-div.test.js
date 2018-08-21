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
    // note: these could be any React components (not native html) but to
    // limit component inter-dependencies chose to reuse this component
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
  it('Contains a div with the passed in class name', () => {
    const className = 'style'
    const componentWrapper = shallow(<StyleWrapperDiv className={className} />)
    expect(componentWrapper.find('div').prop('className')).toBe(className)
  })
  it('Does not pass the className prop to children', () => {
    const className = 'style'

    // note: these could be any React components (not native html) but to
    // limit component inter-dependencies chose to reuse this component
    const child1 = <StyleWrapperDiv />
    const child2 = <StyleWrapperDiv />
    const child3 = <StyleWrapperDiv />

    const componentWrapper = mount(
      <StyleWrapperDiv className={className}>
        {child1}
        {child2}
        {child3}
      </StyleWrapperDiv>
    )
  })
  it('Does not pass the className prop to children but passes all other props', () => {
    const className = 'style'
    const props = {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3'
    }
    // note: these could be any React components (not native html) but to
    // limit component inter-dependencies chose to reuse this component
    const child1 = <StyleWrapperDiv />
    const child2 = <StyleWrapperDiv />
    const child3 = <StyleWrapperDiv />

    const componentWrapper = mount(
      <StyleWrapperDiv {...props} className={className}>
        {child1}
        {child2}
        {child3}
      </StyleWrapperDiv>
    )
    // check that className wasn't passed to children
    expect(componentWrapper.childAt(0).prop('className')).toBeUndefined()
    expect(componentWrapper.childAt(1).prop('className')).toBeUndefined()
    expect(componentWrapper.childAt(2).prop('className')).toBeUndefined()

    // check that all other props are there
    expect(componentWrapper.childAt(0).props()).toEqual(props)
    expect(componentWrapper.childAt(1).props()).toEqual(props)
    expect(componentWrapper.childAt(2).props()).toEqual(props)
  })
})
