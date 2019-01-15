import React from 'react'
import { shallow } from 'enzyme'
import { FileTypeIcon } from 'atoms'

describe('FileTypeIcon', () => {
  test('it should return pdf icon when the file extension is pdf', () => {
    const pdfHtml = '<i class="fa fa-file-pdf-o" data-cy="pdf icon"></i>'
    const component = shallow(<FileTypeIcon fileExtension="pdf" />)
    expect(component.html()).toBe(pdfHtml)
  })

  test('it should return null when there is no icon for the given file extension', () => {
    const component = shallow(<FileTypeIcon fileExtension="fakeExtension" />)
    expect(component.html()).toBe(null)
  })
})
