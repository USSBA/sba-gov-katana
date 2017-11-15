/*global expect*/

/* eslint-disable no-unused-vars,no-undef */
import React from 'react'
/*eslint-enable no-unused-vars*/
import { Page } from 'client/components/pages/page.jsx'
import ProgramPage from 'client/components/templates/program-page/program-page.jsx'
import BasicPage from 'client/components/templates/basic-page/basic-page.jsx'
import { shallow } from 'enzyme'
// import renderer from "react-test-renderer";
import _ from 'lodash'
import lineageBusinessGuide from '../../test-data/lineage-business-guide.json'
import lineageForPartners from '../../test-data/lineage-for-partners.json'

describe('SectionNav', () => {
  describe('Business Guide', () => {
    test('Third-level taxonomy renders BasicPage', () => {
      const lineage = _.cloneDeep(lineageBusinessGuide)
      const data = {
        title: 'Market research and competitive analysis',
        summary: 'Blah blah',
        type: 'page',
        id: 47
      }
      const component = shallow(<Page data={data} lineage={lineage} />)
      expect(component.at(0).type()).toBe(BasicPage)
    })
  })
  describe('For Partners', () => {
    test('Third-level taxonomy renders Page component', () => {
      const lineage = [
        _.cloneDeep(lineageForPartners[0]),
        _.cloneDeep(lineageForPartners[1]),
        _.cloneDeep(lineageForPartners[2])
      ]
      const data = {
        title: '7(a) Loans',
        summary: 'Blah blah',
        type: 'programPage',
        id: 3419
      }
      const component = shallow(<Page data={data} lineage={lineage} />)
      expect(component.at(0).type()).toBe(ProgramPage)
    })
    test('Fourth-level taxonomy renders BasicPage component', () => {
      const lineage = _.cloneDeep(lineageForPartners)
      const data = {
        title: 'Operate as a 7(a) Lender',
        summary: 'Blah blah',
        type: 'page',
        id: 3414
      }
      const component = shallow(<Page data={data} lineage={lineage} />)
      expect(component.at(0).type()).toBe(BasicPage)
    })
  })
})
