export enum MouseKeyCode {
  Left = 0xa5, // Mouse Left Button
  Middle = 0xa6, // Mouse Middle Button
  Right = 0xa7, // Mouse Right Button
  Forward = 0xa8, // Mouse Forward Button
  Back = 0xa9, // Mouse Back Button
  Dpi = 0xaa, // Mouse DPI Button
}
export enum MediaKeyCode {
  Mute = 0x7f, // Keyboard Mute
  VolumeUp = 0x80, // Keyboard Volume Up
  VolumeDown = 0x81, // Keyboard Volume Down
  // These next 4 are not in the HID spec, we are using that end of the hid spec to represent
  // these media keys.
  PlayPause = 0xe8, // Keyboard Play/Pause
  Stop = 0xe9, // Stop
  Backward = 0xea, // Backward
  Forward = 0xeb, // Forward
}
export enum NzxtKeyboardKeyId {
  WinLock = 0xff0000ec,
  Brightness = 0xff0000ed,
  Fn = 0xff0000ee,
  // Hacky implementation for LCTRL+LWIN+F23, as we can't bind that directly
  Copilot = 0xff0000ef,
}
export enum HidKeyCode {
  A = 0x04, // Keyboard a and A
  B = 0x05, // Keyboard b and B
  C = 0x06, // Keyboard c and C
  D = 0x07, // Keyboard d and D
  E = 0x08, // Keyboard e and E
  F = 0x09, // Keyboard f and F
  G = 0x0a, // Keyboard g and G
  H = 0x0b, // Keyboard h and H
  I = 0x0c, // Keyboard i and I
  J = 0x0d, // Keyboard j and J
  K = 0x0e, // Keyboard k and K
  L = 0x0f, // Keyboard l and L
  M = 0x10, // Keyboard m and M
  N = 0x11, // Keyboard n and N
  O = 0x12, // Keyboard o and O
  P = 0x13, // Keyboard p and P
  Q = 0x14, // Keyboard q and Q
  R = 0x15, // Keyboard r and R
  S = 0x16, // Keyboard s and S
  T = 0x17, // Keyboard t and T
  U = 0x18, // Keyboard u and U
  V = 0x19, // Keyboard v and V
  W = 0x1a, // Keyboard w and W
  X = 0x1b, // Keyboard x and X
  Y = 0x1c, // Keyboard y and Y
  Z = 0x1d, // Keyboard z and Z
  N1OrExclamation = 0x1e, // Keyboard 1 and !
  N2OrAt = 0x1f, // Keyboard 2 and @
  N3OrPound = 0x20, // Keyboard 3 and #
  N4OrDollar = 0x21, // Keyboard 4 and $
  N5OrPercent = 0x22, // Keyboard 5 and %
  N6OrCaret = 0x23, // Keyboard 6 and ^
  N7OrAnd = 0x24, // Keyboard 7 and &
  N8OrStar = 0x25, // Keyboard 8 and *
  N9OrLeftParen = 0x26, // Keyboard 9 and (
  N0OrRightParen = 0x27, // Keyboard 0 and )
  ReturnOrEnter = 0x28, // Keyboard Return (ENTER)
  Escape = 0x29, // Keyboard ESCAPE
  BackspaceOrDelete = 0x2a, // Keyboard DELETE (Backspace)
  Tab = 0x2b, // Keyboard Tab
  Spacebar = 0x2c, // Keyboard Spacebar
  MinusOrUnderscore = 0x2d, // Keyboard - and (underscore)
  EqualsOrPlus = 0x2e, // Keyboard = and +
  LeftSquareOrCurly = 0x2f, // Keyboard [ and {
  RightSquareOrCurly = 0x30, // Keyboard ] and }
  BackslashOrPipe = 0x31, // Keyboard \\ and |
  PounOrTildeNonUs = 0x32, // Keyboard Non-US # and ~
  SemiColonOrColon = 0x33, // Keyboard ; and :
  SingleOrDoubleQuote = 0x34, // Keyboard ‘ and “
  GraveAccentOrTilde = 0x35, // Keyboard Grave Accent and Tilde
  CommaOrLessThan = 0x36, // Keyboard , and <
  PeriodOrGreaterThan = 0x37, // Keyboard . and >
  ForwardSlashOrQuestionMark = 0x38, // Keyboard / and ?
  CapsLock = 0x39, // Keyboard Caps Lock
  F1 = 0x3a, // Keyboard F1
  F2 = 0x3b, // Keyboard F2
  F3 = 0x3c, // Keyboard F3
  F4 = 0x3d, // Keyboard F4
  F5 = 0x3e, // Keyboard F5
  F6 = 0x3f, // Keyboard F6
  F7 = 0x40, // Keyboard F7
  F8 = 0x41, // Keyboard F8
  F9 = 0x42, // Keyboard F9
  F10 = 0x43, // Keyboard F10
  F11 = 0x44, // Keyboard F11
  F12 = 0x45, // Keyboard F12
  PrintScreen = 0x46, // Keyboard PrintScreen
  ScrollLock = 0x47, // Keyboard Scroll Lock
  Pause = 0x48, // Keyboard Pause
  Insert = 0x49, // Keyboard Insert
  Home = 0x4a, // Keyboard Home
  PageUp = 0x4b, // Keyboard PageUp
  DeleteForward = 0x4c, // Keyboard Delete Forward
  End = 0x4d, // Keyboard End
  PageDown = 0x4e, // Keyboard PageDown
  RightArrow = 0x4f, // Keyboard RightArrow
  LeftArrow = 0x50, // Keyboard LeftArrow
  DownArrow = 0x51, // Keyboard DownArrow
  UpArrow = 0x52, // Keyboard UpArrow
  NumLockOrClear = 0x53, // Keypad Num Lock and Clear
  KeypadDivide = 0x54, // Keypad /
  KeypadMultiply = 0x55, // Keypad *
  KeypadSub = 0x56, // Keypad -
  KeypadPlus = 0x57, // Keypad +
  KeypadEnter = 0x58, // Keypad ENTER
  K1OrEnd = 0x59, // Keypad 1 and End
  K2OrDownArrow = 0x5a, // Keypad 2 and Down Arrow
  K3OrPageDn = 0x5b, // Keypad 3 and PageDn
  K4OrLeftArrow = 0x5c, // Keypad 4 and Left Arrow
  K5 = 0x5d, // Keypad 5
  K6OrRightArrow = 0x5e, // Keypad 6 and Right Arrow
  K7OrHome = 0x5f, // Keypad 7 and Home
  K8OrUpArrow = 0x60, // Keypad 8 and Up Arrow
  K9OrPageUp = 0x61, // Keypad 9 and PageUp
  K0OrInsert = 0x62, // Keypad 0 and Insert
  KeypadPeriodOrDelete = 0x63, // Keypad . and Delete
  BackslashOrPipeNonUs = 0x64, // Keyboard Non-US \\ and |
  Application = 0x65, // Keyboard Application
  Power = 0x66, // Keyboard Power
  KeypadEqual = 0x67, // Keypad =
  F13 = 0x68, // Keyboard F13
  F14 = 0x69, // Keyboard F14
  F15 = 0x6a, // Keyboard F15
  F16 = 0x6b, // Keyboard F16
  F17 = 0x6c, // Keyboard F17
  F18 = 0x6d, // Keyboard F18
  F19 = 0x6e, // Keyboard F19
  F20 = 0x6f, // Keyboard F20
  F21 = 0x70, // Keyboard F21
  F22 = 0x71, // Keyboard F22
  F23 = 0x72, // Keyboard F23
  F24 = 0x73, // Keyboard F24
  Execute = 0x74, // Keyboard Execute
  Help = 0x75, // Keyboard Help
  Menu = 0x76, // Keyboard Menu
  Select = 0x77, // Keyboard Select
  Stop = 0x78, // Keyboard Stop
  Again = 0x79, // Keyboard Again
  Undo = 0x7a, // Keyboard Undo
  Cut = 0x7b, // Keyboard Cut
  Copy = 0x7c, // Keyboard Copy
  Paste = 0x7d, // Keyboard Paste
  Find = 0x7e, // Keyboard Find
  // 0x7F-0x81 See [`MediaKeyCode`]
  LockingCapsLock = 0x82, // Keyboard Locking Caps Lock
  LockingNumLock = 0x83, // Keyboard Locking Num Lock
  LockingScrollLock = 0x84, // Keyboard Locking Scroll Lock
  KeypadComma = 0x85, // Keypad Comma
  KeypadEqualSign = 0x86, // Keypad Equal Sign
  International1 = 0x87, // Keyboard International1
  International2 = 0x88, // Keyboard International2
  International3 = 0x89, // Keyboard International3
  International4 = 0x8a, // Keyboard International4
  International5 = 0x8b, // Keyboard International5
  International6 = 0x8c, // Keyboard International6
  International7 = 0x8d, // Keyboard International7
  International8 = 0x8e, // Keyboard International8
  International9 = 0x8f, // Keyboard International9
  Lang1 = 0x90, // Keyboard LANG1
  Lang2 = 0x91, // Keyboard LANG2
  Lang3 = 0x92, // Keyboard LANG3
  Lang4 = 0x93, // Keyboard LANG4
  Lang5 = 0x94, // Keyboard LANG5
  Lang6 = 0x95, // Keyboard LANG6
  Lang7 = 0x96, // Keyboard LANG7
  Lang8 = 0x97, // Keyboard LANG8
  Lang9 = 0x98, // Keyboard LANG9
  AlternateErase = 0x99, // Keyboard Alternate Erase
  SysReq = 0x9a, // Keyboard SysReq/Attention
  Cancel = 0x9b, // Keyboard Cancel
  Clear = 0x9c, // Keyboard Clear
  Prior = 0x9d, // Keyboard Prior
  Return = 0x9e, // Keyboard Return
  Separator = 0x9f, // Keyboard Separator
  Out = 0xa0, // Keyboard Out
  Oper = 0xa1, // Keyboard Oper
  ClearAgain = 0xa2, // Keyboard Clear/Again
  CrSel = 0xa3, // Keyboard CrSel/Props
  ExSel = 0xa4, // Keyboard ExSel
  // 0xA5-0xAF Reserved See [`MouseKeyCode`]
  Keypad00 = 0xb0, // Keypad 00
  Keypad000 = 0xb1, // Keypad 000
  ThousandsSeparator = 0xb2, // Thousands Separator
  DecimalSeparator = 0xb3, // Decimal Separator
  CurrencyUnit = 0xb4, // Currency Unit
  CurrencySubUnit = 0xb5, // Currency Sub-unit
  KeypadLeftParen = 0xb6, // Keypad (
  KeypadRightParen = 0xb7, // Keypad )
  KeypadLeftCurly = 0xb8, // Keypad {
  KeypadRightCurly = 0xb9, // Keypad }
  KeypadTab = 0xba, // Keypad Tab
  KeypadBackspace = 0xbb, // Keypad Backspace
  KeypadA = 0xbc, // Keypad A
  KeypadB = 0xbd, // Keypad B
  KeypadC = 0xbe, // Keypad C
  KeypadD = 0xbf, // Keypad D
  KeypadE = 0xc0, // Keypad E
  KeypadF = 0xc1, // Keypad F
  KeypadXOR = 0xc2, // Keypad XOR
  KeypadCaret = 0xc3, // Keypad ^
  KeypadPercent = 0xc4, // Keypad %
  KeypadLessThan = 0xc5, // Keypad <
  KeypadGreaterThan = 0xc6, // Keypad >
  KeypadAnd = 0xc7, // Keypad &
  KeypadAndAnd = 0xc8, // Keypad &&
  KeypadPipe = 0xc9, // Keypad |
  KeypadOr = 0xca, // Keypad ||
  KeypadColon = 0xcb, // Keypad :
  KeypadPound = 0xcc, // Keypad #
  KeypadSpace = 0xcd, // Keypad Space
  KeypadAt = 0xce, // Keypad @
  KeypadExclamation = 0xcf, // Keypad !
  MemoryStore = 0xd0, // Keypad Memory Store
  MemoryRecall = 0xd1, // Keypad Memory Recall
  MemoryClear = 0xd2, // Keypad Memory Clear
  MemoryAdd = 0xd3, // Keypad Memory Add
  MemorySubtract = 0xd4, // Keypad Memory Subtract
  MemoryMultiply = 0xd5, // Keypad Memory Multiply
  MemoryDivide = 0xd6, // Keypad Memory Divide
  KeypadPlusMin = 0xd7, // Keypad +/-
  KeypadClear = 0xd8, // Keypad Clear
  KeypadClearEntry = 0xd9, // Keypad Clear Entry
  KeypadBinary = 0xda, // Keypad Binary
  KeypadOctal = 0xdb, // Keypad Octal
  KeypadDecimal = 0xdc, // Keypad Decimal
  KeypadHexadecimal = 0xdd, // Keypad Hexadecimal
  // 0xDE-0xDF Reserved
  LeftControl = 0xe0, // Keyboard LeftControl
  LeftShift = 0xe1, // Keyboard LeftShift
  LeftAlt = 0xe2, // Keyboard LeftAlt
  LeftGui = 0xe3, // Keyboard Left GUI
  RightControl = 0xe4, // Keyboard RightControl
  RightShift = 0xe5, // Keyboard RightShift
  RightAlt = 0xe6, // Keyboard RightAlt
  RightGui = 0xe7, // Keyboard Right GUI
}
