import React, { PropsWithChildren } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { GlobalStyle } from "./GlobalStyle";
import { theme } from "./theme";

export type AppProps = PropsWithChildren<{}>;

export const App = ({ children }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <StyledThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  </MuiThemeProvider>
);
