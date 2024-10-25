Feature: OrangeHRM Login Functionality

  Scenario: LOGIN_001 - Should login successfully with valid credentials
    Given I visit the login page
    When I enter username "Admin"
    And I enter password "admin123"
    And I click the login button
    Then I should receive a successful login response
    And I should be redirected to the dashboard page

  Scenario: LOGIN_002 - Should show error for invalid username
    Given I visit the login page
    When I enter username "wronguser"
    And I enter password "admin123"
    And I click the login button
    Then I should see error message

  Scenario: LOGIN_003 - Should show error for invalid password
    Given I visit the login page
    When I enter username "Admin"
    And I enter password "wrongpass"
    And I click the login button
    Then I should see error message

  Scenario: LOGIN_004 - Should validate empty fields
    Given I visit the login page
    When I click the login button
    Then I should see required field error messages

  Scenario: LOGIN_005 - Should allow login using keyboard navigation
    Given I visit the login page
    When I enter username "Admin" and press Tab
    And I enter password "admin123" and press Enter
    Then I should receive a successful login response
    And I should be redirected to the dashboard page

  Scenario: LOGIN_006 - Should measure login response time
    Given I visit the login page
    When I enter username "Admin"
    And I enter password "admin123"
    And I click the login button
    Then I should measure the login response time

  Scenario: LOGIN_007 - Should navigate to forgot password page
    Given I visit the login page
    When I click the forgot password link
    Then I should be redirected to the forgot password page
    And I should see the reset password header

  Scenario: LOGIN_008 - Should handle very long usernames
    Given I visit the login page
    When I enter a very long username
    And I enter password "admin123"
    And I click the login button
    Then I should see error message

  Scenario: LOGIN_009 - Should be resilient to simple SQL injection attempts
    Given I visit the login page
    When I enter SQL injection in username
    And I enter SQL injection in password
    And I click the login button
    Then I should see error message

  Scenario: LOGIN_010 - Should handle caps lock input
    Given I visit the login page
    When I enter username "ADMIN"
    And I enter password "ADMIN123"
    And I click the login button
    Then I should see error message
