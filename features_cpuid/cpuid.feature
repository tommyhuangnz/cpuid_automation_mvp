# Feature: CPUID CPU Temperature Validation
#   # Background:
#   # Given I have installed pnpm packages in the cpuid_test environment

#   @run-this
#   Scenario Outline: CPUID CPU Tempreture reading behaves similary as Old Version
#     # When install cam-core ver "69.0.0"
#     When Compute CPU Temperature data for 5 seconds
#     # And install cam-core ver "69.1.0"
#     # And Compute CPU Temperature data for "5" seconds
#     # Then The error rate is below 5%

Feature: Validate CPU temperature within 3% error rate

  @applyHook
  Scenario: CPU temperature difference is within acceptable range
    Given the JSON file "cpuid_reading.json" exists
    When I compare the cpu_temperature values between versions
    Then the temperature difference should be within 8%