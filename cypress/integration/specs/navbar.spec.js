
describe('Navbar.vue', () => {

    beforeEach(() => {
        cy.loadRiskTypes()
        cy.visit('localhost:8080/')
      });

    it('should try to seach', () => {
        cy.get('.nav-item .form-inline')
        .find('input')
        .click()
        .type('pure risk')

        cy.get('.nav-item .form-inline')
        .find('button')
        .click()
    })

    it('should create risk type', () => {

        // click on new risk type button
        cy.get('.nav-item')
        .find('button').last()
        .click()

        cy.get('.modal-body form fieldset')
        .find('#input-0')
        .type('Investment Risk')

        cy.get('.modal-body form fieldset')
        .find('#input-1')
        .type('Investment Risk description text ')

        // select date type
        cy.get('.modal-body form fieldset')
        .find('#input-3')
        .select('date')

        // add a new field form and type values
        cy.get('.modal-body img')
        .click()

        cy.get('.modal-body form fieldset')
        .find('#input-2').last()
        .type('name')

        cy.get('.modal-body form fieldset')
        .find('#input-3').last()
        .select('text')

        // add a new field form
        cy.get('.modal-body img')
        .last()
        .click()

        // delete the added field form
        cy.get('.modal-body img')
        .eq(1)
        .click()

        // submit form
        cy.get('.risk-type-form')
        .click()
    })


 })
 