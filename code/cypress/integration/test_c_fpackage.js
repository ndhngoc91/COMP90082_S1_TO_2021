let record = []
let itemsdetail = []
let extraItems = []
let desc = []
let count = []
let orderlist = []

describe('Test the package to shopping cart Page', () => {
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

    it('Package to shopping cart Page', () => {
        cy.get('.ant-menu').contains('Packages').click()
        cy.url().should('contain', '/packages')


        cy.get('h4.ant-typography').each((item,index,$list) => {
            cy.log(item.text(),index,$list)
            const temp = item.text()
            record.push(temp)
        })
        cy.log(record)
        cy.get('button.ant-btn.ant-btn-primary').each((item,index,$list) => {
            //cy.log(item,index,$list)
            if ((index % 2 === 1) && (index < 12)){
                cy.get(':nth-child('+index+') > .ant-space-vertical > :nth-child(3) > .ant-space > ' +
                    '[style="margin-right: 8px;"] > .ant-typography > .ant-btn').click()
                //cy.log(index,record[index-1])
                cy.get('body').should('contain',record[index-1])
                orderlist.push(record[index-1])


                cy.get('.ant-form label').each((item3,index3,$list3) => {
                    cy.log(item3.text(),index3,$list3)
                    const temp1 = index3+1
                    cy.get(':nth-child('+temp1+') > .ant-col-16 > label').each((item) => {
                        cy.log(item.text())
                        desc.push(item.text())
                    })
                    cy.log("label detail："+item3.text().toString())
                    //desc.push(item3.text())
                    //cy.log(desc)
                })

                cy.log("detail..............:"+desc)

                cy.get('.ant-form-item-label > label').each((item2,index2,$list2) => {
                    if (index2 % 2 === 1){

                        cy.log('detail[0]: '+desc[0])
                        cy.get(':nth-child('+index2+') > .ant-col-8 > .ant-form-item-control-input > ' +
                            '.ant-form-item-control-input-content > .ant-input-number > ' +
                            '.ant-input-number-handler-wrap > .ant-input-number-handler-up').click()
                        count.push(index2)
                        cy.log(index2)
                        count.push(desc[index2-1])
                        cy.log(cy.get(':nth-child(1) > .ant-col-16 > label'))
                    }
                })
                cy.log(count)

                cy.get('label.ant-checkbox-wrapper').each((item4,index,$list) => {
                    cy.log(item4.text())
                    const temp = item4.text()
                    itemsdetail.push(temp)
                })

                /*
                let temp1;
                cy.get('div.ant-col.ant-col-16.ant-form-item-label').each(((item3,index3,$list3) => {
                    //cy.log(item3.text(),index3,$list3)
                    temp1 = item3.text()
                    cy.log(temp1)
                    details.push(temp1)
                    cy.log(details[0])
                }))
                cy.log(details[0])
                * */

                cy.get('input.ant-checkbox-input').each(((item1, index1, $list1) => {
                    if (index1 % 2 === 1){
                        cy.get(':nth-child('+index1+') > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()
                        //extraItems.push(index1)
                        extraItems.push(itemsdetail[index1])
                        cy.log(index1)
                        cy.log(itemsdetail[index1])
                    }
                }))
                cy.log(extraItems)

                cy.log('record'+record[0])

                cy.get('.ant-btn').click()
                cy.url().should('contain','/shopping-cart')

                for (let length = 0; length < count.length; length++){
                    cy.get('body').contains(count[length])
                }

                if (index < 11){
                    cy.get(':nth-child(2) > .ant-btn').click()
                }else {
                    cy.get('[style="margin-bottom: 8px;"] > .ant-btn').click()
                }
            }
        }).then(($list) => {
            cy.url().should('contain','/checkout')
            for (let length = 0; length < orderlist.length; length++){
                cy.get('body').contains(orderlist[length])
                cy.log(orderlist[length])
            }
            //cy.get('[style="margin-bottom: 8px;"] > .ant-btn').click()
        })

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
