describe('Test the order history Page', () => {
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

    it('order history Page', () => {
        cy.get('.ant-menu').contains('Order History').click()
        cy.url().should('contain', '/order-history')
        cy.get('.ant-input').clear().type('Ruby')
        cy.get('.ant-btn').click()
        cy.get('body').should('not.contain','Law')
        cy.get(':nth-child(7) > .ant-space > .ant-space-item > a').click()
        cy.get(':nth-child(6)').should('not.contain','New')
    });

});