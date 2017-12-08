import React from 'react'
import { clone } from 'lodash'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
const sinon = require('sinon')

import { SearchBox } from 'organisms'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

describe('searchBox', () => {
  // has 1 h2 tag
  // has 1 search field
  // has 1 multiselect control
  // has 1 button
  // button reads "Submit"
  // fires an onClick event

  test('has 1 h2 tag', () => {
    const component = shallow(<SearchBox />)
    expect(component.find('h2')).toHaveLength(1)
  })

  test('has 1 TextInput Component', () => {
    const component = shallow(<SearchBox />)
    expect(component.find('TextInput')).toHaveLength(1)
  })

  test('has 3 Multiselect Component', () => {
    const component = shallow(<SearchBox />)
    expect(component.find('.multiSelect')).toHaveLength(3)
  })

  test('has 1 Submit Button Component', () => {
    const component = shallow(<SearchBox />)
    expect(component.find('LargeInversePrimaryButton')).toHaveLength(1)
  })

  test("Submit Button Component reads, 'Search'", () => {
    const mockText = 'Search'
    const component = shallow(<SearchBox />)
    const expectedText = component
      .find('LargeInversePrimaryButton')
      .first()
      .props().text
    expect(expectedText).toBe(mockText)
  })

  test("should render default sectionHeaderText and subtitleText, h2 and p respectively", () => {
    const component = renderer.create(<SearchBox />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree.children[0].children[0].type).toBe('h2')
    expect(tree.children[0].children[0].children[0]).toBe('Search documents, forms, and SOPs')
    expect(tree.children[0].children[1].type).toBe('p')
    expect(tree.children[0].children[1].children[0]).toBe('Search by title or document number')
  })

  test("should render documentType, program and documentActivity as input type and 'All' as its default value", () => {
    const testProps = {
      documentType: 'TechNote',
      program: 'HUBZone',
      documentActivity: 'Authorization'
    }
    const component = renderer.create(<SearchBox />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree.children[0].children[3].children[0].children[1].children[0].children[0].props.name).toBe('documenttype-select')
    expect(tree.children[0].children[3].children[0].children[1].children[0].children[0].type).toBe('input')
    expect(tree.children[0].children[3].children[0].children[1].children[0].children[0].props.value).toBe('All')
    expect(tree.children[0].children[4].children[0].children[1].children[0].children[0].props.name).toBe('program-select')
    expect(tree.children[0].children[4].children[0].children[1].children[0].children[0].type).toBe('input')
    expect(tree.children[0].children[4].children[0].children[1].children[0].children[0].props.value).toBe('All')
    expect(tree.children[0].children[5].children[0].children[1].children[0].children[0].props.name).toBe('documentactivity-select')
    expect(tree.children[0].children[5].children[0].children[1].children[0].children[0].type).toBe('input')
    expect(tree.children[0].children[5].children[0].children[1].children[0].children[0].props.value).toBe('All')
  })

  test("should have default props for document type, program and document activity, and its default labels", () => {
    const component = shallow(<SearchBox />)
    expect(component).toMatchSnapshot()
    expect(component.instance().props.multiSelectDocumentTypeDefaultLabel).toBe('All document types')
    expect(component.instance().props.multiSelectProgramDefaultLabel).toBe('All programs')
    expect(component.instance().props.multiSelectDocumentActivityDefaultLabel).toBe('All document activity')
    expect(component.instance().props.documentType).toEqual(["SBA form", "SOP", "Policy Guidance", "TechNote", "Procedural notice", "Information notice", "Policy notice", "Support"])
    expect(component.instance().props.program).toEqual(["SBIC", "Surety Bonds", "7(a)", "CDC/504", "Microlending", "HUBZone", "Disaster", "8(a)", "SBA operations", "Contracting", "Community Advantage"])
    expect(component.instance().props.documentActivity).toEqual(["Authorization", "Servicing", "Liquidation", "Litigation", "Guaranty purchase", "Licensing and organizational", "Credit and risk", "Investment and transactions", "Leverage commitments and draws", "Periodic reporting", "General", "Processing", "Secondary market"])
  })

  test("should update state for document type, program, document acitivity and search term", () => {
    const props = {
      documentType: { value: 'TechNote' },
      program: { value: 'SBIC' },
      documentActivity: { value: 'Authorization' },
      searchTerm: { target: { value: 'newWord' } }
    }
    const component = shallow(<SearchBox />)
    expect(component).toMatchSnapshot()
    component.instance().handleChange(props.documentType)
    component.instance().handleChange(props.program)
    component.instance().handleChange(props.documentActivity)
    component.instance().updateSearchTerm(props.searchTerm)
    expect(component.instance().state.selectedDocumentType).toBe('TechNote')
    expect(component.instance().state.selectedProgram).toBe('SBIC')
    expect(component.instance().state.selectedDocumentActivity).toBe('Authorization')
    expect(component.instance().state.searchTerm).toBe('newWord')
  })

  test("should not update state for document type, program and document acitivity", () => {
    const props = {
      selectedLabel: { value: 'itis' }
    }
    const component = shallow(<SearchBox />)
    component.instance().handleChange(props.selectedLabel)
    expect(component).toMatchSnapshot()
    expect(component.instance().state.selectedDocumentType).not.toBe('itis')
    expect(component.instance().state.selectedProgram).not.toBe('itis')
    expect(component.instance().state.selectedDocumentActivity).not.toBe('itis')
  })

  test("should update default props for sectionHeaderText and subtitleText", () => {
    const testProps = {
      sectionHeaderText: 'new title',
      subtitleText: 'new subtitle'
    }
    const props = clone(testProps)
    const component = shallow(<SearchBox {...props}/>)
    expect(component).toMatchSnapshot()
    expect(component.instance().props.sectionHeaderText).toBe('new title')
    expect(component.instance().props.subtitleText).toBe('new subtitle')
  })

  /* To Do: this test needs to be fleshed out more
	// for some reason 'preventDefault' is not stopping the submit call from executing/
	// This causes the following error:
	// ---
	// TypeError: Could not parse "/document/?search=&type=SBA form&program=8(a)&activity=All" as a URL
	// ---

	test("Submit Button fires 'submit' when onClick is invoked", () => {

		const preventDefault = jest.fn();
		const component = shallow(<SearchBox />);
		const instance = component.instance();
		const spy = sinon.spy(instance, "submit");
		instance.forceUpdate();
		component.find("LargeInversePrimaryButton").first().simulate("click", { preventDefault });

		sinon.assert.calledOnce(spy);

	});
	*/
})
