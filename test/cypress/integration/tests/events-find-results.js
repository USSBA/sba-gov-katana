describe("Event search results", function(){
  it("paginates through 10 results at a time", function(){
    cy.server()
    cy.fixture("event/search-results.json").as("EventResults")
    cy.route("GET", "/api/content/search/events.json**", "@EventResults")
    cy.visit("events/find")

    cy.get("[data-testid='showing results text']").as("Pagination")
    cy.get("[data-testid='previous button']").as("Prev")
    cy.get("[data-testid='next button']").as("Next")
    
    cy.get("[data-cy= 'event result']").should('have.length', 10)
    cy.get("@Pagination").contains("Showing 1 - 10 of ")
  
    //Forward pagination
    cy.get("@Next").click()
    cy.get("@Pagination").contains("Showing 11 - 20 of ")
  
    //Backwards pagination
    cy.get("@Prev").click()
    cy.get("@Pagination").contains("Showing 1 - 10 of ")
  })

  it("displays event information for a result", function(){
    const expectedDate = "Thursday, February 28"
    const expectedTime = "11:30 pm–1:30 am PST"
    const expectedTitle = "Chuck Norris Business Classes (now with more roundhouse)"
    const expectedLocation = "Deep In The Heart O, Texas"
    const expectedCost = "13.37"
    const expectedRegistrationLabel = "Register"

    cy.server()
    cy.fixture("event/search-results.json").as("EventResults").then(event => {
      event.items[0].startDate = "2019-02-28T23:30:00-08:00"
      event.items[0].endDate = "2019-03-01T01:30:00-08:00"
      event.items[0].timezone = "PST"
      event.items[0].title = expectedTitle
      event.items[0].location.city = "Deep In The Heart O"
      event.items[0].location.state = "Texas"
      event.items[0].cost = expectedCost
      event.items[0].registrationUrl = "https://doesnt.matter"
      cy.route("GET", "/api/content/search/events.json**", "@EventResults")
    })

    cy.visit("/events/find")
    cy.get("[data-cy='event result']").eq(0).as("FirstResult")

    cy.get("@FirstResult").find("[data-cy='date']").should("have.text", expectedDate)
    cy.get("@FirstResult").find("[data-cy='time']").should("have.text", expectedTime)
    cy.get("@FirstResult").find("[data-cy= 'title']").should("have.text", expectedTitle)
    cy.get("@FirstResult").find("[data-cy= 'location']").should("have.text", expectedLocation)
    cy.get("@FirstResult").find("[data-cy='cost']").should("have.text", `$${expectedCost}`)
    cy.get("@FirstResult").find("[data-cy='registration']").contains(expectedRegistrationLabel)
  })

  it("opens event detail page url when event title link is clicked", function(){
    const mockId = '123456'

    cy.server()
    cy.fixture("event/search-results.json").as("EventResults").then(event => {
        event.items[0].id = mockId
        cy.route("GET", "/api/content/search/events.json**", "@EventResults")
    })

    cy.visit("/events/find")
    cy.get("[data-cy='event result']").eq(0).find("[data-cy= 'title']").click()
    cy.url().should("contain", `/event/${mockId}`)
  })

  it("displays 'Free' when cost is 0.00", function(){
    const expectedCost = "Free"

    cy.server()
    cy.fixture("event/search-results.json").as("EventResults").then(event => {
        event.items[0].cost = "0.00"
        cy.route("GET", "/api/content/search/events.json**", "@EventResults")
    })

    cy.visit("/events/find")
    cy.get("[data-cy='event result']").eq(0).find("[data-cy='cost']").should("have.text", expectedCost)
  })

  it("displays 'Open event' text instead of registration button when there is NO registration url", function(){
    const expectedRegistrationText = "Open event"

    cy.server()
    cy.fixture("event/search-results.json").as("EventResults").then(event => {
        event.items[0].registrationUrl = null
        cy.route("GET", "/api/content/search/events.json**", "@EventResults")
    })

    cy.visit("/events/find")
    cy.get("[data-cy='event result']").eq(0).find("[data-cy='registration']").as("RegistrationInfo")

    cy.get("@RegistrationInfo").should("have.text", expectedRegistrationText)
    cy.get("@RegistrationInfo").find(".button").should('not.exist')
  })

  it("opens registration link in a new window/tab", function(){
    const mockUrl = "https://doesnt.matter"

    cy.server()
    cy.fixture("event/search-results.json").as("EventResults").then(event => {
        event.items[0].registrationUrl = mockUrl
        cy.route("GET", "/api/content/search/events.json**", "@EventResults")
    })

    cy.visit("/events/find")

    cy.get(`a[href='${mockUrl}']`).should('have.attr', 'target', '_blank')

  })
})
