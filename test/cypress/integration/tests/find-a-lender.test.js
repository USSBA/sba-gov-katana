describe('Find A Lender', function() {
  const baseUrl = 'localhost:3000'
  it('Verify Page Exists', function() {
    cy.visit(`${baseUrl}/paycheckprotection/find`)
    expect(cy.get('[data-testid=zip]')).to.exist
    expect(cy.get('#lender-primary-search-bar-title')).to.exist
    expect(cy.get('[data-cy="search button"]')).to.exist
  })

  it('Zip Code Search', function() {
      cy.visit(`${baseUrl}/paycheckprotection/find`)
      cy.get('[data-testid=zip]').click().type(90210)
      cy.get('[data-cy="search button"]').click()
      expect(cy.get('[data-testid=lender-card]')).to.exist
  })
  it('Lender Name Field Check', function() {
    cy.visit(`${baseUrl}/paycheckprotection/find`)
    cy.get('[data-testid=zip]').click().type(90210)
    expect(cy.get('[data-testid=lenderName]')).to.exist
  })
  it('Zip and Lender Name Search', function() {
    cy.visit(`${baseUrl}/paycheckprotection/find`)
    cy.get('[data-testid=zip]').click().type(90210)
    cy.get('[data-testid=lenderName]').click().type("Wells Fargo")
    cy.get('[data-cy="search button"]').click()
  })
  it('Lender Card Confirmation', function() {
    cy.visit(`${baseUrl}/paycheckprotection/find`)
    cy.get('[data-testid=zip]').click().type(90210)
    cy.get('[data-testid=lenderName]').click().type("Wells Fargo")
    cy.get('[data-cy="search button"]').click()
    expect(cy.get('[data-testid=lender-card]')).to.exist
    cy.get('[data-testid=lender-card-title]').contains('Wells Fargo Bank')
  })
  it('Invalid Zip Code Search', function() {
    cy.visit(`${baseUrl}/paycheckprotection/find`)
    cy.get('[data-testid=zip]').click().type(9021)
    cy.get('[data-cy="search button"]').click()
    expect(cy.get('[data-testid=zip-error]')).to.exist
  })
})