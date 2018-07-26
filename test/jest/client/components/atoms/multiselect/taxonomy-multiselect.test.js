import React from 'react'
import { TaxonomyMultiSelect, MultiSelect } from 'atoms'
import { shallow } from 'enzyme'

test('Taxonomy Multiselect renders a multiselect', () => {
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two']
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />)
  expect(multiselect.find(MultiSelect).length).toEqual(1)
})

test('Taxonomy Multiselect includes "All" option by default', () => {
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two']
  }

  const expectedAllValue = {
    label: 'All',
    value: 'All'
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />)
  expect(multiselect.props().options).toContainEqual(expectedAllValue)
  expect(multiselect.props().options.length).toEqual(3)
})

test('Taxonomy Multiselect includes options passed in by taxonomy prop', () => {
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two']
  }

  const expectedValue = {
    label: 'one',
    value: 'one'
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />)
  expect(multiselect.props().options).toContainEqual(expectedValue)
  expect(multiselect.props().options.length).toEqual(3)
})

test('Taxonomy Multiselect without options only includes "All" option by default', () => {
  const testTaxonomy = {
    name: 'test',
    terms: []
  }

  const expectedAllValue = {
    label: 'All',
    value: 'All'
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />)
  expect(multiselect.props().options.length).toEqual(1)
  expect(multiselect.props().options).toContainEqual(expectedAllValue)
})

test('Taxonomy Multiselect can have "All" option disabled', () => {
  const testTaxonomy = {
    name: 'test',
    terms: []
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} includeAllOption={false} />)
  expect(multiselect.props().options.length).toEqual(0)
})

test('Taxonomy Multiselect sets the value to "All" when "All" option is enabled', () => {
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two']
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />)
  expect(multiselect.props().value).toEqual('All')
})

test('Taxonomy Multiselect sets the value to the first value of the taxonomy when "All" option is disabled', () => {
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two']
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} includeAllOption={false} />)
  expect(multiselect.props().value).toEqual('one')
})

test.skip('Taxonomy Multiselect sets the value to a provided value', () => {
  // When an expected value is part of the taxonomy, when we pass that in as a value
  // to the component, that becomes the default value for the dropdown and not the
  // first value of the value list.  This test may need to be updated to change how
  // that value is passed in.  This is just an outline.  Remove these comments later
  // too.
  const expectedValue = 'item123'
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two', expectedValue]
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} value={expectedValue} />)
  expect(multiselect.props().value).toEqual(expectedValue)
})
