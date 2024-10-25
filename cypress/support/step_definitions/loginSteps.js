import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../POM/LoginPage.cy.js";

Given("I visit the login page", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
});

When("I enter username {string}", (username) => {
  LoginPage.inputUsername().type(username);
});

When("I enter password {string}", (password) => {
  LoginPage.inputPassword().type(password);
});

When("I click the login button", () => {
  cy.intercept("GET", "**/action-summary").as("loginRequest");
  LoginPage.buttonSubmit().click();
});

When("I enter a very long username", () => {
  const longUsername = "a".repeat(100);
  LoginPage.inputUsername().type(longUsername, { delay: 0 });
});

When("I enter SQL injection in username", () => {
  LoginPage.inputUsername().type("' OR '1'='1");
});

When("I enter SQL injection in password", () => {
  LoginPage.inputPassword().type("' OR '1'='1");
});

When("I enter username {string} and press Tab", (username) => {
  LoginPage.inputUsername().type(username); 
  cy.realPress("Tab"); 
});

When("I enter password {string} and press Enter", (password) => {
  cy.intercept("GET", "**/action-summary").as("loginRequest");
  LoginPage.inputPassword().type(password);
  cy.realPress("Enter");
});


When("I click the forgot password link", () => {
  cy.intercept("GET", "**/requestPasswordResetCode").as("forgotPasswordRequest");
  LoginPage.forgotPasswordLink().click();
});

Then("I should see error message", () => {
  LoginPage.errorMessage().should("be.visible");
});

Then("I should see required field error messages", () => {
  LoginPage.requiredFieldError().should("be.visible");
});

Then("I should receive a successful login response", () => {
  cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
});

Then("I should be redirected to the dashboard page", () => {
  cy.url().should("include", "/dashboard");
  LoginPage.dashboardPage().should("be.visible");
});

Then("I should measure the login response time", () => {
  const startTime = new Date().getTime();
  cy.wait("@loginRequest").then((intercept) => {
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    expect(responseTime).to.be.lessThan(5000);
    expect(intercept.response.statusCode).to.equal(200);
  });
});

Then("I should be redirected to the forgot password page", () => {
  cy.wait("@forgotPasswordRequest").its("response.statusCode").should("eq", 200);
  cy.url().should("include", "/requestPasswordResetCode");
});

Then("I should see the reset password header", () => {
  LoginPage.resetPasswordHeader().should("be.visible");
});
