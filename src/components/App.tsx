import React from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { Console } from "./Console";
import { GlobalStyle } from "./GlobalStyle";
import { World } from "../engine/types/World";
import { describeWorld } from "../engine/presentation/describeWorld";
import { useWorld } from "../engine/useWorld";

export type AppProps = {
  theme: DefaultTheme;
  world: World;
};

const App = ({ theme, world }: AppProps) => {
  const perform = useWorld(world);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MaximizedConsole onCommand={perform}>
        {describeWorld(world)}
      </MaximizedConsole>
    </ThemeProvider>
  );
};

const MaximizedConsole = styled(Console)`
  height: 100%;
`;

export default App;
