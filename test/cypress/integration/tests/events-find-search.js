describe("Events search", function() {
  it("has fields for searching", function() {
    const defaultDateRange ="All Upcoming"
    const defaultDistance = "200"

    cy.visit("/events/find")
    
    cy.get('label[for="keyword-search"]').should("have.text", "Search")
    cy.get("[data-cy='keyword search']")
    
    cy.get('label[for="date-filter"]').should("have.text", "Date Range")
    cy.get("form > [data-cy='date']").as("DateRange")
      .find(".Select-value").should("have.text", defaultDateRange)
    
    cy.get("@DateRange").find('.Select-arrow-zone').click()
    cy.get('div.Select-menu-outer')
      .should("contain", "All Upcoming")
      .and("contain", "Today")
      .and("contain", "Tomorrow")
      .and("contain", "Next 7 Days")
      .and("contain", "Next 30 Days")
    
    cy.get('label[for="zip"]').should("have.text", "Near")
    cy.get("[data-cy='zip']")
    
    cy.get('label[for="distance-filter"]').should("have.text", "Distance")
    cy.get("[data-cy='distance']").find(".Select-value").should("have.text", defaultDistance + " miles")
    
    cy.get('[data-cy="search button"]')
  })

  it("fields accept input and submit an event.json request with query parameters when a search is submitted", function(){
    const expectedKeyword = "test"
    const expectedDateRange ="Tomorrow"
    const expectedZip = "12345"
    const expectedDistance = "50"
    
    cy.server()
    // note that order of query parameters in the GET request is affected by the order of fields receiving input
    cy.route("GET",
      `/api/content/search/events.json?pageSize=10&start=0&dateRange=${expectedDateRange.toLowerCase()}&distance=${expectedDistance}&q=${expectedKeyword}&address=${expectedZip}`
    ).as("ExpectedRequest")
    
    cy.visit("/events/find")
    cy.get("[data-cy='keyword search']").as("EventKeyword").type(expectedKeyword)
    cy.get("form > [data-cy='date']").as("DateRange")
    cy.get("@DateRange").find('.Select-arrow-zone').click()
    cy.get('div.Select-menu-outer').contains(expectedDateRange).click('center')
    cy.get("[data-cy='zip']").as("ZipInput").type(expectedZip)
    cy.get("[data-cy='distance']").as("Distance").find('.Select-arrow-zone').click()
    cy.get(".Select-menu-outer").contains(expectedDistance + " miles").click()
    cy.get("[data-cy='search button']").as("SearchButton").click()

    // checks for json request
    cy.wait("@ExpectedRequest")

    // checks that fields show accepted input
    cy.get("@EventKeyword").invoke("val").should("equal", expectedKeyword)
    cy.get("@DateRange").find('.Select-value').invoke("text").should("equal", expectedDateRange)
    cy.get("@ZipInput").invoke("val").should("equal", expectedZip)
    cy.get("@Distance").find('.Select-value').invoke("text").should("equal", expectedDistance + " miles")
    
    // checks for query parameters in the url
    cy.url().should("contain", `q=${expectedKeyword}`)
      .and("contain", `dateRange=${expectedDateRange.toLowerCase()}`)
      .and("contain", `address=${expectedZip}`)
      .and("contain", `distance=${expectedDistance}`)
  })

  it("displays an error for non-numeric zip codes", function(){
    cy.visit("/events/find")
    cy.get('#events-primary-search-bar-search-button').should("be.enabled")
    cy.get('#zip-error').should('not.exist')
    cy.get("[data-cy='zip']").type("abcde")
    cy.get("[data-testid='keyword-search']").click()
    cy.get('#zip-error')
    cy.get('#events-primary-search-bar-search-button').should("be.disabled")
  })

  it("displays an error for invalid zip codes", function(){
    cy.visit("/events/find")
    cy.get('#events-primary-search-bar-search-button').should("be.enabled")
    cy.get('#zip-error').should('not.exist')
    cy.get("[data-cy='zip']").type("1")
    cy.get('#zip-error')
    cy.get('#events-primary-search-bar-search-button').should("be.disabled")
    cy.get("[data-cy='zip']").type("2345")
    cy.get('#events-primary-search-bar-search-button').should("be.enabled")
    cy.get('#zip-error').should('not.exist')
    cy.get("[data-cy='zip']").type("6")
    cy.get('#events-primary-search-bar-search-button').should("be.disabled")
    cy.get('#zip-error')
  })

  it("enabled distance dropdown when zip code is entered", function(){
    cy.visit("/events/find")
    cy.get("[data-cy='distance']").as("Distance")
    cy.get("[data-cy='zip']").as("ZipInput").clear()

    // when zip code field is empty, dropdown menu should NOT exist
    cy.get("@Distance").click().find(".Select-menu-outer").should('not.exist')

    // when zip code field is NOT empty, dropdown menu should exist
    cy.get("@ZipInput").type("12345")
    cy.get("@Distance").find('.Select-arrow-zone').click()
    cy.get("div.Select-menu-outer").as("DistanceOptions")

    // checks available options in distance dropdown
    cy.get("@DistanceOptions").should("contain", "200 miles")
      .and("contain", "100 miles")
      .and("contain", "50 miles")
      .and("contain", "25 miles")
  })

  it("sets form values from query parameters", function(){
    const expectedZip = "23456"
    const expectedKeyword = "test123"
    const expectedDateRange ="Next 7 Days"
    const expectedDistance = "25 miles"
    
    cy.visit("/events/find/?dateRange=7days&address=23456&q=test123&distance=25")
    cy.get("[data-cy='keyword search']").invoke('val').should("equal", expectedKeyword)
    cy.get("[data-cy='date']").find('.Select-value').should("have.text",expectedDateRange)
    cy.get("[data-cy='zip']").invoke('val').should("equal", expectedZip)
    cy.get("[data-cy='distance']").find('.Select-value').should("have.text",expectedDistance)
  })
})
