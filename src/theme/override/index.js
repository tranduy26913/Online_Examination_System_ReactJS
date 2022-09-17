import Button from "./Button";
import Typography from "./Typography";

export const componentsOverride = (theme) => {
  const components = {
    ...Button(theme),
    ...Typography(theme)
  }
  return Object.assign(components);
};
