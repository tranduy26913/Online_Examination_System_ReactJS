import { Theme } from "@mui/system";
export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
         // background: theme.palette.gradients.main,
          borderRadius: theme.shape.borderRadiusMd,
        },
      },
      defaultProps: {
        disableRipple: false,
      },
    },
  };
}
