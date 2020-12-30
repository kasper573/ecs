import React, { useState } from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { Console } from "./Console";
import { GlobalStyle } from "./GlobalStyle";

export type AppProps = {
  theme: DefaultTheme;
};

const App = ({ theme }: AppProps) => {
  const [count, setCount] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MaximizedConsole>
        {count} <button onClick={() => setCount(count + 1)}>Increase</button>
        Twitch Text Adventure
      </MaximizedConsole>
    </ThemeProvider>
  );
};

const MaximizedConsole = styled(Console)`
  height: 100%;
`;

export default App;
