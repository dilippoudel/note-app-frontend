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
  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Log in').click()
      cy.get('#username').type('dilip123')
      cy.get('#password').type('dilip123')
      cy.get('#login-button').click()
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
    describe('and a note exixts', function () {
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
  it('login fails with wrong credentials', function () {
    // cy.contains('Log in').click()
    // cy.get('#username').type('dilip123')
    // cy.get('#password').type('wrong')
    // cy.get('#login-button').click()
    cy.login({ username: 'dilip123', password: 'wrong' })
    cy.get('.error')
      .should('contain', 'error in username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Dilip Poudel logged in')
  })
})
