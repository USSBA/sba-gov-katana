import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow, mount } from 'enzyme'
import { CounselingEventsSearchBar } from 'organisms'

describe('CounselingEventsSearchBar', () => {
  describe('h1', () => {
    it('has one h1', () => {
      const component = shallow(<CounselingEventsSearchBar />)
      const result = component.find('h1').length
      const expected = 1

      expect(result).toEqual(expected)
    })

    it('h1 string is Counseling and Events', () => {
      const component = shallow(<CounselingEventsSearchBar />)
      const result = component
        .find('h1')
        .first()
        .text()
      const expected = 'Counseling and Events'

      expect(result).toEqual(expected)
    })
  })

  describe('TextInput', () => {
    it('has one input field', () => {
      const component = shallow(<CounselingEventsSearchBar />)
      const result = component.find('TextInput').length
      const expected = 1

      expect(result).toEqual(expected)
    })

    it('the input field\'s label string is "Zip Code"', () => {
      const component = shallow(<CounselingEventsSearchBar />)
      const result = component.find('TextInput').props().label
      const expected = 'Zip Code'

      expect(result).toEqual(expected)
    })
  })

  describe('MultiSelect', () => {
    it('has 3 MultiSelect instances', () => {
      const component = mount(<CounselingEventsSearchBar />)
      const result = component.find('.Select-control').length
      const expected = 3

      expect(result).toEqual(expected)
    })
  })

  describe('SmallInverseSecondaryButton', () => {
    it('has one submit button', () => {
      const component = shallow(<CounselingEventsSearchBar />)
      const result = component.find('SmallInverseSecondaryButton').length
      const expected = 1

      expect(result).toEqual(expected)
    })

    it('the submit button has a label of "Apply', () => {
      const component = shallow(<CounselingEventsSearchBar />)
      const result = component.find('SmallInverseSecondaryButton').props().text
      const expected = 'Apply'

      expect(result).toEqual(expected)
    })
  })

  describe('Paginator', () => {
    it('has one instance of Paginator', () => {
      const component = shallow(<CounselingEventsSearchBar />)
      const result = component.find('Paginator').length
      const expected = 2

      expect(result).toEqual(expected)
    })
  })
})
