import React from 'react'
import { shallow } from 'enzyme'
import FileTransferServicePage from 'pages/file-transfer-service-page/file-transfer-service-page.jsx'

describe('FileTransferServicePage', () => {
  it('should have one FileUploader component', () => {
    const component = shallow(<FileTransferServicePage />)
    expect(component.find('[data-testid="file-uploader"]').length).toEqual(1)
  })

  it('should have an input for email recipient', () => {
    const component = shallow(<FileTransferServicePage />)
    expect(component.find('[data-testid="recipient-email"]').length).toEqual(1)
  })

  it('should have an input for subject', () => {
    const component = shallow(<FileTransferServicePage />)
    expect(component.find('[data-testid="subject"]').length).toEqual(1)
  })

  it('should have an input for message', () => {
    const component = shallow(<FileTransferServicePage />)
    expect(component.find('[data-testid="message"]').length).toEqual(1)
  })

  it('should have an input for name', () => {
    const component = shallow(<FileTransferServicePage />)
    expect(component.find('[data-testid="full-name"]').length).toEqual(1)
  })

  it('should have an input for sender email', () => {
    const component = shallow(<FileTransferServicePage />)
    expect(component.find('[data-testid="sender-email"]').length).toEqual(1)
  })

  it('should have a button to send data', () => {
    const component = shallow(<FileTransferServicePage />)
    expect(component.find('[data-testid="send-button"]').length).toEqual(1)
  })
})
