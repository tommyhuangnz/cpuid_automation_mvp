Feature: Validate CPU temperature within 5% error rate

  # @applyHook
  Scenario: CPU temperature difference is within acceptable range
    Given the JSON file "cpuid_reading.json" exists
    When I compare the cpu_temperature values between versions
    Then the temperature difference should be within 5%