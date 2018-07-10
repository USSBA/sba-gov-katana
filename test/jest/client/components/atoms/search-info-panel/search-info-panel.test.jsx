/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { SearchInfoPanel } from 'atoms'

describe('SearchInfoPanel atom', () => {
  test('displays search term', () => {
    const searchTerm = 'my Search Term'
    const component = shallow(<SearchInfoPanel searchTerm={searchTerm} />)
    const spanText = component.find('span').map(node => {
      return node.text()
    })
    expect(spanText).toContain(`"${searchTerm}"`)
  })

  test('displays text for zero results', () => {
    const expected = 'Results 0 - 0 of 0'
    const component = shallow(<SearchInfoPanel />)
    const spanText = component.find('span').map(node => {
      return node.text()
    })
    expect(spanText).toContain(expected)
  })

  test('displays text for less results than page size', () => {
    const [pageNumber, pageSize, total] = [1, 5, 3]
    const [pageStart, pageEnd] = [1, 3]
    const expected = `Results ${pageStart} - ${pageEnd} of ${total}`
    const component = shallow(<SearchInfoPanel pageNumber={pageNumber} pageSize={pageSize} total={total} />)
    const spanText = component.find('span').map(node => {
      return node.text()
    })
    expect(spanText).toContain(expected)
  })

  test('displays text for more results than page size', () => {
    const [pageNumber, pageSize, total] = [1, 5, 9]
    const [pageStart, pageEnd] = [1, 5]
    const expected = `Results ${pageStart} - ${pageEnd} of ${total}`
    const component = shallow(<SearchInfoPanel pageNumber={pageNumber} pageSize={pageSize} total={total} />)
    const spanText = component.find('span').map(node => {
      return node.text()
    })
    expect(spanText).toContain(expected)
  })

  test('displays text for results equal to page size', () => {
    const [pageNumber, pageSize, total] = [1, 5, 5]
    const [pageStart, pageEnd] = [1, 5]
    const expected = `Results ${pageStart} - ${pageEnd} of ${total}`
    const component = shallow(<SearchInfoPanel pageNumber={pageNumber} pageSize={pageSize} total={total} />)
    const spanText = component.find('span').map(node => {
      return node.text()
    })
    expect(spanText).toContain(expected)
  })

  test('displays numbers correctly when on the second page', () => {
    const [pageNumber, pageSize, total] = [2, 5, 20]
    const [pageStart, pageEnd] = [6, 10]
    const expected = `Results ${pageStart} - ${pageEnd} of ${total}`
    const component = shallow(<SearchInfoPanel pageNumber={pageNumber} pageSize={pageSize} total={total} />)
    const spanText = component.find('span').map(node => {
      return node.text()
    })
    expect(spanText).toContain(expected)
  })

  test('displays full search text when passed all parameters term', () => {
    const searchTerm = 'my Search Term'
    const [pageNumber, pageSize, total] = [1, 5, 20]
    const [pageStart, pageEnd] = [1, 5]
    const expected = `Results ${pageStart} - ${pageEnd} of ${total} for "${searchTerm}"`
    const component = shallow(
      <SearchInfoPanel searchTerm={searchTerm} pageNumber={pageNumber} pageSize={pageSize} total={total} />
    )
    const spanText = component.find('span').map(node => {
      return node.text()
    })
    expect(spanText).toContain(expected)
  })
})
