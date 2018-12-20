import { findPageLineage, findPageLineageByNodeId } from '../../../../src/client/services/menu.js'

import menu from './menu.json'

describe('Formatter', function() {
  describe('findPageLineage', function() {
    it('should find the lineage for a url', function(done) {
      const lineage = findPageLineage(menu, ['guide', 'plan', 'market'])
      // eslint-disable-next-line no-magic-numbers
      lineage.should.have.length(3)
      lineage[0].url.should.equal('guide')
      lineage[1].url.should.equal('plan')
      lineage[2].url.should.equal('market')
      done()
    })
  })

  describe('#findPageLineageByNodeId', function() {
    it('should find the lineage using the node id ', function(done) {
      const lineage = findPageLineageByNodeId(menu, '47')
      // eslint-disable-next-line no-magic-numbers
      lineage.should.have.length(3)
      lineage[0].url.should.equal('guide')
      lineage[1].url.should.equal('plan')
      lineage[2].url.should.equal('market')
      done()
    })
  })
})
