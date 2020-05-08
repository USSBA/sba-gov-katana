import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import FileTransferServicePage from 'pages/file-transfer-service-page/file-transfer-service-page.jsx'

describe('FileTransferServicePage', () => {
	it('should have one FileUploader component', () => {
		const component = shallow(<FileTransferServicePage />)
		expect(component.find('[data-testid="file-uploader"]').length).toEqual(1)
	})
})