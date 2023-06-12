When a user visits the page, they can view the page title and the existing shortened URLs
When a user visits the page, they can view the Form with the proper inputs
When a user fills out the form, the information is reflected in the input fields

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

  it('should render a heading', () => {
    cy.contains("h1", "URL Shortener")
  })

})