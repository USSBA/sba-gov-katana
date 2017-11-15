import sinon from 'sinon'
import * as resourceCenterLookup from '../../../../src/client/services/resource-center-lookup.js'
import _ from 'lodash'

describe('#ResourceCenterLookup', function() {
  describe('#getPartners', function() {
    it('should get a list of resource partners', function() {
      const expectedPartners = ['WBC', 'SBDC', 'SCORE', 'VET', 'PrtData']
      const partners = resourceCenterLookup.getPartners()
      partners.should.have.all.members(expectedPartners)
    })
  })
  describe('#getOfficesByZip', function() {
    let gpoStub
    before(() => {
      gpoStub = sinon.stub(resourceCenterLookup, 'getPartnerOffices').returns([
        {
          zip: '12345',
          name1: 'First Office'
        },
        {
          zip: '11111',
          name1: 'Second Office'
        },
        {
          zip: '11111-1234',
          name1: 'Third Office'
        },
        {
          zip: '22222',
          name1: 'Fourth Office'
        },
        {
          zip: '22222',
          name1: 'Fifth Office'
        }
      ])
    })
    after(() => {
      gpoStub.restore()
    })
    it('with one match, returns a list of a single office', () => {
      const prtPartners = resourceCenterLookup.getOfficesByZip(
        'PrtData',
        '12345'
      )
      prtPartners.should.have.length(1)
      prtPartners[0].name1.should.equal('First Office')
    })

    it('with two matches, returns a list of a two offices', () => {
      const prtPartners = resourceCenterLookup.getOfficesByZip(
        'PrtData',
        '22222'
      )
      prtPartners.should.have.length(2)
      prtPartners[0].name1.should.equal('Fourth Office')
      prtPartners[1].name1.should.equal('Fifth Office')
    })
    it('with partial matches, returns the expected matches', () => {
      const prtPartners = resourceCenterLookup.getOfficesByZip(
        'PrtData',
        '11111'
      )
      prtPartners.should.have.length(2)
      prtPartners[0].name1.should.equal('Second Office')
      prtPartners[1].name1.should.equal('Third Office')
    })
  })
  describe('#getOfficesByState', function() {
    let gpoStub
    before(() => {
      gpoStub = sinon.stub(resourceCenterLookup, 'getPartnerOffices').returns([
        {
          state: 'MD',
          name1: 'First Office'
        },
        {
          state: 'DC',
          name1: 'Second Office'
        },
        {
          state: 'DC',
          name1: 'Third Office'
        },
        {
          state: 'VA',
          name1: 'Fourth Office'
        },
        {
          state: 'VA',
          name1: 'Fifth Office'
        }
      ])
    })
    after(() => {
      gpoStub.restore()
    })
    it('with one match, returns a list of a single office', () => {
      const prtPartners = resourceCenterLookup.getOfficesByState(
        'PrtData',
        'MD'
      )
      prtPartners.should.have.length(1)
      prtPartners[0].name1.should.equal('First Office')
    })

    it('with two matches, returns a list of a two offices', () => {
      const prtPartners = resourceCenterLookup.getOfficesByState(
        'PrtData',
        'DC'
      )
      prtPartners.should.have.length(2)
      prtPartners[0].name1.should.equal('Second Office')
      prtPartners[1].name1.should.equal('Third Office')
    })
  })
})
