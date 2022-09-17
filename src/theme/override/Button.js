export default function Button(theme) {
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
