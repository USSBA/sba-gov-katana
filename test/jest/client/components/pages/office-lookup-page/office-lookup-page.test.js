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

  it('should detect when a selection from the TaxonomyMultiSelect has been made', () => {
    let expected
    const props = {
      actions: {
        fetchContentIfNeeded: jest.fn()
      }
    }

    const component = shallow(<OfficeLookupPage {...props} />)

    // when an TaxonomyMultiSelect is selected
    // and the search button is clicked
    // is the search result modified based off of the TaxonomyMultiSelect selection?
    // ***
    // this test involves OfficeLookupPage's TaxonomyMultiSelect Component's simulating a change to the drop down...
    // to then trigger the SearchTemplate's onChange function, which updates it's state with the TaxonomyMultiSelect value
    // then the OfficeLookupPage's PrimarySearchBar's Button Component needs a click to be simulated
    // which triggers the SearchTemplate's onSearch function
    // which then triggers the SearchTemplate's doSearch function
    // *** having trouble writing this test, as it is challenging to isolate the necessary pieces in order to fulfill the AC.
  })

  // when the button is clicked
  // where does the resultant value appear?
  // is it THERE?
  // *** this potential unit test closely resembles the above

  // can the TaxonomyMultiSelect be populated with data?
  // Alex will attempt to address this one...
  // *** add this test to a taxonomy-multiselect.test.js file
})
