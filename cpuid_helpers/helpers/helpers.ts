import {
  Device2,
  Device2WithoutData,
  DeviceShimWithCapabilities,
  DeviceWithCapabilities,
  SupportedCapabilities,
  JsResult,
  LedRgb,
} from '@nzxt/cam-core';
import prompts from 'prompts';
import { findDevice } from './find-device-fwk2';
import { selectDevice } from './select-device';

export { findDevice, selectDevice };

export type DeviceTypePredicate = string | ((ty: string) => boolean) | string[] | undefined;

export function hasCapabilities<K extends keyof SupportedCapabilities>(
  device: Device2,
  capabilities: K[],
  deviceType?: DeviceTypePredicate
): device is DeviceWithCapabilities<K>;
export function hasCapabilities<K extends keyof SupportedCapabilities>(
  device: Device2WithoutData,
  capabilities: K[],
  deviceType?: DeviceTypePredicate
): device is Device2WithoutData & DeviceShimWithCapabilities<K>;
export function hasCapabilities<K extends keyof SupportedCapabilities>(
  device: { supportedCapabilities: SupportedCapabilities; deviceType: string },
  capabilities: K[],
  deviceType?: DeviceTypePredicate
): boolean {
  const supportsCaps = capabilities.every(c => device.supportedCapabilities[c]);
  if (!supportsCaps) {
    return false;
  }

  if (!deviceType) {
    return true;
  }

  if (typeof deviceType === 'function') {
    return deviceType(device.deviceType);
  } else if (Array.isArray(deviceType)) {
    return deviceType.includes(device.deviceType);
  } else {
    return device.deviceType === deviceType;
  }
}

export function filterCapabilities<K extends keyof SupportedCapabilities>(
  capabilities: K[],
  deviceType?: DeviceTypePredicate
): (d: Device2) => d is DeviceWithCapabilities<K> {
  return (d: Device2): d is DeviceWithCapabilities<K> =>
    hasCapabilities(d, capabilities, deviceType);
}

export function filterCapabilitiesDeviceWithoutData<K extends keyof SupportedCapabilities>(
  capabilities: K[],
  deviceType?: DeviceTypePredicate
): (d: Device2WithoutData) => d is Device2WithoutData & DeviceShimWithCapabilities<K> {
  return (d: Device2WithoutData): d is Device2WithoutData & DeviceShimWithCapabilities<K> =>
    hasCapabilities(d, capabilities, deviceType);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function unwrap<T, E>(result: JsResult<T, E>): T {
  if (result.ok) {
    return result.value;
  } else {
    throw new Error(JSON.stringify(result.error));
  }
}

export function registerShutdown(shutdown: () => Promise<unknown>): AbortController {
  const abort = new AbortController();
  abort.signal.addEventListener(
    'abort',
    () => {
      console.log('shutting down...');
      void (async () => {
        await shutdown();
        process.exit();
      })();
    },
    { once: true }
  );

  process.on('SIGINT', () => {
    abort.abort();
  });

  return abort;
}

export async function getColor(): Promise<LedRgb | null> {
  let cancelled = false;
  const color_ = await prompts(
    {
      name: 'color',
      type: 'list',
      message: 'Type a color in format [r, g, b]',
    },
    { onCancel: () => (cancelled = true) }
  );

  if (cancelled) {
    return null;
  }

  const color = color_.color as Array<string>;
  if (color.length !== 3) {
    console.log('Invalid color format');
    return null;
  }

  return {
    r: parseInt(color[0], 10),
    g: parseInt(color[1], 10),
    b: parseInt(color[2], 10),
  };
}
