module.exports = {
    default: {
      require: ['ts-node/register', 'features_cpuid/**/*.steps.ts'], // Load step definitions
      format: ['progress'], // Use progress bar output
      paths: ['features_cpuid/**/*.feature'], // Path to feature files
      publishQuiet: true, // Disable publishing
      defaultTimeout: 30000,
    },
  }
  