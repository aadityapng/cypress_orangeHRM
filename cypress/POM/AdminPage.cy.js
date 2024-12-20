export default class AdminPage {
  static searchUsername() {
    return cy.get('[class="oxd-input oxd-input--active"]').eq(1);
  }

  static searchEmployeeName() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  static employeeAutocomplete() {
    return cy.get(".oxd-autocomplete-dropdown > *").first();
  }

  static searchUserRole() {
    return cy.get(".oxd-select-text").eq(0);
  }

  static searchStatus() {
    return cy.get(".oxd-select-text").eq(1);
  }

  static buttonSearch() {
    return cy.get('button[type="submit"]');
  }

  static buttonReset() {
    return cy.get(".oxd-button.oxd-button--medium.oxd-button--ghost");
  }

  static buttonAdd() {
    return cy.get(
      'button[class="oxd-button oxd-button--medium oxd-button--secondary"]'
    );
  }

  static searchEmployeeByName(employeeName) {
    cy.get('input[placeholder="Type for hints..."]').clear().type(employeeName);
    cy.get(".oxd-autocomplete-dropdown").should("be.visible");
    cy.get(".oxd-autocomplete-dropdown > *").first().click();
  }

  static clickSearchButton() {
    cy.get('button[type="submit"]').click();
  }

  static verifySearchResults(employeeName) {
    cy.get("[data-v-6c07a142]").eq(2).should("contain", employeeName);
  }

  static searchResults() {
    return cy.get(".oxd-table-body");
  }

  static userRecord(username) {
    return cy.contains(".oxd-table-cell", username);
  }

  static addUserRole() {
    return cy.get(".oxd-select-text").eq(0);
  }

  static addEmployeeName() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  static addEmployeeName() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  static employeeAutocompleteName() {
    return cy.get(".oxd-autocomplete-dropdown > *").first();
  }

  static addStatus() {
    return cy.get(".oxd-select-text").eq(1);
  }

  static addUsername() {
    return cy.get(".oxd-input.oxd-input--active").eq(1);
  }

  static addPassword() {
    return cy.get('.oxd-input.oxd-input--active').eq(2);
  }

  static addConfirmPassword() {
    return cy.get('.oxd-input.oxd-input--active').eq(3);
  }

  static buttonSave() {
    return cy.get('button[type="submit"]');
  }

  static successMessage() {
    return cy.get(".oxd-toast");
  }

  // Helper method
  static waitForDropdownToLoad() {
    return cy
      .get(".oxd-autocomplete-dropdown")
      .should("exist")
      .should("be.visible");
  }
}
