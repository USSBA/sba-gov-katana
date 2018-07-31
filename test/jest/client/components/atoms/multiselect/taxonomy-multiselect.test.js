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

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />).find(MultiSelect)
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

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />).find(MultiSelect)
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

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />).find(MultiSelect)
  expect(multiselect.props().options.length).toEqual(1)
  expect(multiselect.props().options).toContainEqual(expectedAllValue)
})

test('Taxonomy Multiselect can have "All" option disabled', () => {
  const testTaxonomy = {
    name: 'test',
    terms: []
  }

  const multiselect = shallow(
    <TaxonomyMultiSelect taxonomy={testTaxonomy} includeAllOption={false} />
  ).find(MultiSelect)
  expect(multiselect.props().options.length).toEqual(0)
})

test('Taxonomy Multiselect sets the value to "All" when "All" option is enabled', () => {
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two']
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} />).find(MultiSelect)
  expect(multiselect.props().value).toEqual('All')
})

test('Taxonomy Multiselect sets the value to the first value of the taxonomy when "All" option is disabled', () => {
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two']
  }

  const multiselect = shallow(
    <TaxonomyMultiSelect taxonomy={testTaxonomy} includeAllOption={false} />
  ).find(MultiSelect)
  expect(multiselect.props().value).toEqual('one')
})

test('Taxonomy Multiselect sets the value to a provided value', () => {
  const value = 'item123'
  const expectedValue = {
    label: value,
    value
  }
  const testTaxonomy = {
    name: 'test',
    terms: ['one', 'two', value]
  }

  const multiselect = shallow(<TaxonomyMultiSelect taxonomy={testTaxonomy} value={value} />).find(
    MultiSelect
  )
  expect(multiselect.props().value).toEqual(expectedValue)
})
