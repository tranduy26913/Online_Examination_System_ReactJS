import { createTheme, StyledEngineProvider } from "@mui/material/styles";
import palette from "./palette";
import breakpoints from "./breakpoints";
import { shadows, customShadows } from "./shadows";
import shape from "./shape";
import typography from "./typography";
import { ReactNode, useMemo } from "react";
import { componentsOverride } from "./override";
import { ThemeProvider } from "@mui/system";
import { CssBaseline, responsiveFontSizes } from "@mui/material";

import { useAppSelector } from "../app/hooks";
import { selectTheme } from "slices/themeSlice";

interface PropsThemeConfig {
  children: ReactNode;
}
export default function ThemeConfig({ children }: PropsThemeConfig) {
  const isLight = useAppSelector(selectTheme);
  console.log(isLight);
  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );
  // createTheme, if themeOptions dont have any property, that property is Default
  let theme = createTheme(themeOptions);
  // override MUI Theme default
  theme.components = componentsOverride(theme);
  // Responsive font size
  // theme = responsiveFontSizes(theme);

  return (
    // Xếp thứ tự ưu tiên cho CSS
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
