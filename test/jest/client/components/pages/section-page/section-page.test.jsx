import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'atoms'
import { MenuTileCollection } from 'organisms'
import SectionPage from 'pages/section-page/section-page'
import constants from 'client/services/constants.js'

describe('SectionPage', () => {
  test('should render a tile collection', () => {
    const component = shallow(<SectionPage />)
    const result = component.find('.tiles').length
    const expected = 1
    expect(result).toEqual(expected)
  })
  test('should render a business guide title', () => {
    const props = {
      sectionData: {
        title: constants.sections.businessGuide
      }
    }
    const component = shallow(<SectionPage {...props} />)
    const result = component.find('h6').text()
    const expected = 'Start your business in 10 steps'
    expect(result).toEqual(expected)
  })
  test('should render a business guide button', () => {
    const props = {
      sectionData: {
        title: constants.sections.businessGuide
      }
    }
    const component = shallow(<SectionPage {...props} />)
    const result = component.find(Button).props().url
    const expected = constants.routes.tenSteps
    expect(result).toEqual(expected)
  })
  test('should render menu tile collection organism from "For Partners" data', () => {
    const props = {
      sectionData: {
        title: constants.sections.forPartners
      }
    }
    const component = shallow(<SectionPage {...props} />)
    const result = component.find(MenuTileCollection).length
    const expected = 1
    expect(result).toEqual(expected)
  })
  test('should render menu tile collection organism from "Federal Contracting" data', () => {
    const props = {
      sectionData: {
        title: constants.sections.federalContracting
      }
    }
    const component = shallow(<SectionPage {...props} />)
    const result = component.find(MenuTileCollection).length
    const expected = 1
    expect(result).toEqual(expected)
  })
})
