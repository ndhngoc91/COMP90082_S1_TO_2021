
describe('Test the Management page view', function() {
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


    it('Click the User Management button and view related content', ()=>{

        //find Management button and click
        cy.get('ul[role=menu] li').contains(/Management Pages/).trigger('mouseover');
        cy.get('ul[role=menu] li').should('contain','User Management').click() ; //here has problem
        //check url redirection
        cy.url().should('contain','/user-management');
        //check page content
        cy.get('body').should('contain','Username')
            .and('contain','First Name')
            .and('contain','Last Name')
            .and('contain','Phone')
            .and('contain','Email')
            .and('contain','Gender');
    });


    it('Click the Package Management button and view related content', ()=>{

        //find Management button and click
        cy.get('ul[role=menu] li').contains(/Management Pages/).trigger('mouseover');
        cy.get('ul[role=menu] li').should('contain','Package Management').click() ; //here has problem
        //check url redirection
        cy.url().should('contain','/package-management');
        //check page content
        cy.get('body').should('contain','Name')
            .and('contain','Age Group')
            .and('contain','Category')
            .and('contain','Skill Level')
            .and('contain','Base Price')
            .and('contain','Beginner')
            .and('contain','Adult');
    });


    it('Click the Product Management button and view related content', ()=>{

        //find Management button and click
        cy.get('ul[role=menu] li').contains(/Management Pages/).trigger('mouseover');
        cy.get('ul[role=menu] li').should('contain','Product Management').click() ; //here has problem
        //check url redirection
        cy.url().should('contain','/product-management');
        //check page content
        cy.get('body').should('contain','Name')
            .and('contain','Description')
            .and('contain','Product Code')
            .and('contain','Key Product id')
            .and('contain','Key Taxcode id')
            .and('contain','Recipient List');

    });



});