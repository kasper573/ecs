import React from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { System } from "../../ecs/System";
import { describeSystem } from "../../ecs-describable/describeSystem";
import { performCommand } from "../../ecs-interactive/performCommand";
import { GlobalStyle } from "./GlobalStyle";
import { Console } from "./Console";

export type AppProps = {
  theme: DefaultTheme;
  system: System;
  timeLeft: number;
  votesPerAction: number[];
};

const App = ({ theme, system, timeLeft, votesPerAction }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MaximizedConsole
        onCommand={(command) => performCommand(system, command)}
      >
        {`${describeSystem(system, {
          describeAction: (action, index) =>
            `${index + 1}. ${action.name} (${
              votesPerAction[index] || 0
            } votes)`,
        })}
Time left: ${Math.round(timeLeft / 1000)}s`}
        <VoteInstruction>
          Vote by typing one of the action numbers into twitch chat.
        </VoteInstruction>
      </MaximizedConsole>
    </ThemeProvider>
  );
};

const VoteInstruction = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const MaximizedConsole = styled(Console)`
  height: 100%;
`;

export default App;
