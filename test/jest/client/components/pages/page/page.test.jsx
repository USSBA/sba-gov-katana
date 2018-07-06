/*global expect*/

/* eslint-disable no-unused-vars,no-undef */
import React from 'react'
/*eslint-enable no-unused-vars*/
import Page from 'client/components/pages/page.jsx'
import ProgramPage from 'client/components/templates/program-page/program-page.jsx'
import BasicPage from 'client/components/templates/basic-page/basic-page.jsx'
import { shallow } from 'enzyme'
import _ from 'lodash'
import lineageBusinessGuide from '../../test-data/lineage-business-guide.json'
import lineageForPartners from '../../test-data/lineage-for-partners.json'
import sinon from 'sinon'
import * as helper from 'client/fetch-content-helper.js'

describe('SectionNav', () => {
  var fetchRestContentStub
  beforeEach(() => {
    fetchRestContentStub = sinon.stub(helper, 'fetchRestContent')
  })

  afterEach(() => {
    fetchRestContentStub.restore()
  })

  describe('Business Guide', () => {
    test('Third-level taxonomy renders BasicPage', () => {
      const lineage = _.cloneDeep(lineageBusinessGuide)
      const data = {
        title: 'Choose a business structure',
        summary: 'Blah blah',
        type: 'page',
        id: 59
      }
      fetchRestContentStub.returns(Promise.resolve(data))
      const component = shallow(<Page lineage={lineage} nodeId="59" />)
      return Promise.resolve().then(() => {
        component.update()
        expect(component.at(0).type()).toBe(BasicPage)
      })
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
      fetchRestContentStub.returns(Promise.resolve(data))
      const component = shallow(<Page lineage={lineage} nodeId="3412" />)
      return Promise.resolve().then(() => {
        component.update()
        expect(component.at(0).type()).toBe(ProgramPage)
      })
    })
    test('Fourth-level taxonomy renders BasicPage component', () => {
      const lineage = _.cloneDeep(lineageForPartners)
      const data = {
        title: 'Operate as a 7(a) Lender',
        summary: 'Blah blah',
        type: 'page',
        id: 3414
      }
      fetchRestContentStub.returns(Promise.resolve(data))
      const component = shallow(<Page lineage={lineage} nodeId="3412" />)
      return Promise.resolve().then(() => {
        component.update()
        expect(component.at(0).type()).toBe(BasicPage)
      })
    })
  })
})
