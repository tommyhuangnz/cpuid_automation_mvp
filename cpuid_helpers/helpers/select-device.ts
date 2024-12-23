import prompts from 'prompts';
import { Device2, DeviceStatus2, Framework2 } from '@nzxt/cam-core';

export async function selectDevice<T extends Device2>(
  fwk2: Framework2,
  prompt: string,
  capFilter: (dev: Device2) => dev is T,
  options: {
    filter?: (dev: T) => boolean;
    display?: (dev: T) => string;
    onlyReady: boolean;
  } = { onlyReady: true }
): Promise<T | null> {
  for (;;) {
    let devices = (await fwk2.devices()).filter(capFilter);
    if (options.filter) {
      devices = devices.filter(options.filter);
    }
    if (options.onlyReady) {
      devices = devices.filter(d => d.status === DeviceStatus2.Ready);
    }
    const filteredDevices = devices.map(d => {
      return {
        title: `#${d.id} ${d.deviceType} (${d.status}) ${options.display?.(d) ?? ''}`,
        value: d,
      };
    });

    let cancelled = false;
    const choices = [{ title: '<Refresh list>', value: 'refresh' } as const, ...filteredDevices];
    const response = await prompts(
      {
        name: 'action',
        type: 'autocomplete',
        message: prompt,
        choices,
      },
      { onCancel: () => (cancelled = true) }
    );

    if (cancelled) {
      return null;
    }

    const choice = response.action as (typeof choices)[number]['value'];
    if (choice === 'refresh') {
      continue;
    }

    return choice;
  }
}
