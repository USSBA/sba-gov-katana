import React from 'react'
import { shallow, mount } from 'enzyme'
import { OfficeLookupPage } from 'pages/office-lookup-page/office-lookup-page.jsx'
import { TaxonomyMultiSelect } from 'atoms'
import { PrimarySearchBar } from 'organisms'
import * as ContentActions from '../../../../../../src/client/actions/content.js'
import renderer from 'react-test-renderer'
var sinon = require('sinon')

describe('OfficeLookupPage', () => {
  // when OfficeLookUp page renders
  // is the TaxonomyMultiSelect component available?
  it('should detect one TaxonomyMultiSelect component', () => {
    const props = {
      actions: {
        fetchContentIfNeeded: jest.fn()
      }
    }
    const component = shallow(<OfficeLookupPage {...props} />)
    expect(component.find(TaxonomyMultiSelect)).toHaveLength(1)
  })
})
