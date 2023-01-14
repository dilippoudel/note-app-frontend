describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Dilip Poudel',
      username: 'dilip123',
      password: 'dilip123',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    )
  })
  it('should click to login button and show login form', function () {
    cy.contains('Log in').click()
  })
  it('user can log in to the app', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('dilip123')
    cy.get('#password').type('dilip123')
    cy.get('#login').click()
    cy.contains('Dilip Poudel logged in')
  })
  describe('Note App', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.contains('Log in').click()
      cy.get('#username').type('dilip123')
      cy.get('#password').type('dilip123')
      cy.get('#login').click()
    })
    it('A new note can be created', function () {
      cy.contains('create new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('Submit').click()
      cy.contains('a note created by cypress')
    })
    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('create new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('Submit').click()
      })
      it('it can be made important', function () {
        cy.contains('another note cypress').contains('Make important').click()
        cy.contains('another note cypress').contains('make not important')
      })
    })
  })
})
