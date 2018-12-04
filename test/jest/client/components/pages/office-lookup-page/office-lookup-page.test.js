import React from 'react'
import { shallow } from 'enzyme'
import OfficeLookupPage from 'pages/office-lookup-page/office-lookup-page.jsx'
import { TaxonomyMultiSelect } from 'atoms'
var sinon = require('sinon')
import * as helper from 'client/fetch-content-helper'

describe('OfficeLookupPage', () => {
  // when OfficeLookUp page renders
  // is the TaxonomyMultiSelect component available?
  it('should detect one TaxonomyMultiSelect component', () => {
    let stubFetchSiteContent = sinon.stub(helper, 'fetchSiteContent')
    stubFetchSiteContent.returns(Promise.resolve([]))
    const component = shallow(<OfficeLookupPage />)
    expect(component.find(TaxonomyMultiSelect)).toHaveLength(1)
  })
})
