import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { theme } from "./theme";

export type AppProps = PropsWithChildren<{}>;

export const App = ({ children }: AppProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
