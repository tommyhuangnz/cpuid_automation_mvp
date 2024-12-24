Feature: CPUID CPU Temperature Validation
  # Background:
  # Given I have installed pnpm packages in the cpuid_test environment

  @run-this
  Scenario Outline: CPUID CPU Tempreture reading behaves similary as Old Version
    # When install cam-core ver "69.0.0"
    When Compute CPU Temperature data for 5 seconds
    # And install cam-core ver "69.1.0"
    # And Compute CPU Temperature data for "5" seconds
    # Then The error rate is below 5%

