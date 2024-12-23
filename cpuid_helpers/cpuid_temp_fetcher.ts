import { CoreClient, LogLevel } from '@nzxt/cam-core'
import { findDevice } from './helpers/find-device-fwk2'
import { filterCapabilities, unwrap } from './helpers/helpers'

async function getAvgCpuPackageTemperature(durationMs: number = 5000): Promise<number> {
  const coreClient = new CoreClient({ appName: 'scratchpad', logLevel: LogLevel.Info })
  const fwk2 = await coreClient.initFwk2()
  const temperature = fwk2.temperature()

  const device = await findDevice(fwk2, filterCapabilities(['temperature']), {
    autoApplyFirmwareUpdate: false,
  })

  console.log(`Using device ${device.id}`)

  let temperatures: number[] = []
  const sub = unwrap(
    temperature.watchTemperatureData(device, data => {
      // Filter to get the cpu-package channel temperature
      const relevantChannel = data?.channels.find(channel => channel.channelName === 'cpu-package')
      if (relevantChannel) {
        temperatures.push(relevantChannel.temperature)
      }
    })
  )

  // Wait for the specified duration (e.g., 5 seconds) to collect temperature data
  await new Promise(resolve => setTimeout(resolve, durationMs))

  // Stop collecting data after 5 seconds
  sub.unsubscribe()

  // Compute the average temperature
  const avgTemperature =
    temperatures.length > 0 ? temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length : 0

  await fwk2.shutdown()
  await coreClient.shutdown()

  console.log(`Average cpu-package temperature over ${durationMs / 1000} seconds: ${avgTemperature.toFixed(2)}°C`)
  return avgTemperature
}

// Call the function and print the result
void (async () => {
  const avgTemp = await getAvgCpuPackageTemperature(5000) // 5 seconds duration
  console.log(`Final Average Temperature: ${avgTemp.toFixed(2)}°C`)
})()
