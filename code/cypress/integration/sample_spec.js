describe('Visit Home page', function(){
    it('Visits the kitchen sink, find an element', function(){
        cy.visit('http://127.0.0.1:3000')
        // cy.pause()

        // cy.contains('type').click() //find the "type" link and click
        // cy.url().should('include','/commands/actions') //check the url content
        //
        // cy.get('.action-email') //check the css class
        //     .type('fake@email.com')
        //     .should('have.value','fake@email.com') //繼續串 make assertion, should have value of we type

    })
})