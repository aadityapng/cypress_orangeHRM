import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AdminPage from "../../POM/AdminPage.cy.js";

Given("I am logged in as admin", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com");
  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
});

Given("I navigate to Admin page", () => {
  cy.intercept(
    "GET",
    "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers"
  ).as("adminPageLoad");
  cy.contains("Admin").click();
  cy.wait("@adminPageLoad");
});

Given("I fetch the employee names", () => {
  cy.request(
    "/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC"
  ).then((response) => {
    const employees = response.body.data.map((user) => {
      const employee = user.employee;
      const fullName = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
      return fullName;
    });
    Cypress.env("employeeNames", employees[0]);
    cy.log("Selected Employee Name: " + employees[0]); 
  });
});

When("I select an existing employee in add form admin", () => {
  const employeeName = Cypress.env("employeeNames");
  AdminPage.addEmployeeName().type(employeeName);
  cy.wait(4000); 
  AdminPage.employeeAutocompleteName().click();
  cy.log("Selected Employee Name:----- " + employeeName); 
});

When("I enter username {string} in the search form", (username) => {
  AdminPage.searchUsername().type(username);
});

When("I enter employee name {string} in the search form", () => {
  AdminPage.searchEmployeeName().type("a");
  AdminPage.waitForDropdownToLoad();
  AdminPage.employeeAutocomplete().click();
  AdminPage.searchEmployeeName().should("have.value");
});

When("I select user role {string} in the search form", (role) => {
  AdminPage.searchUserRole().click();
  cy.contains(role).click();
});

When("I select status {string} in the search form", (status) => {
  AdminPage.searchStatus().click();
  cy.contains(status).click();
});

When("I click search button", () => {
  AdminPage.buttonSearch().click();
});

Then("I should see the selected employee in the results", () => {
  const employeeName = Cypress.env("employeeNames");
  cy.log("Verifying Employee in Results: " + employeeName); 
  AdminPage.verifySearchResults(employeeName); 
});

Then("The search results should load correctly", () => {
  cy.get(AdminPage.searchResults).should("be.visible"); 
});

When("I click reset button", () => {
  AdminPage.buttonReset().click();
});

When("I click add button", () => {
  AdminPage.buttonAdd().click();
  cy.url().should("include", "/admin/saveSystemUser"); // Pastikan tetap di halaman Add User
  cy.wait(2000); // Bisa dihapus jika tidak perlu lagi
});

// Add User Form Steps
When("I select user role {string} in add form", (role) => {
  AdminPage.addUserRole().click();
  cy.contains(role).click();
});

When("I select an existing employee in add form", () => {
  const employeeName = Cypress.env("employeeNames");
  AdminPage.addEmployeeName().type(employeeName);
  cy.log("Selected Employee Name: " + employeeName); 
});

When("I select status {string} in add form", (status) => {
  AdminPage.addStatus().click();
  cy.contains(status).click();
});

When("I enter new username {string} in add form", (username) => {
  AdminPage.addUsername().type(username);
});

When("I enter password {string} in add form", (password) => {
  cy.log("Password: " + password);
  AdminPage.addPassword().type(password);
});

When("I confirm password {string} in add form", (password) => {
  AdminPage.addConfirmPassword().type(password);
});

When("I click save button", () => {
  cy.intercept("POST", "**/admin/users").as("saveUser");
  AdminPage.buttonSave().click();
  cy.wait("@saveUser");
});

Then("I should see user {string} in the results", (username) => {
  AdminPage.userRecord(username).should("be.visible");
});

// Then("I should see employee {string} in the results", () => {
//   AdminPage.searchResults()
//     .should("be.visible")
//     .find(".oxd-table-cell")
//     .should("exist");
// });

Then("I should see users with role {string} in the results", (role) => {
  cy.contains(role).should("be.visible");
});

Then("I should see users with status {string} in the results", (status) => {
  cy.contains(status).should("be.visible");
});

Then("the search results should load correctly", () => {
  AdminPage.searchResults().should("be.visible");
});

Then("the search form should be cleared", () => {
  AdminPage.searchUsername().should("have.value", "");
  AdminPage.searchEmployeeName().should("have.value", "");
});

Then("I should see add user form", () => {
  cy.contains("Add User").should("be.visible");
});

Then("I should see success message", () => {
  AdminPage.successMessage().should("be.visible");
});

Then("the new user should be in the list", () => {
  cy.reload();
  AdminPage.searchResults().should("be.visible");
});
