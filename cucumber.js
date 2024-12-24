module.exports = {
    default: {
      require: ['ts-node/register', 'features_cpuid/**/*.steps.ts', 'features_cpuid/**/*.ts'], // Load step definitions
      format: ['progress'], // Use progress bar output
      paths: ['features_cpuid/**/*.feature'], // Path to feature files
      defaultTimeout: 30000,
    },
  }
  