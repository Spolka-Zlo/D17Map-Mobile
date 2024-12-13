const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const primary = "#000000";
const secondary = "#F6A200";
const mapGrey = "#D0DCE1";
const white = "#FFFFFF";

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  primary: primary,
  secondary: secondary,
  mapGrey: mapGrey,
  white: white,
};

export const colorMapping: Record<string, number> = {
  class: 0x6fd8ed,
  WC: 0x3498db,
  Inne: 0x2ecc71,
  Windy: 0x9b59b6,
  'Klatki schodowe': 0xe74c3c,
  default: 0xf06493,
};
