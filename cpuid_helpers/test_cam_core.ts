import { CoreClient, LogLevel } from '@nzxt/cam-core'
import * as readline from 'readline'
import { findDevice } from './helpers/find-device-fwk2'
import { filterCapabilities, unwrap } from './helpers/helpers'

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((total, num) => total + num, 0)
  return sum / numbers.length
}

async function main() {
  const coreClient = new CoreClient({ appName: 'scratchpad', logLevel: LogLevel.Info })
  const fwk2 = await coreClient.initFwk2()
  const temperature = fwk2.temperature()

  const device = await findDevice(fwk2, filterCapabilities(['temperature']), {
    autoApplyFirmwareUpdate: false,
  })

  const cpuPackageTemperatures: number[] = []
  console.log(`Using device ${device.id}`)
  const sub = unwrap(
    temperature.watchTemperatureData(device, data => {
      // Filter to get only the desired channels
      // const relevantChannels = data?.channels.filter(channel =>
      //   ['cpu-core-avg', 'cpu-package'].includes(channel.channelName)
      // )
      const relevantChannels = data?.channels?.filter(channel => ['cpu-package'].includes(channel.channelName)) || []

      console.log('Type of relevantChannels')
      // console.log(relevantChannels[0]?.channelName)
      // if (relevantChannels.length > 0) {
      //   console.log(relevantChannels[0])
      //   console.log('Temp: ')
      //   console.log(relevantChannels[0]?.temperature?.value)
      // } else {
      //   console.log('relevantChannels array is empty')
      // }
      if (relevantChannels.length > 0) {
        var cur_temp = Number(relevantChannels[0]?.temperature?.value)
        console.log('cur_temp: ', cur_temp)
        cpuPackageTemperatures.push(cur_temp)
      }
      // Store temperature values for 'cpu-package'

      const avgTemperature = calculateAverage(cpuPackageTemperatures)
      console.log(`Current CPU-package average temperature: ${avgTemperature.toFixed(2)}°C`)
      // console.log(JSON.stringify(data, null, 4));
      // console.log(JSON.stringify(relevantChannels, null, 4))
    })
  )

  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  process.stdin.on('keypress', (_str: string, key: readline.Key) => {
    if (key.ctrl && key.name === 'c') {
      void (async () => {
        sub.unsubscribe()
        await fwk2.shutdown()
        await coreClient.shutdown()
        process.exit()
      })()
      return
    }
  })
}

void main()
