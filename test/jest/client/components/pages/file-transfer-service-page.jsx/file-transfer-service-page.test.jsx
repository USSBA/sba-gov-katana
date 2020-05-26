import React from 'react'
<<<<<<< HEAD
import { shallow } from 'enzyme'
=======
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import axios from 'axios'
>>>>>>> TA-3686 build email data object and convert files to base64 for sending
import FileTransferServicePage from 'pages/file-transfer-service-page/file-transfer-service-page.jsx'
import postFormData from 'pages/file-transfer-service-page/file-transfer-service-page.jsx'

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
<<<<<<< HEAD
=======

  it.only('should submit form data', () => {
    console.log('POST FORM DATA', postFormData)
    const postFormDataSpy = sinon.spy(postFormData)

    const component = shallow(<FileTransferServicePage />)
    const button = component.find('[data-testid="send-button"]')

    button.simulate('click')

    // expect(postFormDataSpy.calledOnce).toEqual(true)

    // axiosPostStub.reset()
    // axiosPostStub.restore()
  })
>>>>>>> TA-3686 build email data object and convert files to base64 for sending
})
