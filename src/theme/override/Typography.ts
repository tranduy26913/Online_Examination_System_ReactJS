import { Theme } from "@mui/system";
export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      }
    },
  };
}
