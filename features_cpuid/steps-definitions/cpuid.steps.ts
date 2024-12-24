import { Given, When, Then } from '@cucumber/cucumber';
import * as fs from 'fs/promises';

let cpuTemperatures: { [version: string]: { cpu_temperature: number; timestamp: string } } = {};

Given('the JSON file {string} exists', async (fileName: string) => {
  try {
    const rawData = await fs.readFile(fileName, 'utf-8');
    cpuTemperatures = JSON.parse(rawData);
    if (!Object.keys(cpuTemperatures).length) {
      throw new Error('File is empty or has no valid data.');
    }
  } catch (err) {
    throw new Error(`Failed to load or parse the JSON file...`);
  }
});

When('I compare the cpu_temperature values between versions', async () => {
  const versions = Object.keys(cpuTemperatures);
  if (versions.length <= 1) {
    throw new Error('Not enough versions to compare.');
  }

  for (let i = 1; i < versions.length; i++) {
    const currentVersion = versions[i];
    const previousVersion = versions[i - 1];

    const currentTemp = cpuTemperatures[currentVersion].cpu_temperature;
    const previousTemp = cpuTemperatures[previousVersion].cpu_temperature;

    const difference = Math.abs(currentTemp - previousTemp);
    const errorRate = (difference / previousTemp) * 100;

    console.log(`Comparing ${previousVersion} (${previousTemp}°C) and ${currentVersion} (${currentTemp}°C)`);
    console.log(`Difference: ${difference.toFixed(2)}°C, Error Rate: ${errorRate.toFixed(2)}%`);
  }
});

Then('the temperature difference should be within {int}%', async (threshold: number) => {
  const versions = Object.keys(cpuTemperatures);

  for (let i = 1; i < versions.length; i++) {
    const currentVersion = versions[i];
    const previousVersion = versions[i - 1];

    const currentTemp = cpuTemperatures[currentVersion].cpu_temperature;
    const previousTemp = cpuTemperatures[previousVersion].cpu_temperature;
    console.log(`cam-core@${previousVersion}: ${previousTemp}°C`)
    console.log(`cam-core@${currentVersion}: ${currentTemp}°C`)

    const difference = Math.abs(currentTemp - previousTemp);
    const errorRate = (difference / previousTemp) * 100;

    if (errorRate > threshold) {
      throw new Error(
        `Error rate between ${previousVersion} and ${currentVersion} exceeds ${threshold}%: ${errorRate.toFixed(2)}%`
      );
    }
  }
});