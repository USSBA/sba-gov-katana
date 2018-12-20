import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { ClientPagingMultiviewLayout, PagingMultiviewLayout } from 'organisms'

const PAGE_SIZE = 12
const TOTAL = 25

const resetMock = jest.fn()
const itemsStub = Array.apply(null, Array(TOTAL)).map((_, i) => i)
const rendererOneMock = jest.fn()
const rendererTwoMock = jest.fn()

const testProps = {
  onReset: resetMock,
  items: itemsStub,
  pageSize: PAGE_SIZE,
  rendererOne: rendererOneMock,
  rendererTwo: rendererTwoMock,
  rendererOneName: 'One',
  rendererTwoName: 'Two',
  type: 'lightsabers'
}

describe('ClientPagingMultiviewLayout', () => {
  test('should render and pass on many props ', () => {
    const wrapper = shallow(<ClientPagingMultiviewLayout {...testProps} />)
    expect(wrapper.find('div').children()).toHaveLength(1)
    const actualProps = wrapper.find('PagingMultiviewLayout').props()
    expect(actualProps.onReset).toBe(resetMock)
    expect(actualProps.itemCount).toBe(TOTAL)
    expect(actualProps.items).toEqual(itemsStub.slice(0, PAGE_SIZE))
    expect(actualProps.pageSize).toBe(PAGE_SIZE)
    expect(actualProps.rendererOne).toBe(rendererOneMock)
    expect(actualProps.rendererTwo).toBe(rendererTwoMock)
    expect(actualProps.rendererOneName).toBe('One')
    expect(actualProps.rendererTwoName).toBe('Two')
    expect(actualProps.type).toBe('lightsabers')

    // check default values
    expect(actualProps.pageNumber).toBe(1)
  })

  test('should update the child props on page change', () => {
    const wrapper = shallow(<ClientPagingMultiviewLayout {...testProps} />)
    expect(wrapper.find('div').children()).toHaveLength(1)
    wrapper.find('PagingMultiviewLayout').prop('onPageChange')(2)
    const actualProps = wrapper.find('PagingMultiviewLayout').props()
    expect(actualProps.items).toEqual(itemsStub.slice(PAGE_SIZE, TOTAL - 1))
    expect(actualProps.pageNumber).toBe(2)
  })
})
