import {
  CompatDeviceId,
  GraphicType,
  GraphicTypeDiscriminant,
  MonitoringKey,
  TemperatureFormat,
  TextOutlineConfig,
} from '@nzxt/cam-core';
import * as path from 'path';

const outlineEnabled: TextOutlineConfig = {
  color: { r: 0, g: 0, b: 0 },
};

const image = (
  _gpuId: string,
  _liquidTempSourceDeviceId: CompatDeviceId,
  screenWidth: number
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.Image,
  imageId: 'LMAO',
  kind: 'OnDevice',
  imagePathPrerotated: path.resolve(
    'ts-scratchpad',
    'assets',
    screenWidth === 640 ? 'toad_bucket640.gif' : 'toad_bucket320.gif'
  ),
});

const imageRendered = (_gpuId: string): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.Image,
  kind: 'RenderThroughCam',
  imagePath: path.resolve('ts-scratchpad', 'assets', 'stream.gif'),
});

const singleInfographicArc = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.InfographicRadialFill,
  infographicConfig: {
    liquidTempSourceDeviceId,
    reading: {
      dataKey: MonitoringKey.CPUTemp,
      labelTextTranslated: 'CPU',
      temperatureFormat: TemperatureFormat.Celsius,
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
    },
  },
  gradientStops: [
    { position: 0, color: { r: 69, g: 235, b: 255 } },
    { position: 0.4, color: { r: 136, g: 4, b: 255 } },
    { position: 1, color: { r: 255, g: 0, b: 127 } },
  ],
  backgroundColor: { r: 0, g: 0, b: 0 },
  // set to 1 for Kraken Z effect
  inactiveArcOpacity: 0.05,
});

const singleInfographicGif = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.GifInfographic,
  gifFilePath: path.resolve('ts-scratchpad', 'assets', 'stream.gif'),
  infographicConfig: {
    liquidTempSourceDeviceId,
    reading: {
      dataKey: MonitoringKey.GPUTemp,
      labelTextTranslated: 'GPU',
      temperatureFormat: TemperatureFormat.Celsius,
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
      outline: outlineEnabled,
    },
  },
});

const singleInfographicSquare = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.InfographicSquare,
  infographicConfig: {
    liquidTempSourceDeviceId,
    reading: {
      dataKey: MonitoringKey.CPUTemp,
      labelTextTranslated: 'CPU',
      temperatureFormat: TemperatureFormat.Celsius,
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
    },
  },
  arcBackground: { r: 57, g: 58, b: 60 },
  arcGradientStops: [
    { color: { r: 148, g: 12, b: 231 }, position: 0.0 },
    { color: { r: 229, g: 111, b: 75 }, position: 1.0 },
  ],
});

const dualInfographicArc1 = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.DualInfographic,
  backgroundColor: { r: 0, g: 0, b: 0 },
  leftArcColor: { r: 107, g: 0, b: 222 },
  rightArcColor: { r: 214, g: 0, b: 191 },
  infographicConfig: {
    liquidTempSourceDeviceId,
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
    },
    reading1: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPULoad,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
    reading2: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPULoad,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
  },
});

const dualInfographicArc2 = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.DualInfographic,
  backgroundColor: { r: 0, g: 0, b: 0 },
  leftArcColor: { r: 203, g: 82, b: 254 },
  rightArcColor: { r: 127, g: 17, b: 224 },
  infographicConfig: {
    liquidTempSourceDeviceId,
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
    },
    reading1: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPUFrequency,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 190, g: 255, b: 100 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
    reading2: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.LiquidTemp,
      labelTextTranslated: 'Liquid',
      labelConfig: {
        color: { r: 120, g: 45, b: 2 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
  },
});

const dualInfographicGif = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.GifDualInfographic,
  gifFilePath: path.resolve('ts-scratchpad', 'assets', 'stream.gif'),
  infographicConfig: {
    liquidTempSourceDeviceId,
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
      outline: outlineEnabled,
    },
    reading1: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPUTemp,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
    reading2: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.LiquidTemp,
      labelTextTranslated: 'Liquid',
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
  },
});

const dualInfographicSquare = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.DualInfographicSquare,
  topBarColor: { r: 255, g: 255, b: 255 },
  bottomBarColor: { r: 255, g: 255, b: 255 },
  infographicConfig: {
    liquidTempSourceDeviceId,
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
    },
    reading1: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPULoad,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 190, g: 255, b: 100 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
    reading2: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPULoad,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 120, g: 45, b: 2 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
  },
});

const tripleInfographic = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.TripleInfographic,
  backgroundColor: { r: 0, g: 0, b: 0 },
  gradientStops: [
    { position: 0, color: { r: 69, g: 235, b: 255 } },
    { position: 0.4, color: { r: 136, g: 4, b: 255 } },
    { position: 1, color: { r: 255, g: 0, b: 127 } },
  ],
  inactiveArcOpacity: 0.05,
  infographicConfig: {
    liquidTempSourceDeviceId,
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
      outline: outlineEnabled,
    },
    reading1: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPULoad,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 190, g: 255, b: 100 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
    reading2: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPUTemp,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 120, g: 45, b: 2 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
    reading3: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.GPUTemp,
      labelTextTranslated: 'GPU',
      labelConfig: {
        color: { r: 120, g: 45, b: 2 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
  },
});

const tripleInfographicGif = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.GifTripleInfographic,
  gifFilePath: path.resolve('ts-scratchpad', 'assets', 'stream.gif'),
  infographicConfig: {
    liquidTempSourceDeviceId,
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
      outline: outlineEnabled,
    },
    reading1: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPULoad,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 190, g: 255, b: 100 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
    reading2: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.CPUTemp,
      labelTextTranslated: 'CPU',
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
    reading3: {
      temperatureFormat: TemperatureFormat.Celsius,
      dataKey: MonitoringKey.GPUTemp,
      labelTextTranslated: 'GPU',
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
        outline: outlineEnabled,
      },
    },
  },
});

const audioVisualizer = (_gpuId: string): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.AudioVisualizer,
  colors: [
    { position: 0, color: { r: 69, g: 235, b: 255 } },
    { position: 0.4, color: { r: 136, g: 4, b: 255 } },
    { position: 1, color: { r: 255, g: 0, b: 127 } },
  ],
  nzxtLogo: true,
  frequencyScaling: 0.4,
  sensitivity: -80.0,
  invert: false,
});

const clockAnalog = (_gpuId: string): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.ClockfaceAnalog,
  colors: {
    dial: {
      r: 0,
      g: 120,
      b: 82,
    },
    seconds: {
      r: 220,
      g: 0,
      b: 220,
    },
    background: {
      r: 10,
      g: 20,
      b: 60,
    },
  },
});

const clockDigital = (_gpuId: string): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.ClockfaceDigital,
  colors: {
    dial: {
      r: 240,
      g: 120,
      b: 82,
    },
    text: {
      r: 240,
      g: 120,
      b: 82,
    },
    background: [
      { position: 0, color: { r: 69, g: 235, b: 255 } },
      { position: 0.4, color: { r: 136, g: 4, b: 255 } },
      { position: 1, color: { r: 255, g: 0, b: 127 } },
    ],
  },
  is12ClockFormat: true,
});

const clockDigitalSquare = (_gpuId: string): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.ClockfaceDigitalGradient,
  is12ClockFormat: false,
  gradient: [
    { position: 0, color: { r: 69, g: 235, b: 255 } },
    { position: 0.4, color: { r: 136, g: 4, b: 255 } },
    { position: 1, color: { r: 255, g: 0, b: 127 } },
  ],
});

const infographicFullFill = (
  gpuId: string,
  liquidTempSourceDeviceId: CompatDeviceId
): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.InfographicFullFill,
  infographicConfig: {
    liquidTempSourceDeviceId,
    reading: {
      dataKey: MonitoringKey.GPULoad,
      labelTextTranslated: 'GPU',
      temperatureFormat: TemperatureFormat.Celsius,
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
    },
  },
  backgroundGradient: [
    { position: 0, color: { r: 255, g: 0, b: 0 } },
    { position: 0, color: { r: 0, g: 0, b: 255 } },
  ],
});

const baseImageLoad = (gpuId: string, liquidTempSourceDeviceId: CompatDeviceId): GraphicType => ({
  graphicType: GraphicTypeDiscriminant.SquareImage,
  imagePath: path.resolve('ts-scratchpad', 'assets', 'stream.gif'),
  infographicConfig: {
    liquidTempSourceDeviceId,
    reading: {
      dataKey: MonitoringKey.CPULoad,
      labelTextTranslated: 'CPU',
      temperatureFormat: TemperatureFormat.Celsius,
      labelConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
      readingConfig: {
        color: { r: 255, g: 255, b: 255 },
      },
    },
    selectedGpuId: gpuId,
    logoConfig: {
      color: { r: 255, g: 255, b: 255 },
    },
  },
});

export const GRAPHICS = [
  ['image (bucket, gif only, 320 and 640px supported)', image],
  ['image (through renderer, any size)', imageRendered],
  ['single infographic (arc)', singleInfographicArc],
  ['single infographic + gif', singleInfographicGif],
  ['single infographic (square)', singleInfographicSquare],
  ['dual infographic (arc) 1', dualInfographicArc1],
  ['dual infographic (arc) 2', dualInfographicArc2],
  ['dual infographic + gif', dualInfographicGif],
  ['dual infographic (square)', dualInfographicSquare],
  ['triple infographic', tripleInfographic],
  ['triple infographic + gif', tripleInfographicGif],
  ['audio visualizer', audioVisualizer],
  ['clock analog', clockAnalog],
  ['clock digital', clockDigital],
  ['clock digital (square)', clockDigitalSquare],
  ['infographic full fill', infographicFullFill],
  ['infographic + image (base)', baseImageLoad],
] as [
  string,
  (gpuId: string, liquidTempSourceDeviceId: CompatDeviceId, screenWidth: number) => GraphicType,
][];
