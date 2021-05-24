
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






});