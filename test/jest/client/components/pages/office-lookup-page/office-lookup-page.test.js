import React from 'react'
import { shallow, mount } from 'enzyme'
import { OfficeLookupPage } from 'pages/office-lookup-page/office-lookup-page.jsx'
import { TaxonomyMultiSelect } from 'atoms'
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

  // when an TaxonomyMultiSelect is selected
  // and the search button is clicked
  // is the search result modified based off of the TaxonomyMultiSelect selection?

  // when the button is clicked
  // where does the resultant value appear?
  // is it THERE?

  // can the TaxonomyMultiSelect be populated with data?
  // Alex will attempt to address this one...
  // *** add this test to a taxonomy-multiselect.test.js file
})
