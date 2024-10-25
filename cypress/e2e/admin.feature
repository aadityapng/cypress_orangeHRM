Feature: OrangeHRM Admin Dashboard Functionality

  Background: User is logged in
    Given I am logged in as admin
    And I navigate to Admin page

  Scenario: ADMIN_001 - Should search user by username successfully
    When I enter username "Admin" in the search form
    And I click search button
    Then I should see user "Admin" in the results
    And the search results should load correctly

  Scenario: ADMIN_002 - Should search user by employee name
    Given I fetch the employee names
    When I select an existing employee in add form admin
    And I click search button
    And The search results should load correctly

  Scenario: ADMIN_003 - Should filter users by user role
    When I select user role "Admin" in the search form
    And I click search button
    Then I should see users with role "Admin" in the results
    And the search results should load correctly

  Scenario: ADMIN_004 - Should filter users by status
    When I select status "Enabled" in the search form
    And I click search button
    Then I should see users with status "Enabled" in the results
    And the search results should load correctly

  Scenario: ADMIN_005 - Should reset search form
    When I enter username "Admin" in the search form
    And I click reset button
    Then the search form should be cleared

  Scenario: ADMIN_006 - Should add new admin user successfully
    When I click add button
    Then I should see add user form
    When I select user role "Admin" in add form
    And I select an existing employee in add form
    And I select status "Enabled" in add form
    And I enter new username "TestAdmin123" in add form
    And I enter password "Admin123!!!" in add form
    And I confirm password "Admin123!!!" in add form
    And I click save button
    Then I should see success message
    And the new user should be in the list