describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Dilip Poudel',
      username: 'dilip123',
      password: 'dilip123',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    )
  })
  it('login fails with wrong credentials', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('dilip123')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'error in username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Dilip Poudel logged in')
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'dilip123', password: 'dilip123' })
    })
    it('user can login', function () {
      cy.contains('Dilip Poudel logged in')
    })
    it('a new note can be created', function () {
      cy.contains('create new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('Submit').click()
      cy.contains('a note created by cypress')
    })
    describe('when several note exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})
