describe('Test the account Page', () => {
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

    it('Edit account Page successfully', () => {
        cy.get('.ant-menu').contains('Ruby').click()
        cy.get('#SubMenu\\$Menu').contains('Account').click()

        cy.location('pathname').should('include', 'profile')

        cy.go('back')
        cy.location('pathname').should('not.include', 'profile')
        cy.go('forward')
        cy.location('pathname').should('include', 'profile')

        cy.get('.menu > .ant-menu').contains('Profile')
        cy.get('.ant-menu-item-selected > :nth-child(2) > a').click()
        cy.location('pathname').should('include', 'profile')
        cy.contains('First Name')
        cy.get('.ant-btn').contains('Edit').click()
        cy.get('#basic_height').clear().type('175')
            .should('have.value','175')

        cy.get(':nth-child(4) > .ant-row > .ant-form-item-control > ' +
            '.ant-form-item-control-input > .ant-form-item-control-input-content > ' +
            '.ant-select > .ant-select-selector').click().get("div.ant-select-item-option-content")
            .parent().eq(1)
            .click({force: true}).should('contain','Intermediate')

        cy.get(':nth-child(3) > .ant-row > .ant-form-item-control > ' +
            '.ant-form-item-control-input > .ant-form-item-control-input-content > ' +
            '.ant-select > .ant-select-selector').click().get("div.ant-select-item-option-content")
            .parent().contains('Male').click({force:true}).should('contain','Male')

        cy.contains('Submit').click()

        cy.get('body').should('contain', 'Edit');


    })

    it('Not edit Profile Page', () => {
        cy.get('.ant-menu').contains('Ruby').click()
        cy.get('#SubMenu\\$Menu').contains('Account').click()

        cy.get('.menu > .ant-menu').contains('Profile')
        cy.get('.ant-menu-item-selected > :nth-child(2) > a').click()
        cy.location('pathname').should('include', 'profile')
        cy.contains('First Name')
        cy.get('.ant-btn').contains('Edit').click()

        cy.contains('Cancel').click()

        cy.get('body').should('contain','Nguyen 1')

        cy.get('body').should('contain', 'Edit');
    })

});


/*

describe('Test the Navigation Bar', () =>{

    for (const user of testLoginUser){
        it(user.summary, function()
        {
            cy.visit('/');

            cy.contains('Login').click();

            //fill in username
            cy.get('#basic_username')
                .type(user.username)
                .should("have.value",user.username);

            //fill in psw
            cy.get('#basic_password')
                .type(user.password)
                .should("have.value",user.password);

            //submit form and assertion
            cy.get('form#basic').submit();
            if (user.username === 'test0'){
                cy.get('body').should('contain', 'Customer Level Pricing')
            }else if (user.username === 'test5'){
                cy.get('body').should('contain', 'Orders Processed')
            }else {
                cy.get('body').should('not.contain', 'Calendar')
            }
            // 直接截图整个页面
            cy.screenshot()
        })
    }
});
* */
