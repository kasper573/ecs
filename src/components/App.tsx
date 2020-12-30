import React from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { Console } from "./Console";
import { GlobalStyle } from "./GlobalStyle";

export type AppProps = {
  theme: DefaultTheme;
};

const App = ({ theme }: AppProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <MaximizedConsole>Twitch Text Adventure</MaximizedConsole>
  </ThemeProvider>
);

const MaximizedConsole = styled(Console)`
  height: 100%;
`;

export default App;
