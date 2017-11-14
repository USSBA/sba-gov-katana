/*global expect*/

/* eslint-disable no-unused-vars,no-undef */
import React from 'react'
/*eslint-enable no-unused-vars*/
import { SectionNav } from 'organisms/section-nav/section-nav.jsx'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import lineageBusinessGuide from '../../test-data/lineage-business-guide.json'
import lineageForPartners from '../../test-data/lineage-for-partners.json'

describe('SectionNav', () => {
  describe('Business Guide', () => {
    test('Renders a Third-level Section Navigation', () => {
      const component = renderer.create(
        <SectionNav lineage={lineageBusinessGuide} />
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    test('Backlink points to first-level URL', () => {
      const modifiedBacklinkUrl = '/business-guide'
      const lineage = _.merge(_.cloneDeep(lineageBusinessGuide), [
        { fullUrl: modifiedBacklinkUrl }
      ])
      const component = shallow(<SectionNav lineage={lineage} />)
      expect(
        component.find('#article-navigation-back-button-desktop').props().url
      ).toBe(modifiedBacklinkUrl)
    })

    test("Backlink text is 'Back to all topics'", () => {
      const component = shallow(<SectionNav lineage={lineageBusinessGuide} />)
      expect(
        component.find('#article-navigation-back-button-desktop').props().text
      ).toBe('Back to all topics')
    })

    test('Navigation title uses first word of second-level as an H2 and the rest as H4', () => {
      const firstWord = 'Firstwordof'
      const otherWords = ' My Second Level Title'
      const modifiedSecondLevelTitle = `${firstWord}${otherWords}`
      const lineage = _.cloneDeep(lineageBusinessGuide)
      lineage[1].title = modifiedSecondLevelTitle
      const component = shallow(<SectionNav lineage={lineage} />)
      expect(
        component
          .find('#article-navigation-title-desktop')
          .find('h2')
          .text()
      ).toBe(firstWord)
      expect(
        component
          .find('#article-navigation-title-desktop')
          .find('h4')
          .text()
      ).toBe(otherWords)
    })
  })
  describe('For Partners', () => {
    test('Renders a Fourth-level Section Navigation', () => {
      const component = renderer.create(
        <SectionNav lineage={lineageForPartners} />
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    test('Backlink points to third-level URL', () => {
      const modifiedBacklinkUrl = '/my/back/url'
      const lineage = _.merge(_.cloneDeep(lineageForPartners), [
        {},
        {},
        { fullUrl: modifiedBacklinkUrl }
      ])
      const component = shallow(<SectionNav lineage={lineage} />)
      expect(
        component.find('#article-navigation-back-button-desktop').props().url
      ).toBe(modifiedBacklinkUrl)
    })
    test('Backlink text is third-level title', () => {
      const modifiedTitle = 'My Third Level Title'
      const lineage = _.merge(_.cloneDeep(lineageForPartners), [
        {},
        {},
        { title: modifiedTitle }
      ])
      const component = shallow(<SectionNav lineage={lineage} />)
      expect(
        component.find('#article-navigation-back-button-desktop').props().text
      ).toBe(`Back to ${modifiedTitle}`)
    })
    test('Navigation title has all content in an h3', () => {
      const navigationTitle = 'Firstwordof My Third Level Title'
      const lineage = _.cloneDeep(lineageForPartners)
      lineage[2].title = navigationTitle
      const component = shallow(<SectionNav lineage={lineage} />)
      expect(
        component
          .find('#article-navigation-title-desktop')
          .find('h3')
          .text()
      ).toBe(navigationTitle)
    })
  })
})
