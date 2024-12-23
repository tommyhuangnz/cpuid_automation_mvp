import {
  Device2,
  DeviceStatus2,
  DeviceWithCapabilities,
  FirmwareApi,
  Subscription,
} from '@nzxt/cam-core';
import { hasCapabilities } from './helpers';

export function updateFirmware(
  fw: FirmwareApi,
  device: DeviceWithCapabilities<'firmwareUpdate'>,
  nameOfComponentsToUpdate?: Array<string> | null
): Promise<void> {
  return new Promise((resolve, reject) => {
    let sub: Subscription | undefined = undefined;
    const f = async () => {
      let hasSeenInProgress = false;
      const res = await fw.startFirmwareUpdate(
        device,
        progress => {
          console.log(`--- update progress`, progress);
          if (progress.status === 'InProgress') {
            hasSeenInProgress = true;
          } else if (hasSeenInProgress) {
            if (sub) {
              sub.unsubscribe();
            }
            resolve();
          }
        },
        nameOfComponentsToUpdate
      );

      if (res.ok) {
        sub = res.value;
      } else {
        reject(new Error(JSON.stringify(res.error)));
      }
    };

    void f();
  });
}

export async function updateFirmwareIfNeeded<T extends Device2>(
  fw: FirmwareApi,
  device: T
): Promise<boolean> {
  if (
    hasCapabilities(device, ['firmwareInfo', 'firmwareUpdate']) &&
    (device.status === DeviceStatus2.FirmwareUpdateRequired ||
      device.capabilityData.firmwareUpdate.status == 'UpdatesAvailable')
  ) {
    console.log(`Updating firmware for ${device.id}`);
    await updateFirmware(fw, device);
    return true;
  }

  return false;
}
