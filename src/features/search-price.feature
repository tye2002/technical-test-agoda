Feature: Search Hotel Price

  Scenario Outline: Verify that user can search hotel price and view details successfully
    Given the user navigates to the Agoda home page
    When the user searches for hotel "Muong Thanh Saigon Centre Hotel"
    And the user selects check-in date as current date plus <checkInOffset> days and check-out date as current date plus <checkOutOffset> days
    And the user selects <rooms> room, <adults> adults, and <children> children
    And the user clicks the search button
    And the search results should match check-in date plus <checkInOffset> days and check-out date plus <checkOutOffset> days
    And the search results should match <rooms> room, <adults> adults, and <children> children
    When the user chooses the first available option
    Then the price of the hotel should be displayed
    Examples:
      | checkInOffset | checkOutOffset | rooms | adults | children |
      | 2             | 3              | 1     | 4      | 2        |
