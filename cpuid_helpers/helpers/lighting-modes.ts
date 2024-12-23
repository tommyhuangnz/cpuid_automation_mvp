import {
  AudioLightingDynamicEffect,
  DeviceShimWithCapabilities,
  LedRgb,
  LightingV2Effect,
  LightingV2EffectDirection,
  LightingV2EffectSpeedPreset,
  TemperatureLightingDynamicEffect,
} from '@nzxt/cam-core';

export type LightingV2EffectConstructor = (
  led_number: number,
  tempSourceDevice: DeviceShimWithCapabilities<'temperature'>,
  tempSourceChannelId: number
) =>
  | { kind: 'static'; effect: LightingV2Effect }
  | { kind: 'temperature'; effect: TemperatureLightingDynamicEffect }
  | { kind: 'audio'; effect: AudioLightingDynamicEffect };

const FIXED: LightingV2EffectConstructor = led_number => ({
  kind: 'static',
  effect: {
    effect: 'Fixed',
    colors: Array<LedRgb>(led_number).fill({ r: 255, g: 255, b: 0 }),
    brightness: 0.5,
  },
});

const BREATHING_FIXED: LightingV2EffectConstructor = led_number => ({
  kind: 'static',
  effect: {
    effect: 'BreathingFixed',
    colors: Array<LedRgb>(led_number).fill({ r: 255, g: 0, b: 255 }),
    speed: LightingV2EffectSpeedPreset.Normal,
    brightness: 0.5,
  },
});

const BREATHING_CYCLING: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'BreathingCycling',
    colors: [
      { r: 255, g: 255, b: 0 },
      { r: 0, g: 255, b: 255 },
    ],
    speed: LightingV2EffectSpeedPreset.Normal,
    brightness: 0.5,
  },
});

const FADING: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'Fading',
    colors: [
      { r: 255, g: 255, b: 0 },
      { r: 0, g: 255, b: 255 },
    ],
    speed: LightingV2EffectSpeedPreset.Normal,
    brightness: 0.5,
  },
});

const MARQUEE: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'Marquee',
    color: { r: 255, g: 0, b: 255 },
    direction: LightingV2EffectDirection.Forwards,
    speed: LightingV2EffectSpeedPreset.Normal,
    effectLength: 3,
    brightness: 0.5,
  },
});

const COVERING_MARQUEE: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'CoveringMarquee',
    colors: [
      { r: 255, g: 255, b: 0 },
      { r: 0, g: 255, b: 255 },
    ],
    direction: LightingV2EffectDirection.Backwards,
    speed: LightingV2EffectSpeedPreset.Normal,
    brightness: 0.5,
  },
});

const PULSE: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'Pulse',
    colors: [
      { r: 255, g: 255, b: 0 },
      { r: 0, g: 255, b: 255 },
    ],
    speed: LightingV2EffectSpeedPreset.Normal,
    brightness: 0.5,
  },
});

const SPECTRUM_WAVE: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'SpectrumWave',
    speed: LightingV2EffectSpeedPreset.Normal,
    direction: LightingV2EffectDirection.Forwards,
  },
});

const ALTERNATING_STATIC: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'Alternating',
    color1: { r: 255, g: 0, b: 0 },
    color2: { r: 0, g: 0, b: 255 },
    speed: LightingV2EffectSpeedPreset.Normal,
    direction: LightingV2EffectDirection.Forwards,
    effectLength: 3,
    moving: false,
    brightness: 0.5,
  },
});

const ALTERNATING_MOVING: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'Alternating',
    color1: { r: 255, g: 0, b: 0 },
    color2: { r: 0, g: 0, b: 255 },
    speed: LightingV2EffectSpeedPreset.Normal,
    direction: LightingV2EffectDirection.Forwards,
    effectLength: 3,
    moving: true,
    brightness: 0.5,
  },
});

const STARRY_NIGHT: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'StarryNight',
    speed: LightingV2EffectSpeedPreset.Normal,
    color: { r: 81, g: 0, b: 122 },
    brightness: 0.5,
  },
});

const RAINBOW_FLOW: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'RainbowFlow',
    speed: LightingV2EffectSpeedPreset.Normal,
    direction: LightingV2EffectDirection.Forwards,
  },
});

const SUPER_RAINBOW: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'SuperRainbow',
    speed: LightingV2EffectSpeedPreset.Normal,
    direction: LightingV2EffectDirection.Forwards,
  },
});

const RAINBOW_PULSE: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'RainbowPulse',
    speed: LightingV2EffectSpeedPreset.Normal,
    direction: LightingV2EffectDirection.Forwards,
  },
});

const CANDLE: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'Candle',
    color: { r: 255, g: 200, b: 50 },
    brightness: 0.5,
  },
});

const WAVE: LightingV2EffectConstructor = led_number => {
  const colors = Array<LedRgb>(led_number).fill({ r: 255, g: 0, b: 255 });
  colors[0] = { r: 255, g: 0, b: 0 };

  return {
    kind: 'static',
    effect: {
      effect: 'Wave',
      colors,
      speed: LightingV2EffectSpeedPreset.Normal,
      direction: LightingV2EffectDirection.Forwards,
      brightness: 0.5,
    },
  };
};

const TAICHI: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'TaiChi',
    color1: { r: 255, g: 0, b: 0 },
    color2: { r: 0, g: 0, b: 255 },
    speed: LightingV2EffectSpeedPreset.Normal,
    direction: LightingV2EffectDirection.Forwards,
    brightness: 0.5,
  },
});

const WATERCOOLER: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'WaterCooler',
    color1: { r: 255, g: 0, b: 0 },
    color2: { r: 0, g: 0, b: 255 },
    speed: LightingV2EffectSpeedPreset.Normal,
    brightness: 0.5,
  },
});

const SWISH: LightingV2EffectConstructor = () => ({
  kind: 'static',
  effect: {
    effect: 'Swish',
    color: { r: 255, g: 0, b: 0 },
    speed: LightingV2EffectSpeedPreset.Normal,
    brightness: 0.5,
  },
});

const TEMPERATURE: LightingV2EffectConstructor = (
  _led_number: number,
  temperatureSourceDevice: DeviceShimWithCapabilities<'temperature'>,
  temperatureSourceChannelId: number
) => ({
  kind: 'temperature',
  effect: {
    temperatureSourceDevice,
    temperatureSourceChannelId,
    gradient: [
      { temperature: 10, color: { r: 0, g: 255, b: 255 } },
      { temperature: 40, color: { r: 0, g: 255, b: 0 } },
      { temperature: 90, color: { r: 255, g: 0, b: 0 } },
    ],
    brightness: 0.5,
  },
});

const AUDIO_BASS: LightingV2EffectConstructor = () => ({
  kind: 'audio',
  effect: {
    kind: 'Bass',
    color: { r: 255, g: 0, b: 255 },
    brightness: 0.5,
  },
});

const AUDIO_LEVEL: LightingV2EffectConstructor = () => ({
  kind: 'audio',
  effect: {
    kind: 'Level',
    perAccessory: false,
    gradient: [
      { position: 0 / 7, color: { r: 255, g: 0, b: 0 } },
      { position: 1 / 7, color: { r: 255, g: 165, b: 0 } },
      { position: 2 / 7, color: { r: 255, g: 255, b: 0 } },
      { position: 3 / 7, color: { r: 0, g: 255, b: 0 } },
      { position: 4 / 7, color: { r: 0, g: 0, b: 255 } },
      { position: 5 / 7, color: { r: 81, g: 0, b: 122 } },
      { position: 6 / 7, color: { r: 255, g: 0, b: 0 } },
      { position: 7 / 7, color: { r: 255, g: 165, b: 0 } },
    ],
    brightness: 0.5,
  },
});

const AUDIO_LEVEL_PER_ACCESSORY: LightingV2EffectConstructor = () => ({
  kind: 'audio',
  effect: {
    kind: 'Level',
    perAccessory: true,
    gradient: [
      { position: 0 / 7, color: { r: 255, g: 0, b: 0 } },
      { position: 1 / 7, color: { r: 255, g: 165, b: 0 } },
      { position: 2 / 7, color: { r: 255, g: 255, b: 0 } },
      { position: 3 / 7, color: { r: 0, g: 255, b: 0 } },
      { position: 4 / 7, color: { r: 0, g: 0, b: 255 } },
      { position: 5 / 7, color: { r: 81, g: 0, b: 122 } },
      { position: 6 / 7, color: { r: 255, g: 0, b: 0 } },
      { position: 7 / 7, color: { r: 255, g: 165, b: 0 } },
    ],
    brightness: 0.5,
  },
});

export const LIGHTING_MODES = [
  ['Fixed', FIXED],
  ['Breathing (fixed)', BREATHING_FIXED],
  ['Breathing (cycling)', BREATHING_CYCLING],
  ['Fading', FADING],
  ['Marquee', MARQUEE],
  ['Covering Marquee', COVERING_MARQUEE],
  ['Pulse', PULSE],
  ['Spectrum Wave', SPECTRUM_WAVE],
  ['Alternating Static', ALTERNATING_STATIC],
  ['Alternating Moving', ALTERNATING_MOVING],
  ['Starry Night', STARRY_NIGHT],
  ['Rainbow Flow', RAINBOW_FLOW],
  ['Super Rainbow', SUPER_RAINBOW],
  ['Rainbow Pulse', RAINBOW_PULSE],
  ['Candle', CANDLE],
  ['Wave', WAVE],
  ['TaiChi (only Kraken X/Z/EliteV2)', TAICHI],
  ['Water Cooler (only Kraken X/Z/EliteV2)', WATERCOOLER],
  ['Swish/Loading (only Kraken X/Z/EliteV2)', SWISH],
  ['Temperature', TEMPERATURE],
  ['Audio (Bass)', AUDIO_BASS],
  ['Audio (Level)', AUDIO_LEVEL],
  ['Audio (Level, per accessory)', AUDIO_LEVEL_PER_ACCESSORY],
] as [string, LightingV2EffectConstructor][];
