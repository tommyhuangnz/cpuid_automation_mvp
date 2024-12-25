import { Given, When, Then } from '@cucumber/cucumber';
import * as fs from 'fs/promises';

let cpuTemperatures: { [version: string]: { cpu_temperature: number; timestamp: string } } = {};
let errorRate: number | null = null; // Store a single error rate

Given('the JSON file {string} exists', async (fileName: string) => {
  try {
    const rawData = await fs.readFile(fileName, 'utf-8');
    cpuTemperatures = JSON.parse(rawData);
    if (!Object.keys(cpuTemperatures).length) {
      throw new Error('File is empty or has no valid data.');
    }
  } catch (err) {
    throw new Error(`Failed to load or parse the JSON file.`);
  }
});

When('I compare the cpu_temperature values between versions', async () => {
  const versions = Object.keys(cpuTemperatures);
  if (versions.length !== 2) {
    throw new Error('There must be exactly two versions to compare.');
  }

  const [previousVersion, currentVersion] = versions;
  const previousTemp = cpuTemperatures[previousVersion].cpu_temperature;
  const currentTemp = cpuTemperatures[currentVersion].cpu_temperature;

  const difference = Math.abs(currentTemp - previousTemp);
  errorRate = (difference / previousTemp) * 100;

  console.log(`Comparing ${previousVersion} (${previousTemp}°C) and ${currentVersion} (${currentTemp}°C)`);
  console.log(`Difference: ${difference.toFixed(2)}°C, Error Rate: ${errorRate.toFixed(2)}%`);
});

Then('the temperature difference should be within {int}%', async (threshold: number) => {
  if (errorRate === null) {
    throw new Error('Error rate was not computed. Ensure the comparison step was executed.');
  }

  if (errorRate > threshold) {
    throw new Error(
      `Error rate exceeds ${threshold}%: ${errorRate.toFixed(2)}%`
    );
  }

  console.log(`Error rate is within the threshold: ${errorRate.toFixed(2)}%`);
});