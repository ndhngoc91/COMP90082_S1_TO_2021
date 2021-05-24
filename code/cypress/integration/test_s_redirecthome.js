
describe('Test the Calendar page view', function() {
    beforeEach(() => {
        cy.visit('/login')  // this is Staff username and psw, might need to be changed in the future
        //fill in username
        cy.get('#normal_login_username').type("ruby")
            .should('have.value', "ruby");
        //fill in psw
        cy.get('#normal_login_password').type("squizz")
            .should('have.value', "squizz");
        //submit form and assertion
        cy.get('#normal_login').submit();
    });

    it('Click the Home button and check redirection', ()=>{

        //find Management button and click
        cy.get('ul[role=menu] li').contains(/Home/).click();
        //check url redirection
        cy.url().should('eq', Cypress.config().baseUrl);



    });





});