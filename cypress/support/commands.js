Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/login`,
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
    cy.visit('')
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/notes`,
    method: 'POST',
    body: { content, important },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedNoteappUser')).token
      }`,
    },
  })

  cy.visit('')
})
