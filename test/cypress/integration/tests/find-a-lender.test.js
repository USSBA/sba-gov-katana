describe('Find A Lender', function() {
    const baseUrl = 'localhost:3000'
    it('Verify Page Exists', function() {
      cy.visit(`${baseUrl}/paycheckprotection/find`)
      expect(cy.get('[data-testid=zip]')).to.exist
      expect(cy.get('#lender-primary-search-bar-title')).to.exist
      expect(cy.get('[data-cy="search button"]')).to.exist
    })
})