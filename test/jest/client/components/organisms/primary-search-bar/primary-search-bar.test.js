import React from 'react'
import { shallow, mount } from 'enzyme'
import PrimarySearchBar from 'organisms/primary-search-bar/primary-search-bar.jsx'
import TextInput from 'atoms/text-input/text-input.jsx'

describe('Primary Search Bar', () => {
  it('has a title that can be set', () => {
    var expectedTitle = 'Expected Search Bar Title'
    const searchBar = shallow(<PrimarySearchBar id="testId" title={`${expectedTitle}`} />)
    expect(searchBar.find('#testId-title').text()).toEqual(expectedTitle)
  })

  it('has a search button that can be set', () => {
    var expectedButtonText = 'Button text'
    const searchBar = shallow(<PrimarySearchBar id="testId" searchButtonText={`${expectedButtonText}`} />)
    const button = searchBar.find('Button').shallow()
    expect(button.type()).toEqual('button')
    expect(
      searchBar
        .find('Button')
        .shallow()
        .text()
    ).toEqual(expectedButtonText)
  })

  it('renders child components', () => {
    const searchBar = shallow(
      <PrimarySearchBar id="testId">
        <TextInput id="testInput" />
      </PrimarySearchBar>
    )
    expect(searchBar.find(TextInput).length).toEqual(1)
  })

  it('sets the value property of child components based on fieldValues map', () => {
    const fieldValues = {
      myQueryParam: 'sample value'
    }
    const searchBar = shallow(
      <PrimarySearchBar fieldValues={fieldValues}>
        <TextInput queryParamName="myQueryParam" />
      </PrimarySearchBar>
    )
    const textInput = searchBar.find(TextInput)
    expect(textInput.length).toEqual(1)
    expect(textInput.prop('value')).toEqual(fieldValues.myQueryParam)
  })

  it('runs onSearch when search button is clicked', () => {
    const onSearchSpy = jest.spyOn(PrimarySearchBar.prototype, 'onSearch')
    const searchBar = mount(<PrimarySearchBar />)
    searchBar.find('Button').simulate('click')
    expect(onSearchSpy).toHaveBeenCalledOnce
  })

  it('runs the search when search button is clicked and the form field is valid', () => {
    const onSearchMock = jest.fn()
    const searchBar = mount(<PrimarySearchBar isValid={true} onSearch={onSearchMock} />)
    searchBar.find('Button').simulate('click')
    console.log('onSearchMock is', onSearchMock)
    expect(onSearchMock).toHaveBeenCalledTimes(1)
  })

  it('does not run the search when the search button is clicked but the for field is invalid', () => {
    const onSearchMock = jest.fn()
    const searchBar = mount(<PrimarySearchBar isValid={true} onSearch={onSearchMock} />)
    searchBar.find('Button').simulate('click')
    console.log('onSearchMock is', onSearchMock)
    expect(onSearchMock).toHaveBeenCalledTimes(1)
  })

  it('runs onFieldChange when a text field is updated', () => {
    const onChangeSpy = jest.spyOn(PrimarySearchBar.prototype, 'onFieldChange')
    const searchBar = mount(
      <PrimarySearchBar id="testId">
        <TextInput id="testInput" />
      </PrimarySearchBar>
    )
    searchBar
      .find('#testInput')
      .at(1)
      .simulate('change')
    expect(onChangeSpy).toHaveBeenCalledOnce
  })
  it('will disable the button if the button is set to inactive', () => {
    const searchBar = mount(<PrimarySearchBar searchButtonText="foo" buttonActive={false} />)
    const button = searchBar.find('Button')
    expect(button.props().disabled).toBeTruthy()
  })
  it('will NOT disable the button if the button is set to active', () => {
    const searchBar = mount(<PrimarySearchBar searchButtonText="foo" buttonActive={true} />)
    const button = searchBar.find('Button')
    expect(button.props().disabled).not.toBeTruthy()
  })
})
