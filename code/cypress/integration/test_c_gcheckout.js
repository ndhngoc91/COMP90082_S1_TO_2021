
describe('Test the Checkout to print Page', () => {
    beforeEach(() => {
        cy.visit('/login')
        //fill in username
        cy.get('#normal_login_username').type("user1")
            .should('have.value', "user1");
        //fill in psw
        cy.get('#normal_login_password').type("squizz")
            .should('have.value', "squizz");
        //submit form and assertion
        cy.get('#normal_login').submit();
    })

    it('Checkout to print Page', () => {
        cy.get('.ant-menu').contains('Packages').click()
        cy.url().should('contain', '/packages')
        cy.get(':nth-child(1) > .ant-card > .ant-card-body > ' +
            '.ant-row-space-between > .ant-typography > .ant-btn').click()
        cy.get(':nth-child(1) > .ant-col-8 > .ant-form-item-control-input > ' +
            '.ant-form-item-control-input-content > .ant-input-number > ' +
            '.ant-input-number-handler-wrap > .ant-input-number-handler-up').click()
        cy.get('.ant-btn').click()
        cy.url().should('contain','/shopping-cart')
        cy.get('[style="margin-bottom: 8px;"] > .ant-btn').click()
        cy.get('a').click()
        cy.get('.ant-modal-header').should('contain','Add Recipient')
        cy.get('#firstName').type('Ruby').should('have.value','Ruby')
        cy.get('#lastName').type('Nguyen').should('have.value','Nguyen')
        cy.get('#height').type('175').should('have.value','175')
        cy.get('#weight').type('75').should('have.value','75')
        cy.get('#footSize').type('310').should('have.value','310')
        cy.get('.ant-picker').click().type('1995-05-28').click()
        cy.get('[title="1995-05-29"]').click()/*.ant-picker-input   */
        cy.get('.ant-select-selector').click()
        cy.get('[title="Beginner"]').click({force:true}).should('contain','Beginner')
        cy.get('.ant-form-item-control-input-content > .ant-btn').click()
        cy.get('body').should('contain','Edit')
        cy.get('.ant-btn').contains('Checkout').click()
        cy.url().should('contain','/finish')
        cy.get('body').should('contain','Print Receipt')

    });

});