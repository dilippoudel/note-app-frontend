Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/login',
    body: {
      username,
      password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    window.localStorage.setItem(
      'loggedNoteappUser',
      JSON.stringify(response.body)
    )
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      Authorization: `bearer ${JSON.parse(cy.getAllLocalStorage().token)}`,
    },
  })

  cy.visit('http://localhost:3000')
})
