
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


    it('Click the OrderHistory button and view related content', ()=>{

        //find OrderHistory button and click
        cy.get('ul[role=menu] li').contains(/Order History/).click() ;
        //check url redirection
        cy.url().should('contain','/order-history');
        //check page content
        cy.get('body').should('contain','OrderID')
            .and('contain','Customer Name')
            .and('contain','Start Date')
            .and('contain','End Date')
            .and('contain','Description')
            .and('contain','Status')
            .and('contain','Cancel');


    });



});