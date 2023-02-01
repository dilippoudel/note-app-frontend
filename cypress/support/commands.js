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
    console.log('response is ', response.body)
    cy.visit('http://localhost:3000')
    window.localStorage.setItem(
      'loggedNoteappUser',
      JSON.stringify(response.body)
    )
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
