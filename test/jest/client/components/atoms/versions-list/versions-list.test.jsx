import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import VersionsList from 'client/components/atoms/versions-list/versions-list.jsx'

describe('All Versions', () => {
  const mockDocumentData = {
    documentIdNumber: 123,
    files: [
      {
        type: 'docFile',
        effectiveDate: null,
        expirationDate: null,
        fileUrl: '#',
        version: null
      },
      {
        type: 'docFile',
        effectiveDate: 'October 25, 2015',
        expirationDate: null,
        fileUrl:
          'https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt',
        version: '2.5'
      },
      {
        type: 'docFile',
        effectiveDate: null,
        expirationDate: null,
        fileUrl:
          'https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.',
        version: null
      },
      {
        type: 'docFile',
        effectiveDate: null,
        expirationDate: null,
        fileUrl:
          'https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.ext.pdf',
        version: null
      }
    ]
  }

  const mockSopData = {
    documentIdNumber: 321,
    documentIdType: 'SOP',
    files: [
      {
        type: 'docFile',
        effectiveDate: 'October 25, 2015',
        expirationDate: null,
        fileUrl:
          'https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt',
        version: '2.5'
      },
      {
        type: 'docFile',
        effectiveDate: 'October 25, 2015',
        expirationDate: null,
        fileUrl:
          'https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt',
        version: '2.5'
      }
    ]
  }

  const mockDocumentDataWithOneFile = {
    documentIdNumber: 123,
    files: [
      {
        type: 'docFile',
        effectiveDate: 'October 25, 2015',
        expirationDate: null,
        fileUrl:
          'https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt',
        version: '2.5'
      }
    ]
  }

  const mockDocumentDataWithNoFile = {
    documentIdNumber: 123,
    files: []
  }

  const mockDocumentDataWithoutFileArray = {
    documentIdNumber: 123
  }

  test('properly maps files array members to subsequent li tags', () => {
    const component = shallow(<VersionsList doc={mockDocumentData} />)
    expect(component.find('.allVersionsList li')).toHaveLength(mockDocumentData.files.length)
  })

  test('file array member is rendered as html structure when version, effectiveDate ARE NOT available, ', function() {
    const { files } = mockDocumentData
    const fileIndex = 0
    const file = files[fileIndex]
    const component = shallow(<VersionsList doc={mockDocumentData} />)

    let mockHtml = `<li><strong>Version N/A</strong>`
    mockHtml += `<strong>|</strong>`
    mockHtml += `Effective: N/A.`
    mockHtml += `<a href="${file.fileUrl}" target="_blank">Download`
    mockHtml += `</a></li>`

    expect(
      component
        .find('.allVersionsList li')
        .at(fileIndex)
        .html()
    ).toBe(mockHtml)
  })

  test('file array member is rendered as html structure when a version, effectiveDate ARE available, ', function() {
    const { files } = mockDocumentData
    const fileIndex = 1
    const file = files[fileIndex]
    const component = shallow(<VersionsList doc={mockDocumentData} />)

    let mockHtml = `<li><strong>Version ${file.version}</strong>`
    mockHtml += `<strong>|</strong>`
    mockHtml += `Effective: ${file.effectiveDate}.`
    mockHtml += `<a href="${files[fileIndex].fileUrl}" target="_blank">Download txt`
    mockHtml += `</a></li>`

    expect(
      component
        .find('.allVersionsList li')
        .at(fileIndex)
        .html()
    ).toBe(mockHtml)
  })

  test('file array member is rendered as html structure with the correct version label when the document type is "SOP"', function() {
    const { documentIdNumber, files } = mockSopData
    const fileIndex = 0
    const file = files[fileIndex]
    const componentWithSop = shallow(<VersionsList doc={mockSopData} />)

    let mockHtml = `<li><strong>${documentIdNumber} ${file.version}</strong>`
    mockHtml += `<strong>|</strong>`
    mockHtml += `Effective: ${file.effectiveDate}.`
    mockHtml += `<a href="${files[fileIndex].fileUrl}" target="_blank">Download txt`
    mockHtml += `</a></li>`

    expect(
      componentWithSop
        .find('.allVersionsList li')
        .at(fileIndex)
        .html()
    ).toBe(mockHtml)
  })

  test('file array member for file name ending in a period is rendered as html structure without file extension', function() {
    const { files } = mockDocumentData
    const fileIndex = 2
    const file = files[fileIndex]
    const component = shallow(<VersionsList doc={mockDocumentData} />)

    let mockHtml = `<li><strong>Version N/A</strong>`
    mockHtml += `<strong>|</strong>`
    mockHtml += `Effective: N/A.`
    mockHtml += `<a href="${file.fileUrl}" target="_blank">Download`
    mockHtml += `</a></li>`

    expect(
      component
        .find('.allVersionsList li')
        .at(fileIndex)
        .html()
    ).toBe(mockHtml)
  })

  test('file array member for pdf file name containing a period is rendered as html structure with pdf', function() {
    const { files } = mockDocumentData
    const fileIndex = 3
    const file = files[fileIndex]
    const component = shallow(<VersionsList doc={mockDocumentData} />)

    let mockHtml = `<li><strong>Version N/A</strong>`
    mockHtml += `<strong>|</strong>`
    mockHtml += `Effective: N/A.`
    mockHtml += `<a href="${file.fileUrl}" target="_blank">Download pdf`
    mockHtml += `<i class=\"pdf fa fa-file-pdf-o\"></i>`
    mockHtml += `</a></li>`

    expect(
      component
        .find('.allVersionsList li')
        .at(fileIndex)
        .html()
    ).toBe(mockHtml)
  })

  test('versions list is not rendered when there is one file', function() {
    const fileIndex = 0
    const component = shallow(<VersionsList doc={mockDocumentDataWithOneFile} />)

    expect(
      component
        .find('.allVersionsList li')
        .at(fileIndex)
        .html()
    ).toBe(null)
  })

  test('versions list is not rendered when there are no files', function() {
    const component = shallow(<VersionsList doc={mockDocumentDataWithNoFile} />)
    expect(component.find('.allVersionsList li')).toHaveLength(0)
  })

  test('versions list is not rendered when no files array exists', function() {
    const component = shallow(<VersionsList doc={mockDocumentDataWithoutFileArray} />)
    expect(component.find('.allVersionsList li')).toHaveLength(0)
  })
})
