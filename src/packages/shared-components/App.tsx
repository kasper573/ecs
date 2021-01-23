import React, { PropsWithChildren } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { MuiThemeProvider } from "@material-ui/core";
import { GlobalStyle } from "./GlobalStyle";
import { theme } from "./theme";

export type AppProps = PropsWithChildren<{}>;

export const App = ({ children }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  </MuiThemeProvider>
);
