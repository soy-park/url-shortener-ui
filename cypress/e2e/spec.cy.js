describe('Main page', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: "fixtureData.json"})
    .visit("http://localhost:3000/")
  })

  it('should go to a base url', () => {
    cy.url().should('include', '/')
  })

  it('should render a title', () => {
    cy.contains("h1", "URL Shortener")
  })

  it('should display existing cards that include shortened URLs', () => {
    cy.get('.urls-container').find('.url').eq(0)
      .contains("h3", "Awesome photo")

    cy.get('.urls-container').find('.url').eq(0)
      .contains("a", "http://localhost:3001/useshorturl/1")

    cy.get('.urls-container').find('.url').eq(0)
      .contains("p", "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
  
    cy.get('.urls-container').find('.url').eq(1)
      .contains("h3", "Google")

    cy.get('.urls-container').find('.url').eq(1)
      .contains("a", "http://localhost:3001/useshorturl/2")

    cy.get('.urls-container').find('.url').eq(1)
      .contains("p", "https://google.com")
  })

  it('should display a form with inputs', () => {
    cy.get('form').should('be.visible')
      .contains('Shorten Please!')

    cy.get('input[name=title]').should('be.visible')
    cy.get('input[name=urlToShorten]').should('be.visible')
  })

  it('should display the information in the input fields when user fills out the form', () => {
    cy.get('input[name=title]')
      .type("Apples")
      .should('have.value', "Apples")

    cy.get('input[name=urlToShorten]')
      .type("https://google.com")
      .should('have.value', "https://google.com")
  })

  // it('should render a new shortened URL when user fills out and submits the form', () => {
  //   cy.get('input[name=title]').type("Google is cool")
  //     .get('input[name=urlToShorten]').type("https://google.com")
  //     .get('.submit-button').click()

  //   cy.get('.urls-container').find('.url').last().within(() => {
  //     cy.get("h3").should("contain", "Google is cool");
  //     cy.get("a").should("contain", "http://localhost:3001/useshorturl/");
  //     cy.get("p").should("contain", "https://google.com");
  //   })
  // })

  it('should post a new shorted URL on the DOM', () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      body: { 
        id: 3,
        long_url: "https://netflix.com",
        short_url: "http://localhost:3001/useshorturl/3",
        title: "Netflix!"
      }
    })
      cy.get('input[name=title]')
        .type("Netflix!")

      cy.get('input[name=urlToShorten]')
        .type("https://netflix.com")

      .get('form').find('.submit-button').click()
      .then(() => {
        cy.get('.urls-container').find('.url').contains("Netflix!")
        cy.get('.urls-container').find('.url').contains("https://netflix.com")
        cy.get('.urls-container').find('.url').contains("http://localhost:3001/useshorturl/3")
      });
  })
})