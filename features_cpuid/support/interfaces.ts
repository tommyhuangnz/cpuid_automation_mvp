export interface MachineConfig {
    'N7-B550': DeviceConfig
    'N7-B550-2': DeviceConfig
    'N7-B650E': DeviceConfig
    'N7-Z370': DeviceConfig
    'N7-Z390': DeviceConfig
    'N7-Z490': DeviceConfig
    'N7-Z590': DeviceConfig
    'N5-Z690': DeviceConfig
    'N7-Z690': DeviceConfig
    'N7-Z790': DeviceConfig
    [key: string]: DeviceConfig
  }
  
  export interface DeviceConfig {
    hueplus?: {
      [key: string]: number[]
    }
    krakenm22?: {
      [key: string]: number[]
    }
    krakenx?: {
      [key: string]: number[]
    }
    krakenx3?: {
      [key: string]: number[]
    }
    kraken?: {
      [key: string]: number[]
    }
    krakenz3?: {
      [key: string]: number[]
    }
    controlhub?: {
      [key: string]: number[]
    }
    krakenelitev2?: {
      [key: string]: number[]
    }
    lumih7?: {
      [key: string]: number[]
    }
    n7z490?: {
      [key: string]: number[]
    }
    n7b550?: {
      [key: string]: number[]
    }
    n7z370?: {
      [key: string]: number[]
    }
    n7z390?: {
      [key: string]: number[]
    }
    n7z690?: {
      [key: string]: number[]
    }
    smartdevice?: {
      [key: string]: number[]
    }
    smartdevice2?: {
      [key: string]: number[]
    }
    rgbfancontroller?: {
      [key: string]: number[]
    }
    hue2?: {
      [key: string]: number[]
    }
    hue2ambient?: {
      [key: string]: number[]
    }
    gridplusrev1?: {
      [key: string]: number[]
    }
    gridplusrev2?: {
      [key: string]: number[]
    }
    gridv3?: {
      [key: string]: number[]
    }
    eseries500?: {
      [key: string]: number[]
    }
    eseries650?: {
      [key: string]: number[]
    }
    eseries850?: {
      [key: string]: number[]
    }
  }
  
  export interface DeviceIds {
    PID: number
    VID: number
  }
  
  export interface MergecapFunctionProperties {
    outputName?: string
    busIds?: number[]
    mergecapPath?: string
  }
  
  export enum LEDSize {
    LEDSize3 = '3 LED unit',
    LEDSize4 = '4 LED unit',
    LEDSize5 = '5 LED unit',
    LEDSize6 = '6 LED unit',
  }
  
  export enum CommandType {
    Preset = 'Preset',
    Gen1cfg = 'Gen1cfg',
    Gen1cfg2 = 'Gen1cfg2',
    // Gen1cfg is only for sd1/z370 usage
    Static1 = 'Static1',
    Static2 = 'Static2',
    Static3 = 'Static3',
    Direct = 'Direct',
    Fwk2LedColor = 'Fwk2LedColor',
    Fwk2MetaData = 'Fwk2MetaData',
  }
  
  export interface AnswerKeyGen2 {
    device: string
    commandType: CommandType
    settings: {
      Channel?: string
      LEDLength?: number
      LightingMode?: string
      Speed?: number | number[]
      Moving?: 'Disable' | 'Enable'
      Direction?: 'Forward' | 'Backward'
      LEDSize?: LEDSize
      ColorLevel?: string
      [key: string]: any
    }
  }
  
  export interface RecordFunctionProperties {
    durationSeconds?: number
    outputName?: string
    inputName?: string
    busId?: number
    deviceAddress?: number
    answerKey?: AnswerKeyGen2
    wiresharkPath?: string
    usbpcapPath?: string
  }
  
  export interface DeviceSettingDetails {
    isBitmask: boolean
    bitIndex: number | number[]
    byteIndex: number | number[]
    matchDirectly: boolean
    value: {
      [key: string]: string | number | number[]
      [key: number]: string | number | number[]
    }
  }
  
  export interface DeviceSettings {
    [key: string]: DeviceSettingDetails
  }
  
  export interface PromiseResult {
    response: number
    body?: any
    message?: string
  }
  
  export interface TestCaseResultPayload {
    status_id: number
    comment?: string
    elapsed?: string
  }
  
  export interface TestCaseResult {
    assignedto_id?: number
    created_by: number
    created_on: number
    id: number
    title: string
    test_id?: number
    status_id?: number
    comment?: string
    defects?: string
    elapsed?: string
    version?: string
    custom_step_results?: Record<string, unknown>[]
    custom_automation_type?: number
    custom_test_machine?: string
    custom_test_type?: Array<number>
    type_id?: number
    section_id?: number
  }
  
  export interface TestRunCreatePayload {
    name: string
    case_ids?: number[]
    suite_id?: number
    assignedto_id?: number
    refs?: string
    include_all?: boolean
    cases?: number[]
  }
  
  export interface CasesResult {
    offset: number
    limit: number
    size: number
    _links: {
      next: string
      prev: string | null
    }
    cases: TestCaseResult[]
  }
  
  //(Philip)TODO: Responses from calling `TestRun` functions is too complicated to be declared
  export interface TestRunResult {
    id: number
    passed_count: number
    blocked_count: number
    untested_count: number
    retest_count: number
    failed_count: number
    url: string
    [key: string]: string | boolean | number | number[] | undefined
  }
  
  export interface DefaultPresetLightingModeSettings {
    [key: string]: {
      Speed?: boolean
      Direction?: boolean
      LEDSize?: boolean
      Moving?: boolean
    }
  }
  
  interface PresetLightingModeProperties {
    Speed?: string
    Moving?: 'Disable' | 'Enable'
    Direction?: 'Forward' | 'Backward'
    LEDSize?: LEDSize
  }
  
  export interface CustomizedLightingDefaults {
    [mode: string]: PresetLightingModeProperties
  }
  
  export interface DeviceCustomizedLightingDefaults {
    [device: string]: CustomizedLightingDefaults
  }
  
  export interface DeviceLightingModeSpeedValue {
    [deviceName: string]: {
      [lightingMode: string]: {
        [speed: string]: number | number[] | undefined
      }
    }
  }
  
  export interface SpeedValueSet {
    [key: string]: {
      Slowest?: number | number[]
      Slow?: number | number[]
      Normal: number | number[]
      Fast?: number | number[]
      Fastest?: number | number[]
    }
  }
  
  export interface FanRpmList {
    [key: string]: {
      [key: string]: {
        [key: string]: {
          [key: string]: number
        }
      }
    }
  }
  
  export interface SlackMessageSettings {
    channel: string
    color: {
      passed: string
      failed: string
    }
    status: {
      passed: string
      failed: string
    }
    emoji: {
      passed: string
      failed: string
    }
    button: {
      passed: 'primary' | 'danger'
      failed: 'primary' | 'danger'
    }
  }
  