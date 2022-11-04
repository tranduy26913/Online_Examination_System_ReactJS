import { createTheme, StyledEngineProvider } from "@mui/material/styles";
import palette from "./palette";
import breakpoints from "./breakpoints";
import { shadows, customShadows } from "./shadows";
import shape from "./shape";
import typography from "./typography";
import {  useMemo } from "react";
import { componentsOverride } from "./override";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import {useSelector} from 'react-redux'


export default function ThemeConfig({ children }) {
  const isLight = useSelector(state=>state.setting.isLight);
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
