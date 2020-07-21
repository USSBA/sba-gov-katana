/*global expect*/

import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, render } from 'react-testing-library'
import { TextSection } from 'atoms'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

describe('TextSection', () => {
  test('should render a simple paragraph', () => {
    const text = '<p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render several paragraphs', () => {
    const text = '<p>test</p><p>test</p><p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render several paragraphs with an unordered list in the middle', () => {
    const text = '<p>test</p><ul><li>1</li>1<li></li></ul><p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  afterEach(cleanup)

  describe('.parseTables(text)', () => {
    test('should add class of "text-section-table" to the table tag', () => {
      const text = '<table></table>'
      const tableClass = 'text-section-table'
      const { container } = render(<TextSection text={text} />)
      const table = container.querySelector(`table.${tableClass}`)
      expect(table).not.toBe(null)
    })

    test('should add class of "text-section-table" to each table tag when there are multiple tables', () => {
      const text = '<table></table><table></table>'
      const tableClass = 'text-section-table'

      const { container } = render(<TextSection text={text} />)
      const table1 = container.querySelector(`table:nth-of-type(1).${tableClass}`)
      const table2 = container.querySelector(`table:nth-of-type(2).${tableClass}`)
      expect(table1).not.toBe(null)
      expect(table2).not.toBe(null)
    })

    test('adds class with indexed value to a single td tag if there is no th header tag', () => {
      const text = '<table><tr><td>First Title</td><td>Second Title</td></tr></table>'
      const td1Class = 'index-0'

      const { container } = render(<TextSection text={text} />)
      const td1 = container.querySelector(`td:nth-of-type(1).${td1Class}`)
      expect(td1).not.toBe(null)
    })

    test('adds class with indexed values to multiple td tags if there is no th header tag', () => {
      const text = '<table><tr><td>First Title</td><td>Second Title</td></tr></table>'
      const td1Class = 'index-0'
      const td2Class = 'index-1'

      const { container } = render(<TextSection text={text} />)
      const td1 = container.querySelector(`td:nth-of-type(1).${td1Class}`)
      const td2 = container.querySelector(`td:nth-of-type(2).${td2Class}`)
      expect(td1).not.toBe(null)
      expect(td2).not.toBe(null)
    })

    test('reformats td tags to include div header of class "table-header-label" and div wrapper of class "table-data-wrapper"', () => {
      const text =
        '<table><thead><tr><th>Column 1 Header</th></tr></thead><tbody><tr><td>Test Title</td></tr></tbody></table>'
      const headerClass = 'table-header-label'
      const headerText = 'Column 1 Header'
      const wrapperClass = 'table-data-wrapper'
      const wrapperText = 'Test Title'

      const { container, getByText } = render(<TextSection text={text} />)
      const divHeader = container.querySelector(`div.${headerClass}`)
      const divWrapper = container.querySelector(`div.${wrapperClass}`)
      const divHeaderText = getByText(headerText)
      const divWrapperText = getByText(wrapperText)

      expect(divHeader).not.toBe(null)
      expect(divHeaderText).not.toBe(null)
      expect(divWrapper).not.toBe(null)
      expect(divWrapperText).not.toBe(null)
    })
  })
})
