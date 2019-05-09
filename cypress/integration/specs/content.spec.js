describe('Content.vue', () => {

    beforeEach(() => {
        cy.loadRiskTypes()
        cy.visit('localhost:8080/')
      });

    it('should display 6 cards with content', () => {
        cy.get('.card-title')
        .should('have.length', 6)
    })

    it('should paginate to the next page and submit form', () => {

        // click the paginate button
        cy.get('li.page-item').each(($li, index,$list) => {
            if(index === 4){
                cy.wrap($li).click()
            }})

        // click apply to the last element(risktype)
        cy.get('button').each(($element, index,$list) => {
            if(index === 11){
                cy.wrap($element).click()
                // Type values in the form fields
                .get('input#modal-33d719cd-cde0-4164-9c60-bcf836205988').first()
                .click()
                .type(18)
                .get('input#modal-33d719cd-cde0-4164-9c60-bcf836205988').last()
                .click()
                .type('2019-05-09')

                // get the submit button and click
                .get('#modal-33d719cd-cde0-4164-9c60-bcf836205988')
                .find('button')
                .last()
                .click()
                // get the form cancle button and click
                .get('#modal-33d719cd-cde0-4164-9c60-bcf836205988')
                .find('button')
                .first()
                .click()
            }
        })
        cy.get('.card-title').should('have.length', 3)
    })

    it('should delete risk type', () => {
        cy.get('.cards-container .card')
        .get('.card-footer img').eq(7)
        .invoke('show')
        .click()
    })

    it('should edit risk type', () => {
        cy.get('.cards-container .card')
        .get('.card-footer img').eq(6)
        .invoke('show')
        .click()
    })
 })
