import { alpha } from "@mui/system";
import {
  red,
  purple,
  green,
  blue,
  lightBlue,
  amber,
  teal,
  yellow,
  deepOrange,
} from "@mui/material/colors";


// Setup color
/** PRIMARY */
const PRIMARY = {
  light: lightBlue["A200"],
  main: lightBlue["A700"],
  dark: lightBlue["A700"],
  contrastText: "#fff",
};
const PRIMARY_DARK = {
  light: teal["A200"],
  main: teal["A400"],
  dark: teal["A700"],
  contrastText: "#121212",
};

/** SECONDARY */
const SECONDARY = {
  light: purple["400"],
  main: purple["700"],
  dark: purple["800"],
  contrastText: "#fff",
};
const SECONDARY_DARK = {
  light: purple["50"],
  main: purple["200"],
  dark: purple["400"],
  contrastText: "#121212",
};
/** INFO */
const INFO = {
  light: blue["A200"],
  main: blue["A400"],
  dark: blue["A700"],
  contrastText: "#fff",
};
const INFO_DARK = {
  light: lightBlue["A200"],
  main: lightBlue["A400"],
  dark: lightBlue["A700"],
  contrastText: "#121212",
};
/** SUCCESS */
const SUCCESS = {
  light: green["A200"],
  main: green["A400"],
  dark: green["A700"],
  contrastText: "#fff",
};
const SUCCESS_DARK = {
  light: teal["A200"],
  main: teal["A400"],
  dark: teal["A700"],
  contrastText: "#121212",
};
/** WARNING */
const WARNING = {
  light: amber["A200"],
  main: amber["A400"],
  dark: amber["A700"],
  contrastText: "#fff",
};
const WARNING_DARK = {
  light: yellow["A200"],
  main: yellow["A400"],
  dark: yellow["A700"],
  contrastText: "#121212",
};
/** ERROR */
const ERROR = {
  light: red["A200"],
  main: red["A400"],
  dark: red["A700"],
  contrastText: "#fff",
};
const ERROR_DARK = {
  light: deepOrange["A200"],
  main: deepOrange["A400"],
  dark: deepOrange["A700"],
  contrastText: "#121212",
};

const GRADIENTS = {
  main: "linear-gradient(147.14deg, #FF3B3B 6.95%, #6600CC 93.05%);",
  primary: "linear-gradient(147.14deg, #3E7BFA 6.95%, #6600CC 93.05%);",
  secondary: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%);",
  third: "linear-gradient(147.14deg, #00CFDE 6.95%, #05A660 93.05%);",
  fourth: "linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%);",
};
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};
// Setting common for dark and white theme
const COMMON = {
  light: {
    common: { black: "#333", white: "#fff" },

    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },

    grey: GREY,

    gradients: GRADIENTS,
  },
  dark: {
    common: { black: "#333", white: "#fff" },

    primary: { ...PRIMARY_DARK },
    secondary: { ...SECONDARY_DARK },
    info: { ...INFO_DARK },
    success: { ...SUCCESS_DARK },
    warning: { ...WARNING_DARK },
    error: { ...ERROR_DARK },

    grey: GREY,

    gradients: GRADIENTS,
  },
};

const palette = {
  light: {
    mode: "light",

    ...COMMON.light,

    text: {
//      primary: alpha("#000", 0.87),
      primary: "#222",
      secondary: alpha("#000", 0.75),
      disabled: alpha("#000", 0.38),
      primaryChannel: "0 0 0",
      secondaryChannel: "0 0 0",
    },

    divider: alpha("#000", 0.12),

    background: {
      paper: "#f5f5f5",
      default: alpha(PRIMARY.main,0.08),
    },

    action: {
      active: alpha("#000", 0.54),
      hover: alpha("#000", 0.04),
      selected: alpha("#000", 0.08),
      disabled: alpha("#000", 0.26),
      focus: alpha("#000", 0.12),
    },
  },
  dark: {
    mode: "dark",
    ...COMMON.dark,

    text: {
      primary: "#fff",
      secondary: alpha("#fff", 0.75),
      disabled: alpha("#000", 0.5),
      icon: alpha("#fff", 0.5),
      primaryChannel: "255 255 255",
      secondaryChannel: "255 255 255",
    },

    divider: alpha("#fff", 0.12),

    background: {
      paper: "#121212",
      default: "#121212",
    },

    action: {
      active: alpha("#fff", 0.54),
      hover: alpha("#fff", 0.04),
      selected: alpha("#fff", 0.08),
      disabled: alpha("#fff", 0.26),
      focus: alpha("#fff", 0.12),
    },
  },
};
export default palette;
