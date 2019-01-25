import React from 'react'
import { shallow } from 'enzyme'
import EventLookupPage from 'pages/event-lookup-page/event-lookup-page.jsx'
import { TaxonomyMultiSelect } from 'atoms'
var sinon = require('sinon')
import * as helper from 'client/fetch-content-helper'

describe('EventLookupPage', () => {
  // when EventsLookup page renders
  // is the TaxonomyMultiSelect component available?
  it('should detect one TaxonomyMultiSelect component', () => {
    let stubFetchSiteContent = sinon.stub(helper, 'fetchSiteContent')
    stubFetchSiteContent.returns(Promise.resolve([]))
    const component = shallow(<EventLookupPage />)
    expect(component.find(TaxonomyMultiSelect)).toHaveLength(1)
  })
})
