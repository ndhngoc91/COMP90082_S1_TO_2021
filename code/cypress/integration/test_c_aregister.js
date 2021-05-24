import {testRegisterUser} from "./testRegisterUser";
import {testRegisterStaff} from "./testRegisterUser";

describe('Home Page to Register Page', function() {
    it('test',() => {
        cy.visit('/')
        cy.get('.ant-menu > :nth-child(8)').click()

        // go to http://127.0.0.1:3000/register
        cy.url().should('include', '/register')

        cy.get('body').should('contain', 'Already')


        cy.getCookies().each((cookie) => {
            cy.log(cookie.name,cookie.value);
        })

        cy.screenshot()
    })
})

describe('Register Staff Page', function() {
    beforeEach(() => {
        cy.visit('/register-as-a-admin')
    })
    for (const staff of testRegisterStaff){
        it(staff.summary, function()
        {

            cy.get('#username').type(staff.username)
                .should('have.value', staff.username)

            cy.get('#password').type(staff.password)
                .should('have.value', staff.password)
            if (staff.username == 'test6'){
                cy.get('body').should('contain', 'one number')
            }
            cy.get('#phone').type(staff.phone)
                .should('have.value', staff.phone)
            cy.get('#first_name').type(staff.firstName)
                .should('have.value', staff.firstName)
            cy.get('#last_name').type(staff.lastName)
                .should('have.value', staff.lastName)
            cy.get('#confirm_password').type(staff.confirmPSW)
                .should('have.value', staff.confirmPSW)
            cy.get('#agreement').check()
            cy.get('#email').type(staff.email)
                .should('have.value', staff.email)
            if (staff.username == 'test7'){
                cy.get('body').should('contain', 'valid')
            }

            cy.get('.ant-form').submit()

            cy.url().should('include', '/')

            cy.log(staff.username)
            if (staff.username == 'ruby'){
                cy.get('body').should('contain', 'Username')
            }else if (staff.username == 'test5'){
                cy.get('body').should('contain', 'Packages')
            }else if (staff.username == 'test8'){
                cy.get('body').should('contain', 'Email')
            }

            
            cy.getCookies().each((cookie) => {
                cy.log(cookie.name,cookie.value);
            })

            cy.screenshot()
        })
    }
})

describe('Register customer Page', function() {
    beforeEach(() => {
        cy.visit('/register')
    })

    for (const user of testRegisterUser){
        it(user.summary, function()
        {
            // 输入用户名
            cy.get('#username.ant-input').type(user.username)
                .should('have.value', user.username)
            // 输入密码
            cy.get('#password.ant-input').type(user.password)
                .should('have.value', user.password)
            if (user.username == 'test1'){
                cy.get('body').should('contain', 'one number')
            }
            cy.get('#phone.ant-input').type(user.phone)
                .should('have.value', user.phone)
            cy.get('#first_name.ant-input').type(user.firstName)
                .should('have.value', user.firstName)
            cy.get('#last_name.ant-input').type(user.lastName)
                .should('have.value', user.lastName)

            cy.get(".ant-picker-input").click().type('1996-06-05').click()
            cy.get("[title='1996-06-05']>.ant-picker-cell-inner").click()//.should('have.value', user.birthday)

            cy.get(':nth-child(5) > :nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > ' +
                '.ant-form-item-control-input-content > .ant-select > .ant-select-selector').click().type(user.gender).click()
            cy.get("[title=\"Female\"] > .ant-select-item-option-content").click({force: true}).should('contain',user.gender)

            cy.get('#address_line').type(user.addressLine)
                .should('have.value', user.addressLine)

            cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > ' +
                '.ant-select > .ant-select-selector').click().type(user.state).click()
            cy.get("[title=\"VIC\"] > .ant-select-item-option-content").click({force: true}).should('contain',user.state)
            cy.get(':nth-child(7) > :nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > ' +
                '.ant-select > .ant-select-selector').click().type(user.city).click()
            cy.get("[title=\"Melbourne\"] > .ant-select-item-option-content").click({force: true}).should('contain',user.city)

            cy.get('#postcode').type(user.postcode)
                .should('have.value', user.postcode)
            cy.get('#confirm_password').type(user.confirmPSW)
                .should('have.value', user.confirmPSW)
            if (user.username == 'test2'){
                cy.get('body').should('contain', 'not match')
            }
            cy.get('#email').type(user.email)
                .should('have.value', user.email)
            if (user.username == 'test3'){
                cy.get('body').should('contain', 'valid')
            }
            cy.get('#agreement').check()
            // 提交表单
            cy.get('.ant-form').submit()
            // 判断页面跳转到 http://127.0.0.1:3000/
            cy.url().should('include', '/')
            // and '欢迎您：ruby' in page
            cy.log(user.username)
            if (user.username == 'user1'){
                cy.get('body').should('contain', 'Username')
            }else if (user.username == 'test0' || user.username == 'test9'){
                cy.get('body').should('contain', 'Packages')
            }else if (user.username == 'test4'){
                cy.get('body').should('contain', 'Email')
            }

            //输出为空，网站不存在cookie
            cy.getCookies().each((cookie) => {
                cy.log(cookie.name,cookie.value);
            })
            // 直接截图整个页面
            cy.screenshot()
        })
    }
})