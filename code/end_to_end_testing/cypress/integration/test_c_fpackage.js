let record = []
let itemsdetail = []
let extraItems = []
let desc = []
let count = []
let orderlist = []

describe("Test the package to Shopping Cart page", () => {
    beforeEach(() => {
        cy.visit("/login")
        //fill in username
        cy.get("#normal_login_username").type("user1").should("have.value", "user1");
        //fill in psw
        cy.get("#normal_login_password").type("squizz").should("have.value", "squizz");
        //submit form and assertion
        cy.get("#normal_login").submit();
    })

    it("Package to Shopping Cart page", () => {
        cy.get(".ant-menu > :nth-child(4)").click();
        cy.url().should("contain", "/packages");

        cy.get("div.ant-card-meta-title").each((item, index, $list) => {
            cy.log(item.text(), index, $list);
            const temp = item.text();
            record.push(temp);
        })
        cy.log(JSON.stringify(record));
        cy.get("button.ant-btn.ant-btn-link.ant-btn-lg").each((item, index) => {
            //cy.log(item,index,$list)
            if ((index % 2 === 1) && (index < 12)) {
                cy.get(":nth-child(" + index + ") > .ant-card > .ant-card-body > " +
                    ".ant-row-space-between > .ant-typography > .ant-btn").click();
                //cy.log(index,record[index-1])
                cy.get("body").should("contain", record[index - 1]);
                orderlist.push(record[index - 1]);


                cy.get(".ant-form label").each((item3, index3, $list3) => {
                    cy.log(item3.text(), index3, $list3);
                    const temp1 = index3 + 1;
                    cy.get(":nth-child(" + temp1 + ") > .ant-col-16 > label").each((item) => {
                        cy.log(item.text());
                        desc.push(item.text());
                    })
                    cy.log("label detail：" + item3.text().toString());
                    //desc.push(item3.text())
                    //cy.log(desc)
                });

                cy.log("detail..............:" + desc);

                cy.get(".ant-form-item-label > label").each((item2, index2) => {
                    if (index2 % 2 === 1) {

                        cy.log("detail[0]: " + desc[0]);
                        cy.get(":nth-child(" + index2 + ") > .ant-col-8 > .ant-form-item-control-input > " +
                            ".ant-form-item-control-input-content > .ant-input-number > " +
                            ".ant-input-number-handler-wrap > .ant-input-number-handler-up").click();
                        count.push(index2);
                        cy.log(JSON.stringify(index2));
                        count.push(desc[index2 - 1]);
                        cy.log(JSON.stringify(cy.get(":nth-child(1) > .ant-col-16 > label")));
                    }
                });
                cy.log(JSON.stringify(count));

                cy.get("label.ant-checkbox-wrapper").each(item4 => {
                    cy.log(item4.text());
                    const temp = item4.text();
                    itemsdetail.push(temp);
                });

                cy.get("input.ant-checkbox-input").each((item1, index1) => {
                    if (index1 % 2 === 1) {
                        cy.get(":nth-child(" + index1 + ") > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input").click();
                        //extraItems.push(index1)
                        extraItems.push(itemsdetail[index1]);
                        cy.log(JSON.stringify(index1));
                        cy.log(itemsdetail[index1]);
                    }
                });
                cy.log(JSON.stringify(extraItems));

                cy.log("record" + record[0]);

                cy.get(".ant-btn").click();
                cy.url().should("contain", "/shopping-cart");

                for (let length = 0; length < count.length; length++) {
                    cy.get("body").contains(count[length]);
                }

                if (index < 11) {
                    cy.get(":nth-child(2) > .ant-btn").click();
                } else {
                    cy.get('[style="margin-bottom: 8px;"] > .ant-btn').click();
                }
            }
        }).then(() => {
            cy.url().should("contain", "/checkout")
            for (let length = 0; length < orderlist.length; length++) {
                cy.get("body").contains(orderlist[length]);
                cy.log(orderlist[length]);
            }
        });
    });
});
