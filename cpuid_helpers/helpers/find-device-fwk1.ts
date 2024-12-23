import { CoreClient, Device, DeviceStatus } from '@nzxt/cam-core';
import { sleep } from './helpers';

export interface FindDeviceOptions {
  autoApplyFirmwareUpdate?: boolean;
}

/**
 * Same as findDevice, but returns null instead of throwing an error if a device was not found. Defaults to just trying once.
 */
export async function tryFindDevice<T extends Device>(
  client: CoreClient,
  filter: (value: Device) => value is T,
  options: FindDeviceOptions = {},
  retryCount: number | undefined = 0,
  sleepMs?: number
): Promise<T | null> {
  try {
    return await findDevice(client, filter, options, retryCount, sleepMs);
  } catch {
    return null;
  }
}

/**
 * Polls devices until a device that is ready and matching the filter is found.
 * @param client:
 * @param filter:
 * @param options:
 * @param retryCount: retry this many times before giving up. if not set, try indefinitely
 * @param sleepMs: sleep time between loops
 */
export async function findDevice<T extends Device>(
  client: CoreClient,
  filter: (value: Device) => value is T,
  options: FindDeviceOptions = {},
  retryCount?: number,
  sleepMs?: number
): Promise<T> {
  const { autoApplyFirmwareUpdate } = options;

  let device: T | undefined;
  for (let i = 0; retryCount == undefined ? true : i <= retryCount; i++) {
    const devices = await client.getDevices();

    const dev = devices.find(filter);
    if (dev) {
      const tempId = dev.tempId;
      if (autoApplyFirmwareUpdate && dev.firmwareVersion && dev.firmwareUpdate?.available) {
        switch (dev.status) {
          case DeviceStatus.Failed:
          case DeviceStatus.FirmwareUpdateRequired:
          case DeviceStatus.Ready:
          case DeviceStatus.Stuck: // AKA "in bootloader"
          case DeviceStatus.UpdateFailed:
            console.log(`Flashing latest firmware to ${tempId}`);
            await client.updateDeviceFirmware({ tempId });
            break;
          default:
            break;
        }
      }

      if (dev.status === DeviceStatus.Ready) {
        device = dev;
        break;
      }
    }

    await sleep(sleepMs != undefined ? sleepMs : 2000);
  }

  if (!device) {
    throw new Error(`Tried ${(retryCount ?? 0) + 1} times and filter wasn't satisfied`);
  }

  return device;
}
