import { CoreClient, LogLevel } from '@nzxt/cam-core'
import { version as camCoreVersion } from '@nzxt/cam-core/package.json' // Import package version
import * as fs from 'fs/promises' // For file operations
import { findDevice } from './helpers/find-device-fwk2'
import { filterCapabilities, unwrap } from './helpers/helpers'

// Function to calculate the average temperature
function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((total, num) => total + num, 0)
  return sum / numbers.length
}

// Function to save temperature and version data to a JSON file
async function saveTemperatureToJSON(average: number, filePath: string, camCoreVersion: string): Promise<void> {
  try {
    // Read the existing data from the JSON file if it exists
    let existingData: { [version: string]: { cpu_temperature: number; timestamp: string } } = {}
    try {
      const rawData = await fs.readFile(filePath, 'utf-8')
      existingData = JSON.parse(rawData)
    } catch (err) {
      console.log('No existing data file found, starting with an empty object.')
    }

    // Add new data entry
    const timestamp = new Date().toISOString()
    existingData[camCoreVersion] = { cpu_temperature: average, timestamp }

    // Write the updated data back to the JSON file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8')
    console.log(`Saved data to ${filePath}`)
  } catch (err) {
    console.error('Error saving data to file:', err)
  }
}

async function main() {
  const coreClient = new CoreClient({ appName: 'scratchpad', logLevel: LogLevel.Info })
  const fwk2 = await coreClient.initFwk2()
  const temperature = fwk2.temperature()

  const device = await findDevice(fwk2, filterCapabilities(['temperature']), {
    autoApplyFirmwareUpdate: false,
  })

  const cpuPackageTemperatures: number[] = []
  const filePath = './cpuid_reading.json' // Path to save JSON data
  console.log(`Using device ${device.id}`)

  const sub = unwrap(
    temperature.watchTemperatureData(device, data => {
      const relevantChannels = data?.channels?.filter(channel => ['cpu-package'].includes(channel.channelName)) || []

      if (relevantChannels.length > 0) {
        const curTemp = Number(relevantChannels[0]?.temperature?.value)
        console.log('Current temperature:', curTemp)
        cpuPackageTemperatures.push(curTemp)
      }
    })
  )

  // Wait 5 seconds before stopping the program
  setTimeout(async () => {
    sub.unsubscribe()

    // Calculate average
    const avgTemperature = calculateAverage(cpuPackageTemperatures)
    console.log(`8-second average CPU-package temperature: ${avgTemperature.toFixed(2)}°C`)

    // Save average and CAM-Core version to the JSON file
    await saveTemperatureToJSON(avgTemperature, filePath, camCoreVersion)

    // Clean shutdown
    await fwk2.shutdown()
    await coreClient.shutdown()
    console.log('Program finished.')
    process.exit()
  }, 8000) // End after 5 seconds
}

void main()

// import { CoreClient, LogLevel } from '@nzxt/cam-core'
// import * as readline from 'readline'
// import { findDevice } from './helpers/find-device-fwk2'
// import { filterCapabilities, unwrap } from './helpers/helpers'

// async function main() {
//   const coreClient = new CoreClient({ appName: 'scratchpad', logLevel: LogLevel.Info })
//   const fwk2 = await coreClient.initFwk2()
//   const temperature = fwk2.temperature()

//   const device = await findDevice(fwk2, filterCapabilities(['temperature']), {
//     autoApplyFirmwareUpdate: false,
//   })

//   console.log(`Using device ${device.id}`)
//   const sub = unwrap(
//     temperature.watchTemperatureData(device, data => {
//       console.log(JSON.stringify(data, null, 4))
//     })
//   )
//   readline.emitKeypressEvents(process.stdin);
//   process.stdin.setRawMode(true)
//   process.stdin.on('keypress', (_str: string, key: readline.Key) => {
//     if (key.ctrl && key.name === 'c') {
//       void (async () => {
//         sub.unsubscribe()
//         await fwk2.shutdown()
//         await coreClient.shutdown()
//         process.exit()
//       })()
//       return
//     }
//   })
// }

// void main()
