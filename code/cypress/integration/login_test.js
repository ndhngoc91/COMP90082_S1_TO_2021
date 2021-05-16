import {testLoginUser} from "./testLoginUser";


describe('Visit Home Page, test the Basic Login', () =>{

    it('successfully loads and login',()=>{
        cy.visit('/');

        cy.contains('Login').click();

        //fill in username
        cy.get('#basic_username')
            .type('user1')
            .should("have.value",'user1');

        //fill in psw
        cy.get('#basic_password')
            .type('squizz')
            .should("have.value",'squizz');

        //submit form and assertion
        cy.get('form#basic').submit();
        cy.get('body').should('contain','Calendar')

    })
});


describe('The Login page, login as staff mode', function() {
    beforeEach(() => {
        cy.visit('/login')
    });

    for (const user of testLoginUser){
        it(user.summary, function()
        {
            //fill in username
            cy.get('#normal_login_username').type(user.username)
                .should('have.value', user.username);
            //fill in psw
            cy.get('#normal_login_password').type(user.password)
                .should('have.value', user.password);
            //submit form and assertion
            cy.get('#normal_login').submit();

            //should redirect to homepage
            cy.url().should('eq', Cypress.config().baseUrl);

            //should see related button
            cy.log(user.username);
            if (user.username === 'user1'){
                cy.get('body').should('contain', 'Customer Level Pricing')
            }else if (user.username === 'ruby'){
                cy.get('body').should('contain', 'Orders Processed')
            }

            //输出为空，网站不存在cookie
            // cy.getCookies().each((cookie) => {
            //     cy.log(cookie.name,cookie.value);
            // })
        })
    }

});



describe('The Login page, login as customer mode', function() {
    beforeEach(() => {
        cy.visit('/login')
    });

    it("Customer", function()
    {
        //fill in username
        cy.get('#normal_login_username').type('user1')
            .should('have.value', 'user1')
        //fill in psw
        cy.get('#normal_login_password').type('squizz')
            .should('have.value', 'squizz')
        // submit form
        cy.get('.ant-btn').click()
        // redirect to  http://127.0.0.1:3000/
        cy.url().should("eq", Cypress.config().baseUrl);
        // contain related tab
        cy.get('body').should('contain', 'Customer Level Pricing')

        // //输出为空，网站不存在cookie
        // cy.getCookies().each((cookie) => {
        //     cy.log(cookie.name,cookie.value);
        // })
    })
});

// describe('Login as staff Modal', function() {
//     beforeEach(() => {
//         cy.visit('/');
//         cy.get('.ant-menu > :nth-child(8)').click()
//     });
//
//     it("Staff", function()
//     {
//         // 输入用户名
//         cy.get('#basic_username').type('ruby')
//             .should('have.value', 'ruby')
//         // 输入密码
//         cy.get('#basic_password').type('squizz')
//             .should('have.value', 'squizz')
//         // 提交表单
//         cy.get('.ant-form-item-control-input-content > .ant-btn').click()
//         // 判断页面跳转到 http://127.0.0.1:3000/
//         cy.url().should('eq', Cypress.config().baseUrl)
//         // and '欢迎您：user1' in page
//         cy.get('body').should('contain', 'Orders Processed')
//
//         //输出为空，网站不存在cookie
//         cy.getCookies().each((cookie) => {
//             cy.log(cookie.name,cookie.value);
//         })
//     })
// })

// describe('Login as customer Modal', function() {
//     beforeEach(() => {
//         cy.visit('http://127.0.0.1:3000/')
//         cy.get('.ant-menu > :nth-child(8)').click()
//     });
//
//     it("customer modal", function()
//     {
//         // 输入用户名
//         cy.get('#basic_username').type('user1')
//             .should('have.value', 'user1')
//         // 输入密码
//         cy.get('#basic_password').type('squizz')
//             .should('have.value', 'squizz')
//         // 提交表单
//         cy.get('.ant-form-item-control-input-content > .ant-btn').click()
//         // 判断页面跳转到 http://127.0.0.1:3000/
//         cy.url().should('include', 'http://127.0.0.1:3000/')
//         // and '欢迎您：user1' in page
//         cy.get('body').should('contain', 'Ruby')
//
//         //输出为空，网站不存在cookie
//         cy.getCookies().each((cookie) => {
//             cy.log(cookie.name,cookie.value);
//         })
//     })
// });


describe('API test-Post', function() {
    it('Post', function() {
        cy.request({
            method:'POST',
            url:Cypress.config().baseUrl+'auth/login',
            failOnStatusCode:false,
            form:true,
            body:{
                'username':'user1',
                'password':'squizz',
            }
        }).then((response)=>{
            expect(response.status).to.be.equal(200)
        })
    })
});

