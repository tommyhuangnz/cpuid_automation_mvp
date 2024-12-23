import { CoreClient, LogLevel } from '@nzxt/cam-core';
import { filterCapabilities, unwrap } from '../helpers/helpers';
import { findDevice } from '../helpers/find-device-fwk2';
import * as readline from 'readline';

async function main() {
  const coreClient = new CoreClient({ appName: 'scratchpad', logLevel: LogLevel.Info });
  const fwk2 = await coreClient.initFwk2();
  const temperature = fwk2.temperature();

  const device = await findDevice(fwk2, filterCapabilities(['temperature']), {
    autoApplyFirmwareUpdate: false,
  });

  console.log(`Using device ${device.id}`);
  const sub = unwrap(
    temperature.watchTemperatureData(device, data => {
      console.log(JSON.stringify(data, null, 4));
    })
  );

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (_str: string, key: readline.Key) => {
    if (key.ctrl && key.name === 'c') {
      void (async () => {
        sub.unsubscribe();
        await fwk2.shutdown();
        await coreClient.shutdown();
        process.exit();
      })();
      return;
    }
  });
}

void main();
