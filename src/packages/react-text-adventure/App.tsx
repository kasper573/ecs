import React from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { Console } from "./Console";
import { GlobalStyle } from "./GlobalStyle";
import { World } from "../ecs/World";
import { describeWorld } from "../ecs-text/describeWorld";
import { useWorld } from "../ecs-react/useWorld";

export type AppProps = {
  theme: DefaultTheme;
  world: World;
};

const App = ({ theme, world }: AppProps) => {
  const { perform, lastEffect } = useWorld(world);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MaximizedConsole onCommand={perform}>
        {describeWorld(world, lastEffect)}
      </MaximizedConsole>
    </ThemeProvider>
  );
};

const MaximizedConsole = styled(Console)`
  height: 100%;
`;

export default App;
