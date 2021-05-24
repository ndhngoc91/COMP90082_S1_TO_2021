
describe('Test the Contacts page view', function() {
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

    it('Click the Contracts button and view related content', ()=>{

        //find Contracts button and click
        cy.get('ul[role=menu] li').contains(/Contracts/).click() ;
        //check url redirection
        cy.url().should('contain','/contract-management');
        //check page content
        cy.get('body').should('contain','Name')
            .and('contain','Created At')
            .and('contain','Created_By')
            .and('contain','Action');


    });




});