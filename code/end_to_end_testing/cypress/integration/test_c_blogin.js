import {testLoginUser} from "./testLoginUser";

describe("Visit Home Page, test the Login Modal", () => {
    for (const user of testLoginUser) {
        it(user.summary, () => {
            cy.visit("/");

            cy.contains("Login").click();

            //fill in username
            cy.get("#basic_username").type(user.username).should("have.value", user.username);

            //fill in psw
            cy.get("#basic_password").type(user.password).should("have.value", user.password);

            //submit form and assertion
            cy.get("form#basic").submit();
            if (user.username === "test0") {
                cy.get("body").should("contain", "Customer Level Pricing");
            } else if (user.username === "test5") {
                cy.get("body").should("contain", "Orders Processed");
            } else {
                cy.get("body").should("not.contain", "Calendar");
            }

            cy.screenshot();
        })
    }
});

describe("The Login page", () => {
    beforeEach(() => {
        cy.visit("/login")
    });

    for (const user of testLoginUser) {
        it(user.summary, () => {
            //fill in username
            cy.get("#normal_login_username").type(user.username).should("have.value", user.username);
            //fill in psw
            cy.get("#normal_login_password").type(user.password).should("have.value", user.password);
            //submit form and assertion
            cy.get("#normal_login").submit();

            //should see related button
            cy.log(user.username);
            if (user.username === "test0") {
                //should redirect to homepage
                cy.url().should("eq", Cypress.config().baseUrl);
                cy.get("body").should("contain", "Customer Level Pricing");
            } else if (user.username === "test5") {
                //should redirect to homepage
                cy.url().should("eq", Cypress.config().baseUrl);
                cy.get("body").should("contain", "Orders Processed");
            } else {
                cy.get("body").should("not.contain", "Calendar");
            }

            cy.screenshot();
        })
    }

});
