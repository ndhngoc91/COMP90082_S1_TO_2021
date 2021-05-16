import {testRegisterUser} from "./testRegisterUser";
import {testRegisterStaff} from "./testRegisterUser";

describe('Home Page to Register Page', function() {
    it('test',() => {
        cy.visit('http://127.0.0.1:3000/')
        cy.get('.ant-menu > :nth-child(10)').click()

        // 判断页面跳转到 http://127.0.0.1:3000/register
        cy.url().should('include', 'http://127.0.0.1:3000/register')
        // and '欢迎您：user1' in page
        cy.get('body').should('contain', 'Already')

        //输出为空，网站不存在cookie
        cy.getCookies().each((cookie) => {
            cy.log(cookie.name,cookie.value);
        })
    })
})

describe('Register Staff Page', function() {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3000/register-as-a-admin')
    })
    for (const staff of testRegisterStaff){
        it(staff.summary, function()
        {
            // 输入用户名
            cy.get('#username').type(staff.username)
                .should('have.value', staff.username)
            // 输入密码
            cy.get('#password').type(staff.password)
                .should('have.value', staff.password)
            cy.get('#phone').type(staff.phone)
                .should('have.value', staff.phone)
            cy.get('#email').type(staff.email)
                .should('have.value', staff.email.includes('@'))
            cy.get('#confirm_password').type(staff.confirmPSW)
                .should('have.value', staff.confirmPSW)
            // 提交表单
            cy.get('.ant-form').submit()
            // 判断页面跳转到 http://127.0.0.1:3000/
            cy.url().should('include', '/')
            // and '欢迎您：ruby' in page
            cy.log(staff.username)
            if (staff.username == 'ruby'){
                cy.get('body').should('contain', 'Create')
            }else if (staff.username == 'test2'){
                cy.get('body').should('contain', 'Products')
            }else if (staff.username == 'test3'){
                cy.get('body').should('contain', 'Create')
            }

            //输出为空，网站不存在cookie
            cy.getCookies().each((cookie) => {
                cy.log(cookie.name,cookie.value);
            })
        })
    }
})

describe('Register customer Page', function() {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3000/register')
    })

    for (const user of testRegisterUser){
        it(user.summary, function()
        {
            // 输入用户名
            cy.get('#username').type(user.username)
                .should('have.value', user.username)
            // 输入密码
            cy.get('#password').type(user.password)
                .should('have.value', user.password)
            cy.get('#phone').type(user.phone)
                .should('have.value', user.phone)
            cy.get('#email').type(user.email)
                .should('have.value', user.email)
            cy.get('#first_name').type(user.firstName)
                .should('have.value', user.firstName)
            cy.get('#last_name').type(user.lastName)
                .should('have.value', user.lastName)

            cy.get('#birthday').type(user.birthday)
                .should('have.value', user.birthday)
            cy.get(':nth-child(5) > :nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input >' +
                ' .ant-form-item-control-input-content > .ant-select > .ant-select-selector')
                .eq(0).select(user.gender)
                .should('contain.text', "Female")
            cy.get('#address_line').type(user.addressLine)
                .should('have.value', user.addressLine)
            cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > ' +
                '.ant-form-item-control-input-content > .ant-select > .ant-select-selector')
                .eq(1).select(user.state)
                .should('contain.text', user.state)
            cy.get(':nth-child(7) > :nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > ' +
                '.ant-form-item-control-input-content > .ant-select > .ant-select-selector')
                .eq(2).select(user.city)
                .should('contain.text', user.city)
            cy.get('#postcode').type(user.postcode)
                .should('have.value', user.postcode)
            cy.get('#confirm_password').type(user.confirmPSW)
                .should('have.value', user.confirmPSW)
            // 提交表单
            cy.get('.ant-form').submit()
            // 判断页面跳转到 http://127.0.0.1:3000/
            cy.url().should('include', '/')
            // and '欢迎您：ruby' in page
            cy.log(user.username)
            if (user.username == 'user1'){
                cy.get('body').should('contain', 'Create')
            }else if (user.username == 'test0'){
                cy.get('body').should('contain', 'Products')
            }else if (user.username == 'test1'){
                cy.get('body').should('contain', 'Create')
            }

            //输出为空，网站不存在cookie
            cy.getCookies().each((cookie) => {
                cy.log(cookie.name,cookie.value);
            })
        })
    }
})