import { Device2, DeviceListChange, DeviceStatus2, Framework2 } from '@nzxt/cam-core';
import { updateFirmwareIfNeeded } from './update-firmware';

export interface FindDeviceOptions {
  autoApplyFirmwareUpdate?: boolean;
}

export async function tryFindDevice<T extends Device2>(
  fwk2: Framework2,
  filter: (value: Device2) => value is T
): Promise<T | null> {
  const devices = await fwk2.devices();
  const device: T | null | undefined = devices.find(filter);
  if (device && device.status === DeviceStatus2.Ready) {
    return device;
  }
  return null;
}

/**
 * Waits for device list changes until a device that is ready and matching the filter is found.
 */
export async function findDevice<T extends Device2>(
  fwk2: Framework2,
  filter: (value: Device2) => value is T,
  options: FindDeviceOptions = {}
): Promise<T> {
  const { autoApplyFirmwareUpdate } = options;
  const fw = fwk2.firmware();

  const devices = await fwk2.devices();
  const device: T | null | undefined = devices.find(filter);

  let startedUpdateAlready = false;

  if (device) {
    if (autoApplyFirmwareUpdate) {
      console.log('d');
      startedUpdateAlready = await updateFirmwareIfNeeded(fw, device);
    }

    if (!startedUpdateAlready && device.status === DeviceStatus2.Ready) {
      return device;
    }
  }

  console.log('Matching ready device not found, subscribing for device list changes...');

  const changes: DeviceListChange[] = [];

  let isRunning = false;
  let targetDeviceId: number | null = null;

  const foundDevice = await new Promise<T>((resolve, _reject) => {
    const sub = fwk2.subscribeDeviceListChanges(change => {
      changes.push(change);
      void (async () => {
        if (isRunning) {
          return;
        }
        isRunning = true;

        const changesToProcess = changes.splice(0, changes.length);

        for (change of changesToProcess) {
          switch (change.kind) {
            case 'DeviceAdded': {
              if (targetDeviceId !== null) {
                continue;
              }

              if (
                change.initialStatus !== DeviceStatus2.Ready &&
                change.initialStatus !== DeviceStatus2.FirmwareUpdateRequired
              ) {
                continue;
              }

              const device = await fwk2.device(change.id);
              if (!device) {
                continue;
              }

              if (!filter(device)) {
                continue;
              }

              targetDeviceId = change.id;

              if (autoApplyFirmwareUpdate && !startedUpdateAlready) {
                startedUpdateAlready = true;
                const didStartUpdate = await updateFirmwareIfNeeded(fw, device);
                if (didStartUpdate) {
                  continue;
                }
              }

              setTimeout(() => {
                sub.unsubscribe();
                resolve(device);
              });
              break;
            }
            case 'DeviceStatusChanged': {
              if (targetDeviceId !== null && targetDeviceId !== change.id) {
                continue;
              }

              if (targetDeviceId === null) {
                const device = await fwk2.device(change.id);
                if (!device) {
                  continue;
                }
                if (!filter(device)) {
                  continue;
                }

                targetDeviceId = change.id;
              }

              if (change.to === DeviceStatus2.FirmwareUpdateRequired) {
                const s = autoApplyFirmwareUpdate ? 'yes' : 'no';
                console.log(`Device ${change.id} requires firmware update, auto apply: ${s}`);
                if (autoApplyFirmwareUpdate && !startedUpdateAlready) {
                  const device = await fwk2.device(change.id);
                  if (!device) {
                    continue;
                  }

                  startedUpdateAlready = true;
                  await updateFirmwareIfNeeded(fw, device);
                }
              } else if (change.to === DeviceStatus2.Ready) {
                const device = await fwk2.device(change.id);
                if (!device) {
                  continue;
                }
                if (!filter(device)) {
                  continue;
                }

                if (autoApplyFirmwareUpdate && !startedUpdateAlready) {
                  startedUpdateAlready = true;

                  const didStartUpdate = await updateFirmwareIfNeeded(fw, device);
                  if (didStartUpdate) {
                    continue;
                  }
                }

                setTimeout(() => {
                  sub.unsubscribe();
                  resolve(device);
                });
              }
              break;
            }
            default:
              break;
          }
        }

        isRunning = false;
      })();
    });
  });

  return foundDevice;
}
