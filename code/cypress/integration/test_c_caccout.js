describe('Test the Navigation Bar', () => {
    beforeEach(() => {
        cy.visit('/login')
        //fill in username
        cy.get('#normal_login_username').type("user2")
            .should('have.value', "user2");
        //fill in psw
        cy.get('#normal_login_password').type("123456sS")
            .should('have.value', "123456sS");
        //submit form and assertion
        cy.get('#normal_login').submit();
    })

    it('Edit account Page successfully', () => {
        cy.get('.ant-menu').contains('Yue').click()
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
        cy.get('#basic_height').clear().type('170')
            .should('have.value','170')

        cy.get(':nth-child(4) > .ant-row > .ant-form-item-control > ' +
            '.ant-form-item-control-input > .ant-form-item-control-input-content > ' +
            '.ant-select > .ant-select-selector').click().get("div.ant-select-item-option-content")
            .parent().eq(1)
            .click({force: true}).should('contain','Intermediate')

        cy.get(':nth-child(3) > .ant-row > .ant-form-item-control > ' +
            '.ant-form-item-control-input > .ant-form-item-control-input-content > ' +
            '.ant-select > .ant-select-selector').click().get("div.ant-select-item-option-content")
            .parent().contains('Female').click({force:true}).should('contain','Female')

        cy.contains('Submit').click()

        cy.get('body').should('contain', 'Edit');


    })

    it('Not edit Profile Page', () => {
        cy.get('.ant-menu').contains('Yue').click()
        cy.get('#SubMenu\\$Menu').contains('Account').click()

        cy.get('.menu > .ant-menu').contains('Profile')
        cy.get('.ant-menu-item-selected > :nth-child(2) > a').click()
        cy.location('pathname').should('include', 'profile')
        cy.contains('First Name')
        cy.get('.ant-btn').contains('Edit').click()

        cy.contains('Submit').click()

        cy.get('body').should('contain', 'Edit');
    })

    it('Link to address Page successfully', () => {
        cy.get('.ant-menu').contains('Yue').click()
        cy.get('#SubMenu\\$Menu').contains('Account').click()

        cy.get('.menu > .ant-menu').contains('Addresses')
        cy.get(':nth-child(3) > :nth-child(2) > a').click()
        cy.url().should('contain', '/address')
        cy.contains('Add Address')
        cy.get('button.ant-btn.ant-btn-primary').contains('Add').click()
        cy.contains('State')

        cy.get('input#address_line.ant-input').type('48 Bouverie St')
            .should('have.value','48 Bouverie St')
        cy.get('#postcode')
            .type('3053').should('have.value','3053')
        cy.get('.ant-form-item-control-input-content > .ant-btn').click()

        cy.get('body').should('contain', '48 Bouverie St');
    })

    /*API broken*/
    it('Link to user groups Page successfully', () => {
        cy.get('.ant-menu').contains('Yue').click()
        cy.get('#SubMenu\\$Menu').contains('Account').click()

        cy.get('.menu > .ant-menu').contains('User')
        cy.get(':nth-child(2) > :nth-child(2) > a').click()
        //cy.url().should('contain', '/user-groups')
        cy.contains('Add Group')
        cy.get('button.ant-btn.ant-btn-primary').contains('Add').click()
        cy.contains('Name')

        cy.get('input#name.ant-input').type('Family').should('have.value','Family')
        cy.get('button.ant-btn.ant-btn-dashed.ant-btn-block').click()
        cy.get('input#contacts_0.ant-input').type('member1').should('have.value','member1')
        cy.contains('Submit').click()

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
