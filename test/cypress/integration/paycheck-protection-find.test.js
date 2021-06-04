describe('Paycheck protection Find', function() {
  const baseUrl = 'localhost:3000'
  it('Updates the zipcode field when the map is dragged to a different location', function() {
    cy.server()
    cy.route('GET', '/api/content/search/lenders.json**').as('LenderSearch')
    cy.visit(`${baseUrl}/paycheckprotection/find`)
    cy.get('input#zip').type('20024')
    cy.get("[data-cy='search button']").click()
    cy.wait('@LenderSearch')
    cy.get('input#zip').should('have.value', '20024')
    cy.get(".map")
    .trigger("mousedown")
    .trigger("mousemove", 100, 100, {force: true})
    .trigger("mousemove")
    .trigger("mouseup");
    cy.get('input#zip').should('have.value', '20057')
  })
})