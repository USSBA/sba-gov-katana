describe('Local Assistance Find', function() {
  const baseUrl = 'localhost:3000'
  it('has fields for searching offices', function() {
    cy.visit(`${baseUrl}/local-assistance/find`)
    expect(cy.get('input#zip')).to.exist
    expect(cy.get("[data-cy='officetype-select']")).to.exist
    expect(cy.get('button#office-primary-search-bar-search-button')).to.exist
    expect(cy.get("[data-cy='search button']")).to.exist
  })

  it('can search for an office by zip code', function() {
    cy.server()
    cy.route('GET', '/api/content/search/offices.json**').as('OfficeSearch')
    cy.visit(`${baseUrl}/local-assistance/find`)
    cy.get('input#zip').type('98101')
    cy.get("[data-cy='search button']").click()
    cy.wait('@OfficeSearch')
    expect(cy.get('#office-results').as('Results')).to.exist
    // Claims it has 5 results
    expect(cy.get('@Results').contains('Showing 1 - 5')).to.exist
    // Actually has 5 results
    expect(cy.get('a.card-layout').eq(4)).to.exist
  })

  it('can search for offices by office type', function() {
    cy.server()
    cy.route('GET', '/api/content/search/offices.json**').as('OfficeSearch')
    cy.visit(`${baseUrl}/local-assistance/find`)
    cy.get('input#zip').type('20024')
    cy.get("[data-cy='officetype-select']")
      .find('.Select-arrow-zone')
      .click()
    cy.get("[data-cy='officetype-select']")
      .contains('Certified Development Company')
      .click()
    cy.get("[data-cy='search button']").click()
    cy.wait('@OfficeSearch')
    expect(cy.get('#office-results').as('Results')).to.exist
    // Claims it has 5 results
    expect(cy.get('@Results').contains('Showing 1 - 5')).to.exist
    // Actually has 5 results
    expect(cy.get('a.card-layout').eq(4)).to.exist
  })

  it('displays office info in search results', function() {
    cy.visit(
      `${baseUrl}/local-assistance/find?type=SCORE%20Business%20Mentoring&address=21146&pageNumber=1`
    )
    cy.get('#office-results').within(results => {
      expect(cy.get("[data-testid='showing results text']").contains('Showing 1 - 5 of 50')).to.exist
      expect(cy.get('#office-result-container-result-0')).to.exist
      expect(cy.get('#office-miles-result-0')).to.exist
      // expect(cy.get('#office-title-result-0')).to.exist
    })
  })

  it('paginates through search results', function() {
    cy.server()
    cy.route('GET', '/api/content/search/offices.json**').as('OfficeSearch')
    cy.visit(`${baseUrl}/local-assistance/find/?pageNumber=1&address=20024`)
    cy.wait('@OfficeSearch')
    expect(cy.get('.paginator').as('Pagination')).to.exist
    expect(cy.get('@Pagination').contains('Showing 1 - 5')).to.exist
    expect(cy.get('@Pagination').get('i.fa-chevron-left')).to.exist
    expect(cy.get('@Pagination').get('i.fa-chevron-right')).to.exist

    // Forward pagination
    cy.get('@Pagination').within($pagination => {
      cy.get('i.fa-chevron-right').click()
    })
    expect(cy.get('@Pagination').contains('Showing 6 - 10')).to.exist

    // Backwards pagination
    cy.get('@Pagination').within($pagination => {
      cy.get('i.fa-chevron-left').click()
    })
    expect(cy.get('@Pagination').contains('Showing 1 - 5')).to.exist
  })

  it('displays all office details when they exist', () => {
    cy.server()
    cy.fixture('local-assistance/search-results.json').as('SearchResult')
    cy.route('GET', '/api/content/search/offices.json**', '@SearchResult').as('OfficeSearch')
    cy.visit(`${baseUrl}/local-assistance/find?pageNumber=1&address=20024`)
    cy.get("[data-cy='search button']")
      .eq(0)
      .click()
    //expect(cy.get("#office-detail")).to.exist
    cy.get('#office-miles-result-0').should('have.text', '0.8 miles')
    cy.get('#office-title-result-0').should('have.text', 'Office of the Chief Human Capital Officer - MAIN')
    cy.get("[data-cy='contact address']")
      .first()
      .should('have.text', '4091 3rd St SW, Suite 5300')
    cy.get("[data-cy='contact phone']")
      .first()
      .should('have.text', '(202) 205-6780')
    cy.get("[data-cy='contact link']")
      .first()
      .should('have.text', 'Website')
  })

  it('First record is District office', () => {
    cy.server()
    cy.visit(`${baseUrl}/local-assistance/find`)
    cy.get('input#zip').type('21075')
    cy.get("[data-cy='search button']").click()
    cy.get('#office-title-result-0').contains('District')
  })

  it('Search bassed on Longitude and Latitude', function() {
    cy.visit(
      `${baseUrl}/local-assistance/find?pageNumber=1&mapCenter=39.919861127290275%2C-81.56856083125557&address=21075`
    )
    cy.get('#office-title-result-0').contains('District')
    expect(cy.get("[data-testid='showing results text']").contains('Showing 1 - 5 of 50')).to.exist
  })

})
