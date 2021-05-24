describe('Test the address Page', () => {
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

    it('Add address Page successfully', () => {
        cy.get('.ant-menu').contains('Ruby').click()
        cy.get('#user\\$Menu').contains('Account').click()

        cy.get('.menu > .ant-menu').contains('Addresses')
        cy.get(':nth-child(3) > :nth-child(2) > a').click()
        cy.url().should('contain', '/address')
        cy.contains('Add Address')
        cy.get('button.ant-btn.ant-btn-primary').contains('Add').click()
        cy.contains('State')

        cy.get('input#address_line.ant-input').clear().type('48 Bouverie St')
            .should('have.value','48 Bouverie St')
        cy.get('#postcode')
            .type('3053').should('have.value','3053')
        cy.get('.ant-form-item-control-input-content > .ant-btn').click()

        cy.get('body').should('contain', '48 Bouverie St');
    })

    it('Delete address Page successfully', () => {
        cy.get('.ant-menu').contains('Ruby').click()
        cy.get('#user\\$Menu').contains('Account').click()

        cy.get('.menu > .ant-menu').contains('Addresses')
        cy.get(':nth-child(3) > :nth-child(2) > a').click()
        cy.url().should('contain', '/address')
        cy.contains('Add Address')
        cy.get('[data-row-key="1"] > :nth-child(5) > .ant-space > :nth-child(2) ' +
            '> .ant-typography').contains('Delete').click()

        cy.get('body').should('not.contain','127 Swanston st')
    })

    it('Edit address Page successfully', () => {
        cy.get('.ant-menu').contains('Ruby').click()
        cy.get('#user\\$Menu').contains('Account').click()

        cy.get('.menu > .ant-menu').contains('Addresses')
        cy.get(':nth-child(3) > :nth-child(2) > a').click()
        cy.url().should('contain', '/address')
        cy.contains('Add Address')
        cy.get('[data-row-key="2"] > :nth-child(5) > .ant-space ' +
            '> [style="margin-right: 16px;"] > .ant-typography').contains('Edit').click()
        cy.contains('State')

        cy.get('input#address_line.ant-input').clear().type('128 Swanston St')
            .should('have.value','128 Swanston St')
        cy.get('#postcode').clear()
            .type('3053').should('have.value','3053')
        cy.get('.ant-form-item-control-input-content > .ant-btn').click()

        cy.get('body').should('contain', '128 Swanston St');
    })

});
