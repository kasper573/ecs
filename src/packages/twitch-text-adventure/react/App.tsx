import React from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { System } from "../../ecs/System";
import { describeSystem } from "../../ecs-describable/describeSystem";
import { useSystem } from "../../ecs-react/useSystem";
import { GlobalStyle } from "./GlobalStyle";
import { Console } from "./Console";

export type AppProps = {
  theme: DefaultTheme;
  system: System;
};

const App = ({ theme, system }: AppProps) => {
  const { perform, interactionResult } = useSystem(system);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MaximizedConsole onCommand={perform}>
        {describeSystem(system, interactionResult)}
      </MaximizedConsole>
    </ThemeProvider>
  );
};

const MaximizedConsole = styled(Console)`
  height: 100%;
`;

export default App;
