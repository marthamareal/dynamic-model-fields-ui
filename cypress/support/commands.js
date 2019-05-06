// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loadRiskTypes', () => {
    cy.server()
    cy.route('GET', '/api/v1/risk-types/', 'fixture:riskTypesOne.json').as('defaultPage')
    cy.route('GET', '/api/v1/risk-types/?page=1', 'fixture:riskTypesOne.json').as('pageOne')
    cy.route('GET', '/api/v1/risk-types/?page=2', 'fixture:riskTypesTwo.json').as('pageTwo')
    cy.route('GET', '/api/v1/field-types/', 'fixture:fieldTypes.json').as('fieldTypes')
    cy.route({
        method: 'POST',
        url: '/api/v1/risk-types/',
        response: 'fixture:riskType.json',
        status: 201,
    }).as('createRiskType')
})
