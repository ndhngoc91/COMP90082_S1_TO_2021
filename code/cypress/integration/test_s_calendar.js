
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

    it('Click the calendar button and view related content', ()=>{

        //find Calendar button and click
        cy.get('ul[role=menu] li').contains(/Calendar/).click() ;
        //check url redirection
        cy.url().should('contain','/calendar');
        //check page content
        cy.get('body').should('contain','Items');
        cy.get('body').should('contain','Package');

    });




});