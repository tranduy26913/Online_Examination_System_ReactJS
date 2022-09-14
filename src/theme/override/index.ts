import { Theme } from "@mui/system";
import Button from "./Button";
import Typography from "./Typography";

export const componentsOverride = (theme: Theme) => {
  const components = {
    ...Button(theme),
    ...Typography(theme)
  }
  return Object.assign(components);
};
