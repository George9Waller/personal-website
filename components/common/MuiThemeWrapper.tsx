import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useMemo } from "react";
import { getMuiThemeOptions } from "../../utils/common";

interface Props {
  children: React.ReactNode;
}

export const MuiThemeWrapper = ({ children }: Props) => {
  const { theme } = useTheme();
  const muiTheme = useMemo(
    () =>
      createTheme(getMuiThemeOptions(theme)),
    [theme]
  );

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default MuiThemeWrapper;
