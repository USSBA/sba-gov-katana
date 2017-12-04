import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { Callout } from 'molecules'

const oneButtonAray = [
  {
    btnText: 'Single Button',
    btnType: 'LargeInversePrimaryButton'
  }
]

const twoButtonAray = [
  {
    btnText: 'First Button',
    btnType: 'LargeInversePrimaryButton'
  },
  {
    btnText: 'Second Button',
    btnType: 'LargeInversePrimaryButton'
  }
]

describe('callout component', () => {
  test('renders a title', () => {
    const tree = renderer.create(<Callout title={'This is a title'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('callout component', () => {
  test('renders a message', () => {
    const tree = renderer.create(<Callout message={'This is a message'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('callout component', () => {
  test('renders one button', () => {
    const tree = renderer.create(<Callout buttons={oneButtonAray} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('callout component', () => {
  test('renders two buttons', () => {
    const tree = renderer.create(<Callout buttons={twoButtonAray} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
