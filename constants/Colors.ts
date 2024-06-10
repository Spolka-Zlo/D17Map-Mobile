const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const primary = "#003F52";
const secondary = "#F6A200";
const mapGrey = "#A3BAC3";
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
  roomColors: [
    secondary,
    mapGrey,
    primary,
  ],
};
