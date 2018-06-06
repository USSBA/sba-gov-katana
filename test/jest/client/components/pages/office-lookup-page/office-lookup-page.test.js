import React from 'react'
import { shallow, mount } from 'enzyme'
import { OfficeLookupPage } from 'pages/office-lookup-page/office-lookup-page.jsx'
import * as ContentActions from '../../../../../../src/client/actions/content.js'
import renderer from 'react-test-renderer'
var sinon = require('sinon')

describe('OfficeLookupPage', () => {
  it('should detect map object on page', () => {
    const props = {
      actions: {
        fetchContentIfNeeded: jest.fn()
      }
    }
    //const component = shallow(<OfficeLookupPage {...props} />);
    //expect(component.find('#office-map').length).toEqual(1);
  })
})
